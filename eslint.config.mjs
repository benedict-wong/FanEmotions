import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import html from 'eslint-plugin-html';
import { defineConfig } from 'eslint/config';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('./prettier.config.cjs');

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier: prettierPlugin },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: prettierConfig,
  },
  { files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    extends: ['markdown/recommended'],
  },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
  { files: ['**/*.html'], plugins: { html } },
]);
