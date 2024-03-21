import { dirname } from 'node:path';
import { fileURLToPath } from "node:url";
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser';
import rules from './eslint.rules.mjs';
import typedRules from './eslint.rules.ts.mjs';

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
			'@typescript-eslint': tseslint.plugin,
		},
		rules,
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
