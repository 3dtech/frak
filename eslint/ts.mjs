export default {
	'@typescript-eslint/adjacent-overload-signatures': 'warn',
	'@typescript-eslint/array-type': 'warn',
	'@typescript-eslint/await-thenable': 'warn',
	'@typescript-eslint/ban-ts-comment': [
		'warn',
		{
			'ts-check': 'allow-with-description',
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': 'allow-with-description',
		},
	],
	'@typescript-eslint/ban-types': 'warn',
	'@typescript-eslint/class-literal-property-style': 'warn',
	'@typescript-eslint/class-methods-use-this': [
		'warn',
		{
			enforceForClassFields: false,
			ignoreOverrideMethods: true,
		},
	],
	'@typescript-eslint/consistent-generic-constructors': [
		'warn',
		'type-annotation',
	],
	'@typescript-eslint/consistent-indexed-object-style': [
		'warn',
		'index-signature',
	],
	'@typescript-eslint/consistent-return': [
		'warn',
		{
			treatUndefinedAsUnspecified: true,
		},
	],
	'@typescript-eslint/consistent-type-assertions': 'warn',
	'@typescript-eslint/consistent-type-definitions': 'warn',
	'@typescript-eslint/consistent-type-exports': 'warn',
	'@typescript-eslint/consistent-type-imports': 'warn',
	'@typescript-eslint/default-param-last': 'warn',
	'@typescript-eslint/dot-notation': [
		'warn',
		{
			allowPattern: '^[a-z]+(_[a-z]+)+$',
		},
	],
	'@typescript-eslint/explicit-member-accessibility': [
		'warn',
		{
			accessibility: 'no-public',
			overrides: {
				constructors: 'off',
				parameterProperties: 'explicit',
			},
		},
	],
	'@typescript-eslint/member-ordering': [
		'warn',
		{
			default: {
				memberTypes: [
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
				order: 'alphabetically',
			},
		},
	],
	'@typescript-eslint/method-signature-style': 'warn',
	'@typescript-eslint/naming-convention': 'warn',
	'@typescript-eslint/no-array-constructor': 'warn',
	'@typescript-eslint/no-array-delete': 'warn',
	'@typescript-eslint/no-base-to-string': 'warn',
	'@typescript-eslint/no-confusing-non-null-assertion': 'warn',
	'@typescript-eslint/no-confusing-void-expression': [
		'warn',
		{
			ignoreArrowShorthand: true,
			ignoreVoidOperator: true,
		},
	],
	'@typescript-eslint/no-duplicate-enum-values': 'warn',
	'@typescript-eslint/no-duplicate-type-constituents': 'warn',
	'@typescript-eslint/no-dynamic-delete': 'warn',
	'@typescript-eslint/no-empty-function': [
		'warn',
		{
			allow: [
				'arrowFunctions',
				'overrideMethods'
			],
		},
	],
	'@typescript-eslint/no-empty-interface': 'warn',
	'@typescript-eslint/no-extra-non-null-assertion': 'warn',
	'@typescript-eslint/no-extraneous-class': 'warn',
	'@typescript-eslint/no-floating-promises': [
		'warn',
		{
			ignoreVoid: true,
		},
	],
	'@typescript-eslint/no-for-in-array': 'warn',
	'@typescript-eslint/no-implied-eval': 'warn',
	'@typescript-eslint/no-import-type-side-effects': 'warn',
	'@typescript-eslint/no-inferrable-types': 'warn',
	'@typescript-eslint/no-invalid-this': 'warn',
	'@typescript-eslint/no-invalid-void-type': 'warn',
	'@typescript-eslint/no-loop-func': 'warn',
	'@typescript-eslint/no-meaningless-void-operator': 'warn',
	'@typescript-eslint/no-misused-promises': 'warn',
	'@typescript-eslint/no-mixed-enums': 'warn',
	'@typescript-eslint/no-redundant-type-constituents': 'warn',
	'@typescript-eslint/no-require-imports': 'warn',
	'@typescript-eslint/no-shadow': 'warn',
	'@typescript-eslint/no-this-alias': 'warn',
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
	// '@typescript-eslint/no-unnecessary-condition': 'warn',
	'@typescript-eslint/no-unnecessary-qualifier': 'warn',
	'@typescript-eslint/no-unnecessary-type-assertion': 'warn',
	'@typescript-eslint/no-unnecessary-type-arguments': 'warn',
	'@typescript-eslint/no-unnecessary-type-constraint': 'warn',
	'@typescript-eslint/no-unsafe-return': 'warn',
	'@typescript-eslint/no-unsafe-unary-minus': 'warn',
	'@typescript-eslint/no-unused-expressions': 'warn',
	'@typescript-eslint/no-unused-vars': [
		'warn',
		{
			args: 'none',   // Allow args, because class method overrides should still have the same signature
			varsIgnorePattern: '^_',
		},
	],
	'@typescript-eslint/no-use-before-define': 'warn',
	'@typescript-eslint/no-useless-constructor': 'warn',
	'@typescript-eslint/no-useless-template-literals': 'warn',
	'@typescript-eslint/no-var-requires': 'warn',
	'@typescript-eslint/non-nullable-type-assertion-style': 'warn',
	// '@typescript-eslint/only-throw-error': 'warn',
	'@typescript-eslint/parameter-properties': [
		'warn',
		{
			prefer: 'parameter-property'
		}
	],
	'@typescript-eslint/prefer-find': 'warn',
	'@typescript-eslint/prefer-for-of': 'warn',
	'@typescript-eslint/prefer-function-type': 'warn',
	'@typescript-eslint/prefer-includes': 'warn',
	// '@typescript-eslint/prefer-nullish-coalescing': 'warn',
	'@typescript-eslint/prefer-optional-chain': 'warn',
	'@typescript-eslint/prefer-readonly': 'warn',
	'@typescript-eslint/prefer-reduce-type-parameter': 'warn',
	'@typescript-eslint/prefer-regexp-exec': 'warn',
	'@typescript-eslint/prefer-return-this-type': 'warn',
	'@typescript-eslint/prefer-string-starts-ends-with': 'warn',
	'@typescript-eslint/promise-function-async': 'warn',
	'@typescript-eslint/require-array-sort-compare': 'warn',
	'@typescript-eslint/require-await': 'warn',
	'@typescript-eslint/restrict-plus-operands': 'warn',
	'@typescript-eslint/sort-type-constituents': 'warn',
	// '@typescript-eslint/strict-boolean-expressions': 'warn',
	'@typescript-eslint/switch-exhaustiveness-check': 'warn',
	'@typescript-eslint/triple-slash-reference': 'warn',
	'@typescript-eslint/unified-signatures': 'warn',

	// Disable overridden eslint rules
	'class-methods-use-this': 'off',
	'consistent-return': 'off',
	'default-param-last': 'off',
	'dot-notation': 'off',
	'no-array-constructor': 'off',
	'no-empty-function': 'off',
	'no-implied-eval': 'off',
	'no-invalid-this': 'off',
	'no-loop-func': 'off',
	'no-shadow': 'off',
	'no-throw-literal': 'off',
	'no-unused-expressions': 'off',
	'no-unused-vars': 'off',
	'no-use-before-define': 'off',
	'no-useless-constructor': 'off',
	'require-await': 'off',
};
