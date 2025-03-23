import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import rules from './eslint/rules.mjs';
import stylisticRules from './eslint/stylistic.mjs';
import typedRules from './eslint/ts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
	{
		files: ['**/*.ts', '**/*.js', '**/*.mjs'],
		languageOptions: {
			parser: parser,
			parserOptions: {
				project: true,
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@jsdoc': jsdoc,
			'@stylistic': stylistic,
			'@typescript-eslint': tseslint.plugin,
		},
		rules,
	},
	{
		rules: stylisticRules,
	},
	{
		files: ['**/*.ts'],
		rules: typedRules,
	},
	{
		files: ['**/*.js', '**/*.mjs'],
		...tseslint.configs.disableTypeChecked,
	},
);
