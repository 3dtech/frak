/** Color uniform (actually just a vec4 uniform). */
var UniformColor=UniformVec4.extend({
	init: function(value) {
		if (!value) {
			this._super(vec4.fromValues(1.0, 1.0, 1.0, 1.0));
			return;
		}

		if (value instanceof Color) {
			this._super(value.toVector());
			return;
		}

		if ('r' in value && 'g' in value && 'b' in value && 'a' in value) {
			this._super(vec4.fromValues(value.r, value.g, value.b, value.a));
			return;
		}

		this._super(vec4.fromValues(1.0, 1.0, 1.0, 1.0));
	},

	type: function() {
		return "UniformColor";
	}
});