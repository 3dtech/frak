export default {
	'@stylistic/array-bracket-newline': [
		'warn',
		'consistent',
	],
	'@stylistic/array-bracket-spacing': 'warn',
	'@stylistic/array-element-newline': [
		'warn',
		'consistent',
	],
	'@stylistic/arrow-parens': [
		'warn',
		'as-needed',
	],
	'@stylistic/arrow-spacing': 'warn',
	'@stylistic/block-spacing': 'warn',
	'@stylistic/brace-style': [
		'warn',
		'1tbs',
		{
			allowSingleLine: true,
		},
	],
	'@stylistic/comma-dangle': [
		'warn',
		'always-multiline',
	],
	'@stylistic/comma-spacing': 'warn',
	'@stylistic/comma-style': 'warn',
	'@stylistic/computed-property-spacing': 'warn',
	'@stylistic/dot-location': [
		'warn',
		'property',
	],
	'@stylistic/eol-last': 'warn',
	'@stylistic/function-call-argument-newline': [
		'warn',
		'consistent',
	],
	'@stylistic/function-call-spacing': 'warn',
	'@stylistic/function-paren-newline': [
		'warn',
		'multiline-arguments',
	],
	'@stylistic/implicit-arrow-linebreak': 'warn',
	'@stylistic/indent': [
		'warn',
		'tab',
		{
			MemberExpression: 0,
			SwitchCase: 1,
		},
	],
	'@stylistic/indent-binary-ops': [
		'warn',
		'tab',
	],
	'@stylistic/key-spacing': 'warn',
	'@stylistic/keyword-spacing': 'warn',
	'@stylistic/linebreak-style': 'warn',
	'@stylistic/lines-around-comment': [
		'warn',
		{
			afterLineComment: false,
			allowArrayStart: true,
			allowBlockStart: true,
			allowClassStart: true,
			allowEnumStart: true,
			allowInterfaceStart: true,
			allowModuleStart: true,
			allowObjectStart: true,
			beforeBlockComment: true,
			beforeLineComment: true,
		},
	],
	'@stylistic/lines-between-class-members': [
		'warn',
		{
			enforce: [
				{ blankLine: 'always', prev: '*', next: 'method' },
			],
		},
	],
	'@stylistic/max-len': [
		'warn',
		{
			code: 120,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
		},
	],
	'@stylistic/max-statements-per-line': 'warn',
	'@stylistic/member-delimiter-style': 'warn',
	'@stylistic/multiline-ternary': [
		'warn',
		'always-multiline',
	],
	'@stylistic/new-parens': 'warn',
	'@stylistic/newline-per-chained-call': 'warn',
	'@stylistic/no-confusing-arrow': [
		'warn',
		{
			allowParens: true,
			onlyOneSimpleParam: true,
		},
	],
	'@stylistic/no-extra-parens': [
		'warn',
		'all',
		{
			nestedBinaryExpressions: false,
			ternaryOperandBinaryExpressions: false,
		},
	],
	'@stylistic/no-extra-semi': 'warn',
	'@stylistic/no-mixed-operators': 'warn',
	'@stylistic/no-mixed-spaces-and-tabs': 'warn',
	'@stylistic/no-multi-spaces': 'warn',
	'@stylistic/no-multiple-empty-lines': [
		'warn',
		{
			max: 1,
			maxBOF: 0,
			maxEOF: 1,
		},
	],
	'@stylistic/no-tabs': [
		'warn',
		{
			allowIndentationTabs: true,
		},
	],
	'@stylistic/no-trailing-spaces': 'warn',
	'@stylistic/no-whitespace-before-property': 'warn',
	'@stylistic/nonblock-statement-body-position': [
		'warn',
		'below',
	],
	'@stylistic/object-curly-newline': [
		'warn',
		{
			ExportDeclaration: {
				consistent: true,
				multiline: true,
			},
			ImportDeclaration: {
				consistent: true,
				multiline: true,
			},
			ObjectExpression: {
				consistent: true,
				minProperties: 2,
				multiline: true,
			},
			ObjectPattern: {
				consistent: true,
				minProperties: 2,
				multiline: true,
			},
		},
	],
	'@stylistic/object-curly-spacing': [
		'warn',
		'always',
	],
	'@stylistic/object-property-newline': 'warn',
	'@stylistic/one-var-declaration-per-line': 'warn',
	'@stylistic/operator-linebreak': [
		'warn',
		'after',
	],
	'@stylistic/padded-blocks': [
		'warn',
		'never',
	],
	'@stylistic/padding-line-between-statements': [
		'warn',
		{
			blankLine: 'always',
			next: ['break', 'continue', 'return'],
			prev: '*',
		},
		{
			blankLine: 'always',
			next: '*',
			prev: ['const', 'let', 'var'],
		},
		{
			blankLine: 'any',
			next: ['const', 'let', 'var'],
			prev: ['const', 'let', 'var'],
		},
		{
			blankLine: 'always',
			next: ['if', 'for', 'while'],
			prev: '*',
		},
		{
			blankLine: 'any',
			next: ['if', 'for', 'while'],
			prev: ['const', 'let', 'var'],
		},
		{
			blankLine: 'always',
			next: '*',
			prev: ['multiline-block-like', 'multiline-expression'],
		},
		{
			blankLine: 'always',
			next: ['case', 'default'],
			prev: '*',
		},
		{
			blankLine: 'any',
			next: 'case',
			prev: 'case',
		},
	],
	'@stylistic/quote-props': [
		'warn',
		'as-needed',
	],
	'@stylistic/quotes': [
		'warn',
		'single',
	],
	'@stylistic/rest-spread-spacing': 'warn',
	'@stylistic/semi': 'warn',
	'@stylistic/semi-spacing': 'warn',
	'@stylistic/semi-style': 'warn',
	'@stylistic/space-before-blocks': 'warn',
	'@stylistic/space-before-function-paren': [
		'warn',
		{
			anonymous: 'never',
			asyncArrow: 'always',
			named: 'never',
		},
	],
	'@stylistic/space-in-parens': 'warn',
	'@stylistic/space-infix-ops': [
		'warn',
		{
			int32Hint: true,
		},
	],
	'@stylistic/space-unary-ops': 'warn',
	'@stylistic/spaced-comment': [
		'warn',
		'always',
		{
			block: {
				balanced: true,
			},
		},
	],
	'@stylistic/switch-colon-spacing': 'warn',
	'@stylistic/template-curly-spacing': 'warn',
	'@stylistic/template-tag-spacing': 'warn',
	'@stylistic/type-annotation-spacing': 'warn',
	'@stylistic/type-generic-spacing': 'warn',
	'@stylistic/type-named-tuple-spacing': 'warn',
	'@stylistic/wrap-iife': [
		'warn',
		'inside',
	],
};
