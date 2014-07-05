/** Uniforms are used as parameters for shaders. */
var UniformColor=UniformVec4.extend({
	init: function(value) {
		this._super([value.r, value.g, value.b, value.a]);
	},
	
	type: function() {
		return "UniformColor";
	}
});