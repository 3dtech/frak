/** Base uniform class. Uniforms are used as parameters for shaders. */
var Uniform=Cloneable.extend({
	init: function(value) {
		this.value = value;
	},

	/** Called by Shader to bind the uniform and/or associated data
		@param context Instance of RenderingContext
		@param uniformLocation Location of uniform */
	bind: function(context, uniformLocation) {},

	clone: function() {
		var c = this._super();
		c.value = this.value;
		return c;
	}
});