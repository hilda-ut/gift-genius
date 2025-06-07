import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'dist/**',
      'build/**',
      'out/**',
      'node_modules/**',
      '.cache/**',
      'coverage/**',
      '*.min.js',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'sort-imports': ['error', {
        'ignoreCase': true,
        'ignoreDeclarationSort': true,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      }],
      'no-unused-vars': ['warn', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      }],
      'no-console': ['warn', {
        'allow': ['warn', 'error'],
      }],
      'react/self-closing-comp': 'error',
      'react/no-unused-prop-types': 'error',
      'react/jsx-curly-spacing': ['error', {
        'when': 'never',
        'children': true,
      }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
    },
  },
];

export default eslintConfig;
