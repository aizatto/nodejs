"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getWindowHash(keys) {
  // eslint-disable-next-line no-undef
  var key = window.location.hash.substr(1);
  if (!keys.has(key)) {
    key = keys.values().next().value;
  }
  return key;
}

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

module.exports = {
  getWindowHash: getWindowHash,
  setMath: setMath
};