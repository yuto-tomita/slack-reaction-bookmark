module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable'
  },
  ignorePatterns: ['build'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
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
  },
  settings: { react: { version: 'detect' } }
}