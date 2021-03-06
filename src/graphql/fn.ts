// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import { GraphQLResolveInfo } from 'graphql';

const {
  connectionFromArraySlice,
  cursorToOffset,
} = require('graphql-relay'); // eslint-disable-line import/no-extraneous-dependencies


// TODO:
// Use the actual type
// https://github.com/graphql/graphql-relay-js/blob/9ebb57685065470d1955d6cc3144acc2b070e8fb/src/connection/connectiontypes.js#L45
type Args = {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  order?: string;
  sort?: string;
}

interface WhereQuery {
  limit(number?:number): WhereQuery;
  offset(number?:number): WhereQuery;
  orderBy(order?:string, sort?:string):  Array<any>; // TODO: this is not accurate
}

const argsToSortAndOrder = (args: Args) => {
  const direction = args.order ? args.order : 'asc';
  const column = args.sort ? args.sort : 'id';

  return { column, direction };
};

export function connectionArgsToLimitAndOffset(args) {
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
    .selections
    .forEach((field) => {
      const name = field.name.value;
      switch (field.kind) {
        case 'FragmentSpread': {
          const fields2 = fieldsFromSelectionSet(
            info,
            info.fragments[name].selectionSet,
          );
          fields = new Set([...fields, ...fields2]);
          break;
        }

        case 'Field':
          fields.add(name);
          break;

        default:
          break;
      }
    });

  return fields;
}

export function fieldsFromInfo(info: GraphQLResolveInfo) {
  if (!info ||
      !info.fieldNodes ||
      !Array.isArray(info.fieldNodes) ||
      info.fieldNodes.length === 0) {
    return new Set();
  }

  let fields = new Set();

  // eslint-disable-next-line no-restricted-syntax
  for (const fieldNode of info.fieldNodes) {
    const newFields = fieldsFromSelectionSet(
      info,
      fieldNode
        .selectionSet,
    );

    fields = new Set([...fields, ...newFields]);
  }

  return fields;
}

export function addArgsToQuery(
  args: Args,
  query: WhereQuery,
) {
  const { limit, offset } = connectionArgsToLimitAndOffset(args);
  const { column, direction } = argsToSortAndOrder(args);

  if (limit) {
    query
      .limit(limit);
  }

  query
    .offset(offset)
    .orderBy(column, direction);

  return query;
}

export async function connectionFromKnex(
  args: Args,
  query: WhereQuery,
  countQuery: Promise<any>,
  info?: GraphQLResolveInfo,
) {
  const { offset } = connectionArgsToLimitAndOffset(args);
  const whereQuery = addArgsToQuery(args, query);

  if (info) {
    const fields = fieldsFromInfo(info);
    if (fields.size === 1 &&
        fields.has('totalCount')) {
      const [{ count }] = await countQuery;

      return {
        totalCount: count,
      };
    }
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