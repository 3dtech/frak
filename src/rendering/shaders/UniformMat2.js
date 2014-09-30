/** 2x2 matrix uniform */
var UniformMat2=Uniform.extend({
	type: function() {
		return "UniformMat2";
	},

	bind: function(context, uniformLocation) {
		context.gl.uniformMatrix2fv(uniformLocation, 0, this.value);
	},

	clone: function() {
		var c = this._super();
		c.value = mat2.clone(this.value);
		return c;
	}
});