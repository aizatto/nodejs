"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('graphql-relay'), connectionFromArraySlice = _a.connectionFromArraySlice, cursorToOffset = _a.cursorToOffset; // eslint-disable-line import/no-extraneous-dependencies
var argsToSortAndOrder = function (args) {
    var direction = args.order ? args.order : 'asc';
    var column = args.sort ? args.sort : 'id';
    return { column: column, direction: direction };
};
function connectionArgsToLimitAndOffset(args) {
    // HANDLE LAST
    var after = args.after, before = args.before, first = args.first, last = args.last;
    if (last && before) {
        var offset = cursorToOffset(before) - last;
        return {
            limit: last,
            offset: offset > 0 ? offset : 0,
        };
    }
    if (after) {
        var offset = cursorToOffset(after);
        return {
            limit: first,
            offset: offset,
        };
    }
    return {
        limit: first,
        offset: 0,
    };
}
exports.connectionArgsToLimitAndOffset = connectionArgsToLimitAndOffset;
function fieldsFromSelectionSet(info, selectionSet) {
    var fields = new Set();
    selectionSet
        .selections
        .forEach(function (field) {
        var name = field.name.value;
        switch (field.kind) {
            case 'FragmentSpread': {
                var fields2 = fieldsFromSelectionSet(info, info.fragments[name].selectionSet);
                fields = new Set(__spread(fields, fields2));
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
function fieldsFromInfo(info) {
    var e_1, _a;
    if (!info ||
        !info.fieldNodes ||
        !Array.isArray(info.fieldNodes) ||
        info.fieldNodes.length === 0) {
        return new Set();
    }
    var fields = new Set();
    try {
        // eslint-disable-next-line no-restricted-syntax
        for (var _b = __values(info.fieldNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
            var fieldNode = _c.value;
            var newFields = fieldsFromSelectionSet(info, fieldNode
                .selectionSet);
            fields = new Set(__spread(fields, newFields));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return fields;
}
exports.fieldsFromInfo = fieldsFromInfo;
function addArgsToQuery(args, query) {
    var _a = connectionArgsToLimitAndOffset(args), limit = _a.limit, offset = _a.offset;
    var _b = argsToSortAndOrder(args), column = _b.column, direction = _b.direction;
    if (limit) {
        query
            .limit(limit);
    }
    query
        .offset(offset)
        .orderBy(column, direction);
    return query;
}
exports.addArgsToQuery = addArgsToQuery;
function connectionFromKnex(args, query, countQuery, info) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, whereQuery, fields, _a, count_1, _b, rows, _c, count, values;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    offset = connectionArgsToLimitAndOffset(args).offset;
                    whereQuery = addArgsToQuery(args, query);
                    if (!info) return [3 /*break*/, 2];
                    fields = fieldsFromInfo(info);
                    if (!(fields.size === 1 &&
                        fields.has('totalCount'))) return [3 /*break*/, 2];
                    return [4 /*yield*/, countQuery];
                case 1:
                    _a = __read.apply(void 0, [_d.sent(), 1]), count_1 = _a[0].count;
                    return [2 /*return*/, {
                            totalCount: count_1,
                        }];
                case 2: return [4 /*yield*/, Promise.all([
                        whereQuery,
                        countQuery,
                    ])];
                case 3:
                    _b = __read.apply(void 0, [_d.sent(), 2]), rows = _b[0], _c = __read(_b[1], 1), count = _c[0].count;
                    values = connectionFromArraySlice(rows, args, {
                        sliceStart: offset,
                        arrayLength: count,
                    });
                    return [2 /*return*/, __assign({}, values, { totalCount: count })];
            }
        });
    });
}
exports.connectionFromKnex = connectionFromKnex;
//# sourceMappingURL=fn.js.map