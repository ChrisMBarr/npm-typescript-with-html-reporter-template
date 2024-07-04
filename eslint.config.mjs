import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import _import from 'eslint-plugin-import';
import eslintComments from 'eslint-plugin-eslint-comments';
import functional from 'eslint-plugin-functional';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/coverage'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:eslint-comments/recommended',
      'plugin:@typescript-eslint/strict',
      'plugin:import/typescript'
    )
  ),
  {
    plugins: {
      import: fixupPluginRules(_import),
      'eslint-comments': fixupPluginRules(eslintComments),
      functional,
    },
    languageOptions: {
      globals: {},
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    files: ['src/**/*.ts'],

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-invalid-this': 'warn',
      '@typescript-eslint/no-loop-func': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-redeclare': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/prefer-regexp-exec': 'warn',
      '@typescript-eslint/return-await': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      'array-callback-return': 'warn',
      'no-invalid-this': 'off',
      'no-loop-func': 'off',
      'no-redeclare': 'off',
      'no-return-await': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      complexity: ['warn', { max: 8 }],
      eqeqeq: ['warn', 'always', { null: 'ignore' }],
      'no-unused-vars': 'warn',
      'object-shorthand': ['warn', 'always'],
      'eslint-comments/disable-enable-pair': ['warn', { allowWholeFile: true }],
      'eslint-comments/no-unused-disable': 'warn',
      'functional/no-return-void': 'off',
      'import/order': ['warn', { alphabetize: { order: 'asc' } }],
      'sort-imports': ['warn', { ignoreDeclarationSort: true, ignoreCase: true }],
    },
  },
  {
    files: ['**/*.spec.ts', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
