const { expect } = require('chai');
const { describe, it } = require('mocha');

const { conjuction } = require('../src/fn.js');

describe('conjuction()', () => {
  const expectations = [
    {
      sentence: 'lions',
      sentences: [
        'lions',
      ],
    },
    {
      sentence: 'lions, and tigers',
      sentences: [
        'lions',
        'tigers',
      ],
    },
    {
      sentence: 'lions, tigers, and bears',
      sentences: [
        'lions',
        'tigers',
        'bears',
      ],
    },
  ];

  expectations.forEach((expectation) => {
    it(expectation.sentence, () => {
      expect(conjuction(expectation.sentences)).to.equal(expectation.sentence);
    });
  });
});

