const pathToRegexp = require('path-to-regexp');

interface Routes {
  [key: string]: any;
}

interface RouteToValueConfig {
  [path: string]: string;
}

/* Should this be a class or a function?
 *
 * - It only needs to be called once, on the client side to get which page to
 *   load.
 * - We need to call `pathtoRegexp()` because we need the `keys`
 *
 */
export function getValueFromPath(
  pathname:string,
  routes:Routes,
  routeToValue:RouteToValueConfig,
) {
  for (const key in routes) {
    const route = routes[key];

    if (!routeToValue[key]) {
      continue;
    }

    const keys = [];
    const match = pathToRegexp(route, keys).exec(pathname);
    if (!match) {
      continue;
    }

    return {
      keys,
      match,
      value: routeToValue[key],
    }
  }

  throw new Error("No route found");
}

export function getValueAndParamsFromPath(
  pathname:string,
  routes:Routes,
  routeToValue:RouteToValueConfig,
) {
  let {
    keys,
    match,
    value,
  } = getValueFromPath(pathname, routes, routeToValue);

  // TODO decide on wether I should read from querystring
  const params = {};

  for (let i = 1; i < match.length; i++) {
    const key = keys[i - 1];
    const prop = key.name;
    const value = match[i];

    if (value !== undefined) {
      params[prop] = value;
    }
  }

  return {
    value,
    params,
  };
}
