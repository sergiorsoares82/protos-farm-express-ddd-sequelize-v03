import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
  },
]);
