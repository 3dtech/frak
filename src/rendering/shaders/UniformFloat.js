/** Uniforms are used as parameters for shaders. 
*/
var UniformFloat=Uniform.extend({
	bind: function(context, uniformLocation) {
		context.gl.uniform1f(uniformLocation, this.value);
	},
	
	type: function() {
		return "UniformFloat";
	}
});