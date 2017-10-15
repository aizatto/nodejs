// @flow
const {
  connectionFromArraySlice,
  cursorToOffset,
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

async function connectionFromKnex(args: Args, whereQuery: WhereQuery, countQuery: CountQuery) {
  const { limit, offset } = connectionArgsToLimitAndOffset(args);
  const { column, direction } = argsToSortAndOrder(args);

  const [
    rows,
    [{ count }],
  ] = await Promise.all([
    whereQuery
      .limit(limit)
      .offset(offset)
      .orderBy(column, direction),
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

function fieldsFromInfo(info: GraphQLResolveInfo) {
  const fields = info.fieldNodes[0].selectionSet.selections.map(({ name: { value } }) => value);

  return new Set(fields);
}

module.exports = {
  connectionFromKnex,
  fieldsFromInfo,
};
