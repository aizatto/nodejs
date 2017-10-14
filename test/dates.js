const { expect } = require('chai');
const { describe, it } = require('mocha');

const { dayOfYear, _currentDaysOfYear } = require('../src/fn.js');

describe('Date', () => {
  const test = (dates) => {
    console.log(dates);
    Object.keys(dates).forEach((date) => {
      it(`${date}`, () => {
        const daysOfYear = _currentDaysOfYear(new Date(date));
        expect(daysOfYear).to.deep.equal(dates[date]);
      });
    })
  };

  describe('leap year', () => {
    it('correct date after February 28th', () => {
      const date = new Date('Oct 13 2016 19:33:03 GMT-0700 (PDT)');
      expect(dayOfYear(date)).to.equal(287);
    });

    it('correct date before February 28th', () => {
      const date = new Date('Feb 1 2016 19:33:03 GMT-0700 (PDT)');
      expect(dayOfYear(date)).to.equal(32);
    });

    test({
      'Jan 1 2016': [1],
      'Feb 28 2016': [59],
      'Feb 29 2016': [60],
      'Mar 1 2016': [61],
    })
  });

  describe('non leap year', () => {
    it('correct date after February 28th', () => {
      const date = new Date('Fri Oct 13 2017 19:33:03 GMT-0700 (PDT)');
      expect(dayOfYear(date)).to.equal(287);
    });

    it('correct date before February 28th', () => {
      const date = new Date('Feb 1 2017 19:33:03 GMT-0700 (PDT)');
      expect(dayOfYear(date)).to.equal(32);
    });

    test({
      'Jan 1 2016': [1],
      'Feb 28 2016': [59],
      'Mar 1 2017': [60, 61],
    })
  });
});
