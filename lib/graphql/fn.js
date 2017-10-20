'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('graphql-relay'),
    connectionFromArray = _require.connectionFromArray,
    connectionFromArraySlice = _require.connectionFromArraySlice,
    cursorToOffset = _require.cursorToOffset,
    GraphQLResolveInfo = _require.GraphQLResolveInfo; // eslint-disable-line import/no-extraneous-dependencies

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

function fieldsFromSelectionSet(info, selectionSet) {
  var fields = new Set();

  selectionSet.selections.map(function (field) {
    var name = field.name.value;
    switch (field.kind) {
      case 'FragmentSpread':
        var fields2 = fieldsFromSelectionSet(info, info.fragments[name].selectionSet);
        fields = new Set([].concat(_toConsumableArray(fields), _toConsumableArray(fields2)));
        break;

      case 'Field':
        fields.add(name);
        break;
    }
  });

  return fields;
}

function fieldsFromInfo(info) {
  if (!info || !info.fieldNodes || !Array.isArray(info.fieldNodes) || info.fieldNodes.length === 0) {
    return new Set();
  }

  return fieldsFromSelectionSet(info, info.fieldNodes[0].selectionSet);
}

async function connectionFromKnex(args, whereQuery, countQuery, info) {
  var _connectionArgsToLimi = connectionArgsToLimitAndOffset(args),
      limit = _connectionArgsToLimi.limit,
      offset = _connectionArgsToLimi.offset;

  var _argsToSortAndOrder = argsToSortAndOrder(args),
      column = _argsToSortAndOrder.column,
      direction = _argsToSortAndOrder.direction;

  whereQuery.limit(limit).offset(offset).orderBy(column, direction);

  var runCount = true;

  if (info) {
    var fields = fieldsFromInfo(info);
    if (fields.has('totalCount')) {
      if (fields.size === 1) {
        var _count = await countQuery;

        return {
          totalCount: _count
        };
      }
    } else {
      runCount = false;
    }
  }

  if (!runCount) {
    var _rows = await whereQuery;
    return connectionFromArray(_rows, args);
  }

  var _ref = await Promise.all([whereQuery, countQuery]),
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

module.exports = {
  connectionFromKnex: connectionFromKnex,
  fieldsFromInfo: fieldsFromInfo
};