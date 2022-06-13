module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable'
  },
  ignorePatterns: ['build'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'always'],
    'no-empty-function': 'error',
    // 'no-console': 'error',
    'valid-typeof': 'error',
    'keyword-spacing': ['error', { before: true }],
    'arrow-spacing': 'error',
    'no-multi-spaces': 'error',
    semi: ['error', 'never'],
    'no-duplicate-imports': 'error',
    'space-in-parens': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'no-self-compare': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'indent': ['error', 2],
    'key-spacing': ['error', { 'beforeColon': false }],
    'no-multiple-empty-lines': 'error',
    'no-whitespace-before-property': 'error',
    'rest-spread-spacing': ['error', 'never'],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/jsx-curly-newline': [
      'error',
      { multiline: 'consistent', singleline: 'consistent' }
    ],
    'react/jsx-indent-props': [
      2,
      { indentMode: 2, ignoreTernaryOperator: true }
    ],
    'react/jsx-tag-spacing': ['error'],
    // 'react/jsx-newline': [2, { prevent: true }],
    'react/jsx-indent': [
      2,
      2,
      { indentLogicalExpressions: true, checkAttributes: true }
    ]
  },
  settings: { react: { version: 'detect' } }
}