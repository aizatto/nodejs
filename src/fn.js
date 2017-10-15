// @flow

const querystring = require('querystring');

function getQueryString() {
  // eslint-disable-next-line no-undef
  return querystring.parse(window.location.search.substr(1));
}

/**
 * To be used like so:
 *
 *   const key = getWindowHash(new Set(Object.keys(tabFns)));
 */
function getWindowHash(keys: Set<string>) {
  // eslint-disable-next-line no-undef
  let key = window.location.hash.substr(1);
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
  return () => {
    // eslint-disable-next-line no-undef
    window.location.hash = key;
  };
}

function setMath<T>(a: Set<T>, b: Set<T>) {
  return {
    remove: [...a].filter(x => !b.has(x)),
    add: [...b].filter(x => !a.has(x)),
  };
}

function conjuction(sentences: Array<string>) {
  const length = sentences.length;

  let sentence = '';
  for (let i = 0; i < length; i += 1) {
    sentence += sentences[i];

    if (i < length - 2) {
      sentence += ', ';
    } else if (i === length - 2) {
      sentence += ', and ';
    }
  }

  return sentence;
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MARCH = 2;
const FEBRUARY_28 = 59;
const FEBRUARY_29 = 60;
const MARCH_1 = 61;

function dayOfYear(date: Date): Number {
  const year = date.getFullYear();
  const isLeapYear = year % 4 === 0;

  const startOfYear = new Date(date.toString());
  startOfYear.setFullYear(year, 0, 0);
  startOfYear.setHours(0);

  const ms = date.getTime() - startOfYear.getTime();
  const days = Math.floor(ms / MS_IN_DAY);

  if (isLeapYear) {
    return days;
  }

  return date.getMonth() >= MARCH
    ? days + 1
    : days;
}

function currentDaysOfYear(date: Date): Array<Number> {
  const isLeapYear = date.getFullYear() % 4 === 0;

  const doy = dayOfYear(date);

  if (isLeapYear) {
    return [
      doy,
    ];
  } else if (doy <= FEBRUARY_28) {
    return [
      doy,
    ];
  } else if (doy === MARCH_1) {
    return [
      FEBRUARY_29,
      MARCH_1,
    ];
  }
  return [
    doy,
  ];
}

module.exports = {
  getQueryString,
  getWindowHash,
  setWindowHash,
  setMath,
  conjuction,
  dayOfYear,
  currentDaysOfYear,
};
