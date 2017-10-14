'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var querystring = require('querystring');

function getQueryString() {
  // eslint-disable-next-line no-undef
  return querystring.parse(window.location.search.substr(1));
}

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

function setMath(a, b) {
  return {
    remove: [].concat(_toConsumableArray(a)).filter(function (x) {
      return !b.has(x);
    }),
    add: [].concat(_toConsumableArray(b)).filter(function (x) {
      return !a.has(x);
    })
  };
}

function conjuction(sentences) {
  var length = sentences.length;

  var sentence = '';
  for (var i = 0; i < length; i += 1) {
    sentence += sentences[i];

    if (i < length - 2) {
      sentence += ', ';
    } else if (i === length - 2) {
      sentence += ', and ';
    }
  }

  return sentence;
}

var MS_IN_DAY = 24 * 60 * 60 * 1000;
var MARCH = 2;
var FEBRUARY_28 = 59;
var FEBRUARY_29 = 60;
var MARCH_1 = 61;

function dayOfYear(date) {
  var year = date.getFullYear();
  var isLeapYear = year % 4 == 0;

  var startOfYear = new Date(date.toString());
  startOfYear.setFullYear(year, 0, 0);
  startOfYear.setHours(0);

  var ms = date.getTime() - startOfYear.getTime();
  var days = Math.floor(ms / MS_IN_DAY);

  if (isLeapYear) {
    return days;
  }

  return date.getMonth() >= MARCH ? days + 1 : days;
}

function currentDaysOfYear() {
  return _currentDaysOfYear(new Date());
}

function _currentDaysOfYear(date) {
  var isLeapYear = date.getFullYear() % 4 == 0;

  var doy = dayOfYear(date);

  if (isLeapYear) {
    return [doy];
  } else if (doy <= FEBRUARY_28) {
    return [doy];
  } else if (doy == MARCH_1) {
    return [FEBRUARY_29, MARCH_1];
  } else {
    return [doy];
  }
}

module.exports = {
  getQueryString: getQueryString,
  getWindowHash: getWindowHash,
  setWindowHash: setWindowHash,
  setMath: setMath,
  conjuction: conjuction,
  dayOfYear: dayOfYear,
  currentDaysOfYear: currentDaysOfYear,
  _currentDaysOfYear: _currentDaysOfYear
};