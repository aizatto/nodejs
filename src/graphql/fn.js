// @flow
const {
  connectionFromArray,
  connectionFromArraySlice,
  cursorToOffset,
  GraphQLResolveInfo,
} = require('graphql-relay'); // eslint-disable-line import/no-extraneous-dependencies

// TODO:
// Use the actual type
// https://github.com/graphql/graphql-relay-js/blob/9ebb57685065470d1955d6cc3144acc2b070e8fb/src/connection/connectiontypes.js#L45
type Args = {
  first: ?number;
  after: ?string;
  last: ?number;
  before: ?string;
  order: ?string;
  sort: ?string;
}

type WhereQuery = {
  limit: (?number) => WhereQuery;
  offset: (?number) => WhereQuery;
  orderBy: (?string, ?string) => Array<any>; // TODO: this is not accurate
}

type CountQuery = {
}

const argsToSortAndOrder = (args: Args) => {
  const direction = args.order ? args.order : 'asc';
  const column = args.sort ? args.sort : 'id';

  return { column, direction };
};

function connectionArgsToLimitAndOffset(args) {
  // HANDLE LAST
  const {
    after,
    before,
    first,
    last,
  } = args;

  if (last && before) {
    const offset = cursorToOffset(before) - last;
    return {
      limit: last,
      offset: offset > 0 ? offset : 0,
    };
  }

  if (after) {
    const offset = cursorToOffset(after);
    return {
      limit: first,
      offset,
    };
  }

  return {
    limit: first,
    offset: 0,
  };
}

function fieldsFromSelectionSet(info, selectionSet) {
  let fields = new Set();

  selectionSet
    .selections.map((field) => {
      const name = field.name.value;
      switch (field.kind) {
        case 'FragmentSpread':
          let fields2 = fieldsFromSelectionSet(info, info.fragments[name].selectionSet);
          fields = new Set([...fields, ...fields2]);
          break;

        case 'Field':
          fields.add(name);
          break;
      }
    });

  return fields;
}

function fieldsFromInfo(info: GraphQLResolveInfo) {
  if (!info ||
      !info.fieldNodes ||
      !Array.isArray(info.fieldNodes) ||
      info.fieldNodes.length === 0) {
    return new Set();
  }

  return fieldsFromSelectionSet(
    info,
    info
      .fieldNodes[0]
      .selectionSet
  );
}

async function connectionFromKnex(
  args: Args,
  whereQuery: WhereQuery,
  countQuery: CountQuery,
  info: ?GraphQLResolveInfo,
) {
  const { limit, offset } = connectionArgsToLimitAndOffset(args);
  const { column, direction } = argsToSortAndOrder(args);

  whereQuery
    .limit(limit)
    .offset(offset)
    .orderBy(column, direction);

  let runCount = true;

  if (info) {
    const fields = fieldsFromInfo(info);
    if (fields.has('totalCount')) {
      if (fields.size === 1) {
        const count = await countQuery;

        return {
          totalCount: count,
        };
      }
    } else {
      runCount = false;
    }
  }

  if (!runCount) {
    const rows = await whereQuery;
    return connectionFromArray(rows, args);
  }

  const [
    rows,
    [{ count }],
  ] = await Promise.all([
    whereQuery,
    countQuery,
  ]);

  const values = connectionFromArraySlice(
    rows,
    args,
    {
      sliceStart: offset,
      arrayLength: count,
    },
  );

  return {
    ...values,
    totalCount: count,
  };
}

module.exports = {
  connectionFromKnex,
  fieldsFromInfo,
};
