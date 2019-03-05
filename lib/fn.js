"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require('querystring');
var url = require('url');
function getQueryString() {
    // eslint-disable-next-line no-undef
    return querystring.parse(window.location.search.substr(1));
}
exports.getQueryString = getQueryString;
/**
 * To be used like so:
 *
 *   const key = getWindowHash(new Set(Object.keys(tabFns)));
 */
function getWindowHash(keys) {
    // eslint-disable-next-line no-undef
    var key = window.location.hash.substr(1);
    if (!keys.has(key)) {
        key = keys.values().next().value;
    }
    return key;
}
exports.getWindowHash = getWindowHash;
/**
 * To be used in React components.
 *
 *   const onSelect = (key) => {
 *     this.setState(
 *       { key },
 *       setWindowHash(key),
 *     );
 *   };
 */
function setWindowHash(key) {
    return function () {
        // eslint-disable-next-line no-undef
        window.location.hash = key;
    };
}
exports.setWindowHash = setWindowHash;
function setMath(a, b) {
    return {
        remove: __spread(a).filter(function (x) { return !b.has(x); }),
        add: __spread(b).filter(function (x) { return !a.has(x); }),
    };
}
exports.setMath = setMath;
function conjuction(sentences) {
    var length = sentences.length;
    var sentence = '';
    for (var i = 0; i < length; i += 1) {
        sentence += sentences[i];
        if (i < length - 2) {
            sentence += ', ';
        }
        else if (i === length - 2) {
            sentence += ', and ';
        }
    }
    return sentence;
}
exports.conjuction = conjuction;
var MS_IN_DAY = 24 * 60 * 60 * 1000;
var MARCH = 2;
var FEBRUARY_28 = 59;
var FEBRUARY_29 = 60;
var MARCH_1 = 61;
function dayOfYear(date) {
    var year = date.getFullYear();
    var isLeapYear = year % 4 === 0;
    var startOfYear = new Date(date.toString());
    startOfYear.setFullYear(year, 0, 0);
    startOfYear.setHours(0);
    var ms = date.getTime() - startOfYear.getTime();
    var days = Math.floor(ms / MS_IN_DAY);
    if (isLeapYear) {
        return days;
    }
    return date.getMonth() >= MARCH
        ? days + 1
        : days;
}
exports.dayOfYear = dayOfYear;
function currentDaysOfYear(date) {
    var isLeapYear = date.getFullYear() % 4 === 0;
    var doy = dayOfYear(date);
    if (isLeapYear) {
        return [
            doy,
        ];
        // eslint-disable-next-line no-else-return
    }
    else if (doy <= FEBRUARY_28) {
        return [
            doy,
        ];
    }
    else if (doy === MARCH_1) {
        return [
            FEBRUARY_29,
            MARCH_1,
        ];
    }
    return [
        doy,
    ];
}
exports.currentDaysOfYear = currentDaysOfYear;
function getDefaultPort(protocol) {
    switch (protocol) {
        case 'http:':
            return 80;
        case 'https:':
            return 443;
        default:
            return null;
    }
}
/**
 * Scenarios:
 * * urlA has hostname, urlB does not have hostname
 *
 * TODO: replace this logic, it is really basic
 */
function compareURL(stringA, stringB) {
    var urlA = url.parse(stringA);
    var urlB = url.parse(stringB);
    new Set([
        'protocol',
        'host',
        'hostname',
        'path',
        'port',
    ]).forEach(function (key) {
        var aValue = urlA[key];
        var bValue = urlB[key];
        if (key === 'port') {
            if (aValue === null && urlA.protocol) {
                aValue = getDefaultPort(urlA.protocol);
            }
            if (bValue === null && urlB.protocol) {
                bValue = getDefaultPort(urlB.protocol);
            }
        }
        if (aValue && !bValue) {
            urlB[key] = aValue;
        }
        else if (!aValue && bValue) {
            urlA[key] = bValue;
        }
    });
    return url.format(urlA) === url.format(urlB);
}
exports.compareURL = compareURL;
//# sourceMappingURL=fn.js.map