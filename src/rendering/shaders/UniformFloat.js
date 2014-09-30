/** Float uniform */
var UniformFloat=Uniform.extend({
	bind: function(context, uniformLocation) {
		context.gl.uniform1f(uniformLocation, this.value);
	},

	type: function() {
		return "UniformFloat";
	}
});