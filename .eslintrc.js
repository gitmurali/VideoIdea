module.exports = {
  extends: 'airbnb',
  env: {
    jest: true,
    jasmine: true,
    browser: true,
  },
  rules: {
    'linebreak-style': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    radix: ['error', 'as-needed'],
    'spaced-comment': 'warn',
  },
};
