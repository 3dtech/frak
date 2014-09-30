/** vec4(x, y, z, w) uniform */
var UniformVec4=Uniform.extend({
	init: function(value) {
		if(value instanceof Float32Array) {
			this._super(value);
		}
		else this._super(new Float32Array(value));
	},

	type: function() {
		return "UniformVec4";
	},

	bind: function(context, uniformLocation) {
		context.gl.uniform4fv(uniformLocation, this.value);
	},

	clone: function() {
		var c = this._super();
		c.value = vec4.clone(this.value);
		return c;
	}
});