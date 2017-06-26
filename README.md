This is a set of functions/classes/components that I regularly use.

For my personal use, but could be useful for others to see how to do things.

# Install

  yarn add git+ssh://git@github.com:aizatto/nodejs.git

# Develope against another repository

In the cloned directory:

  yarn link

In the repository you want to work in:

  yarn link aizatto

- https://yarnpkg.com/en/docs/cli/link

# Uses

http://eslint.org
https://flow.org

# To Use

  import { setMath } = require('aizatto/lib/fn.js');

# Misc

If types are missing

  yarn run flow-type install
