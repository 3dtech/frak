/** vec3(x, y, z) uniform */
var UniformVec3=Uniform.extend({
	init: function(value) {
		if(value instanceof Float32Array) {
			this._super(value);
		}
		else this._super(new Float32Array(value));
	},

	type: function() {
		return "UniformVec3";
	},

	bind: function(context, uniformLocation) {
		context.gl.uniform3fv(uniformLocation, this.value);
	},

	clone: function() {
		var c = this._super();
		c.value = vec3.clone(this.value);
		return c;
	}
});