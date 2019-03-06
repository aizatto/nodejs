module.exports = {
  "parser": "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "aizatto",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "plugins": ["@typescript-eslint"],
  rules: {
    "no-continue": ["off"],
    "react/destructuring-assignment": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
