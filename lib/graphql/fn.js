var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const {
  connectionFromArraySlice,
  cursorToOffset
} = require('graphql-relay'); // eslint-disable-line import/no-extraneous-dependencies

// TODO:
// Use the actual type
// https://github.com/graphql/graphql-relay-js/blob/9ebb57685065470d1955d6cc3144acc2b070e8fb/src/connection/connectiontypes.js#L45


const argsToSortAndOrder = args => {
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
    last
  } = args;

  if (last && before) {
    const offset = cursorToOffset(before) - last;
    return {
      limit: last,
      offset: offset > 0 ? offset : 0
    };
  }

  if (after) {
    const offset = cursorToOffset(after);
    return {
      limit: first,
      offset
    };
  }

  return {
    limit: first,
    offset: 0
  };
}

async function connectionFromKnex(args, whereQuery, countQuery) {
  const { limit, offset } = connectionArgsToLimitAndOffset(args);
  const { column, direction } = argsToSortAndOrder(args);

  const [rows, [{ count }]] = await Promise.all([whereQuery.limit(limit).offset(offset).orderBy(column, direction), countQuery]);

  const values = connectionFromArraySlice(rows, args, {
    sliceStart: offset,
    arrayLength: count
  });

  return _extends({}, values, {
    totalCount: count
  });
}

module.exports = {
  connectionFromKnex
};