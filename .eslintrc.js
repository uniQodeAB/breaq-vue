module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'vue/require-prop-types': 0,
    'vue/html-self-closing': 0
  }
}