import pluginNext from '@next/eslint-plugin-next';

import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '.next',
      '**/*.config.js',
      '**/*.config.mjs',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@next/next': pluginNext,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error'],
      // Removed the indent rule that was causing stack overflow
      // Let Prettier handle formatting instead
    },
  },
  // Add Next.js specific configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
    },
  },
];
