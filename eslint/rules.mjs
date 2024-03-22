export default {
	'@jsdoc/require-jsdoc': [
		'warn',
		{
			publicOnly: true,
			require: {
				MethodDefinition: true,
			},
		},
	],
	'arrow-body-style': 'warn',
	camelcase: 'warn',
	'class-methods-use-this': [
		'warn',
		{
			enforceForClassFields: false,
		},
	],
	'consistent-return': [
		'warn',
		{
			treatUndefinedAsUnspecified: true,
		},
	],
	'consistent-this': [
		'warn',
		'scope',
	],
	'constructor-super': 'warn',
	curly: [
		'warn',
		'multi-line',
	],
	'default-case': 'warn',
	'default-param-last': 'warn',
	'dot-notation': [
		'warn',
		{
			allowPattern: '^[a-z]+(_[a-z]+)+$',
		},
	],
	eqeqeq: 'error',
	'max-classes-per-file': 'warn',
	'no-array-constructor': 'warn',
	'no-cond-assign': ['warn', 'except-parens'],
	'no-constant-condition': 'warn',
	'no-debugger': 'warn',
	'no-duplicate-case': 'warn',
	'no-empty': 'warn',
	'no-empty-function': [
		'warn',
		{
			allow: ['arrowFunctions'],
		},
	],
	'no-eval': 'warn',
	'no-extra-semi': 'warn',
	'no-fallthrough': 'warn',
	'no-invalid-regexp': 'warn',
	'no-invalid-this': 'warn',
	'no-irregular-whitespace': 'warn',
	'no-multi-str': 'warn',
	'no-redeclare': 'warn',
	'no-regex-spaces': 'warn',
	'no-restricted-syntax': [
		'warn',
		'ForInStatement',
	],
	'no-return-await': 'warn',
	'no-sequences': 'warn',
	'no-sparse-arrays': 'warn',
	'no-template-curly-in-string': 'warn',
	'no-unexpected-multiline': 'warn',
	'no-unsafe-finally': 'warn',
	'no-unused-labels': 'warn',
	'no-var': 'warn',
	'one-var': [
		'warn',
		{
			initialized: 'never',
			uninitialized: 'consecutive',
		},
	],
	'prefer-object-spread': 'warn',
	radix: [
		'warn',
		'as-needed',
	],
	/* 'sort-keys': [
		'warn',
		'asc',
		{
			natural: true,
		},
	], */
	'use-isnan': 'warn',
	'valid-typeof': [
		'warn',
		{
			requireStringLiterals: true,
		},
	],
	yoda: 'warn',
};
