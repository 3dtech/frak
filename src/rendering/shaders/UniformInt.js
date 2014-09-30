/** Int uniform */
var UniformInt=Uniform.extend({
	bind: function(context, uniformLocation) {
		context.gl.uniform1i(uniformLocation, this.value);
	},

	type: function() {
		return "UniformInt";
	}
});