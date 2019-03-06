"use strict";
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
var pathToRegexp = require('path-to-regexp');
/* Should this be a class or a function?
 *
 * - It only needs to be called once, on the client side to get which page to
 *   load.
 * - We need to call `pathtoRegexp()` because we need the `keys`
 *
 */
function getValueFromPath(pathname, routes, routeToValue) {
    var e_1, _a;
    try {
        // eslint-disable-next-line no-restricted-syntax
        for (var _b = __values(Object.keys(routes)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var route = routes[key];
            if (!routeToValue[key]) {
                continue;
            }
            var keys = [];
            var match = pathToRegexp(route, keys).exec(pathname);
            if (!match) {
                continue;
            }
            return {
                keys: keys,
                match: match,
                value: routeToValue[key],
            };
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    throw new Error("No route found");
}
exports.getValueFromPath = getValueFromPath;
function getValueAndParamsFromPath(pathname, routes, routeToValue) {
    var _a = getValueFromPath(pathname, routes, routeToValue), keys = _a.keys, match = _a.match, value = _a.value;
    // TODO decide on wether I should read from querystring
    var params = {};
    for (var i = 1; i < match.length; i += 1) {
        var key = keys[i - 1];
        var prop = key.name;
        var matchValue = match[i];
        if (value !== undefined) {
            params[prop] = matchValue;
        }
    }
    return {
        value: value,
        params: params,
    };
}
exports.getValueAndParamsFromPath = getValueAndParamsFromPath;
//# sourceMappingURL=client.js.map