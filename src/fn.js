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

module.exports = {
  getQueryString,
  getWindowHash,
  setWindowHash,
  setMath,
  conjuction,
};
