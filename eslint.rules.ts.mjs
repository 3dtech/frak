export default {
	'@stylistic/brace-style': [
		'warn',
		'1tbs',
		{
			allowSingleLine: true,
		},
	],
	'@stylistic/nonblock-statement-body-position': [
		'warn',
		'below',
	],
	'@typescript-eslint/adjacent-overload-signatures': 'warn',
	'@typescript-eslint/array-type': [
		'warn',
		{
			default: 'array-simple',
		},
	],
	'@typescript-eslint/await-thenable': 'warn',
	'@typescript-eslint/consistent-type-assertions': 'warn',
	'@typescript-eslint/consistent-type-definitions': [
		'warn',
		'interface',
	],
	'@typescript-eslint/explicit-member-accessibility': [
		'warn',
		{
			overrides: {
				constructors: 'off',
			},
		},
	],
	'@typescript-eslint/indent': [
		'warn',
		'tab',
		{
			MemberExpression: 0,
			SwitchCase: 1,
		},
	],
	'@typescript-eslint/member-ordering': [
		'warn',
		{
			default: [
				// Statics
				'private-static-field',
				'protected-static-field',
				'public-static-field',
				'private-static-method',
				'protected-static-method',
				'public-static-method',
				// Fields
				'private-instance-field',
				'protected-instance-field',
				'public-instance-field',

				'constructor',

				// Methods
				'private-instance-method',
				'protected-instance-method',
				'public-instance-method',
			],
		},
	],
	'@typescript-eslint/no-extraneous-class': 'warn',
	'@typescript-eslint/no-floating-promises': [
		'warn',
		{
			ignoreVoid: true,
		},
	],
	'@typescript-eslint/no-inferrable-types': 'warn',
	'@typescript-eslint/no-require-imports': 'warn',
	'@typescript-eslint/no-this-alias': 'warn',
	'@typescript-eslint/no-unnecessary-qualifier': 'warn',
	'@typescript-eslint/no-unnecessary-type-arguments': 'warn',
	'@typescript-eslint/no-unsafe-return': 'warn',
	'@typescript-eslint/no-unused-expressions': 'warn',
	'@typescript-eslint/no-unused-vars': [
		'warn',
		{
			args: 'none',   // Allow args, because class method overrides should still have the same signature
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
		},
	],
	'@typescript-eslint/no-use-before-define': 'warn',
	'@typescript-eslint/no-useless-constructor': 'warn',
	'@typescript-eslint/no-var-requires': 'warn',
	'@typescript-eslint/prefer-for-of': 'warn',
	'@typescript-eslint/prefer-readonly': 'warn',
	'@typescript-eslint/promise-function-async': 'warn',
	'@typescript-eslint/require-await': 'warn',
	'@typescript-eslint/restrict-plus-operands': 'warn',
	'@typescript-eslint/semi': 'warn',
	'@typescript-eslint/triple-slash-reference': 'warn',
	'@typescript-eslint/type-annotation-spacing': 'warn',
};
