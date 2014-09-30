/** 3x3 matrix uniform */
var UniformMat3=Uniform.extend({
	bind: function(context, uniformLocation) {
		context.gl.uniformMatrix3fv(uniformLocation, 0, this.value);
	},

	type: function() {
		return "UniformMat3";
	},

	clone: function() {
		var c = this._super();
		c.value = mat3.clone(this.value);
		return c;
	}
});