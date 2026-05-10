module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    '@nuxtjs/eslint-config/typescript',
  ],
  rules: {
    'no-console': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
  },
}
