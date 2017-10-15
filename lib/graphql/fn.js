'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = require('graphql-relay'),
    connectionFromArraySlice = _require.connectionFromArraySlice,
    cursorToOffset = _require.cursorToOffset; // eslint-disable-line import/no-extraneous-dependencies

// TODO:
// Use the actual type
// https://github.com/graphql/graphql-relay-js/blob/9ebb57685065470d1955d6cc3144acc2b070e8fb/src/connection/connectiontypes.js#L45


var argsToSortAndOrder = function argsToSortAndOrder(args) {
  var direction = args.order ? args.order : 'asc';
  var column = args.sort ? args.sort : 'id';

  return { column: column, direction: direction };
};

function connectionArgsToLimitAndOffset(args) {
  // HANDLE LAST
  var after = args.after,
      before = args.before,
      first = args.first,
      last = args.last;


  if (last && before) {
    var _offset = cursorToOffset(before) - last;
    return {
      limit: last,
      offset: _offset > 0 ? _offset : 0
    };
  }

  if (after) {
    var _offset2 = cursorToOffset(after);
    return {
      limit: first,
      offset: _offset2
    };
  }

  return {
    limit: first,
    offset: 0
  };
}

async function connectionFromKnex(args, whereQuery, countQuery) {
  var _connectionArgsToLimi = connectionArgsToLimitAndOffset(args),
      limit = _connectionArgsToLimi.limit,
      offset = _connectionArgsToLimi.offset;

  var _argsToSortAndOrder = argsToSortAndOrder(args),
      column = _argsToSortAndOrder.column,
      direction = _argsToSortAndOrder.direction;

  var _ref = await Promise.all([whereQuery.limit(limit).offset(offset).orderBy(column, direction), countQuery]),
      _ref2 = _slicedToArray(_ref, 2),
      rows = _ref2[0],
      _ref2$ = _slicedToArray(_ref2[1], 1),
      count = _ref2$[0].count;

  var values = connectionFromArraySlice(rows, args, {
    sliceStart: offset,
    arrayLength: count
  });

  return _extends({}, values, {
    totalCount: count
  });
}

function fieldsFromInfo(info) {
  var fields = info.fieldNodes[0].selectionSet.selections.map(function (_ref3) {
    var value = _ref3.name.value;
    return value;
  });

  return new Set(fields);
}

module.exports = {
  connectionFromKnex: connectionFromKnex,
  fieldsFromInfo: fieldsFromInfo
};