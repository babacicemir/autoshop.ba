import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'quotes': ['error', 'single'], 
      'semi': ['error', 'never'], 
      'no-console': 'warn', 
      'indent': ['error', 2], 
      'object-curly-spacing': ['error', 'always'], 
    },
  },
]
