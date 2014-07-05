/** Uniforms are used as parameters for shaders. */
var UniformMat2=Uniform.extend({
	type: function() {
		return "UniformMat2";
	},

	bind: function(context, uniformLocation) {
		context.gl.uniformMatrix2fv(uniformLocation, 0, this.value);
	},
	
	clone: function() {
		var c=this._super();
		c.value=mat2.clone(value);
		return c;
	}
});