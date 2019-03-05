const { expect } = require('chai');
const { getValueFromPath, getValueAndParamsFromPath } = require('../src/client');

describe('getValueFromPath', () => {
  enum Route {
    users,
    homepage,
  };

  const Routes = {
    [Route.users]: '/users/:name',
    [Route.homepage]: '/',
  };

  const Values = {
    [Route.users]: 'Users',
    [Route.homepage]: 'HomePage',
  }

  it('getValueFromPath', () => {
    expect(getValueFromPath('/', Routes, Values).value).to.equal('HomePage');
  });

  it('getValueAndParamsFromPath', () => {
    expect(getValueAndParamsFromPath('/users/aizat', Routes, Values)).to.deep.equal({
      value: 'Users',
      params: {
        name: 'aizat',
      },
    });
  });

  it('errors', () => {
    expect(() => getValueFromPath('/404', Routes, Values)).to.throw();
  });
});
