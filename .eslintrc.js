const path = require('path');

const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'never', normal: 'any', component: 'any' },
        svg: 'always',
        math: 'always',
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'max-len': [
      'warn',
      {
        code: 180,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'operator-linebreak': ['error', 'after'],
    'prefer-destructuring': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    camelcase: [0, { properties: 'never' }],
    'object-curly-newline': [0],
    'func-names': 0,
    'class-methods-use-this': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
