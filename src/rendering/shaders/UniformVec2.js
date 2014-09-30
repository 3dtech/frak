/** vec2(x, y) uniform */
var UniformVec2=Uniform.extend({
	init: function(value) {
		if(value instanceof Float32Array) {
			this._super(value);
		}
		else this._super(new Float32Array(value));
	},

	type: function() {
		return "UniformVec2";
	},

	bind: function(context, uniformLocation) {
		context.gl.uniform2fv(uniformLocation, this.value);
	},

	clone: function() {
		var c = this._super();
		c.value = vec2.clone(this.value);
		return c;
	}
});