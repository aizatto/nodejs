"use strict";
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
    for (var key in routes) {
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
    throw new Error("No route found");
}
exports.getValueFromPath = getValueFromPath;
function getValueAndParamsFromPath(pathname, routes, routeToValue) {
    var _a = getValueFromPath(pathname, routes, routeToValue), keys = _a.keys, match = _a.match, value = _a.value;
    // TODO decide on wether I should read from querystring
    var params = {};
    for (var i = 1; i < match.length; i++) {
        var key = keys[i - 1];
        var prop = key.name;
        var value_1 = match[i];
        if (value_1 !== undefined) {
            params[prop] = value_1;
        }
    }
    return {
        value: value,
        params: params,
    };
}
exports.getValueAndParamsFromPath = getValueAndParamsFromPath;
//# sourceMappingURL=client.js.map