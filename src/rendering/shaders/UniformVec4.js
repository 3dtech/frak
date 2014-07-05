/** Uniforms are used as parameters for shaders. 
*/
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
		var c=this._super();
		c.value=mat2.clone(value);
		return c;
	}
});