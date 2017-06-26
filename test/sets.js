const { expect } = require('chai');
const { describe, it } = require('mocha');

const { setMath } = require('../src/fn.js');

describe('Sets', () => {
  const a = new Set([1, 2, 3]);
  const b = new Set([3, 4, 5]);

  it('correctly returns which ones to add or remove', () => {
    const {
      add,
      remove,
    } = setMath(a, b);

    expect(Array.from(remove)).to.deep.equal([1, 2]);
    expect(Array.from(add)).to.deep.equal([4, 5]);
  });
});
