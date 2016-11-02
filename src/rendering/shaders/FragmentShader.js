/** FragmentShader for ShaderProgram. */
var FragmentShader=Subshader.extend({
	init: function(shader, code) {
		this._super(shader, code, this.FRAGMENT_SHADER);
		this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
	},

	getFilename: function() {
		return this.shader.descriptor.fragmentSource;
	},

	onContextRestored: function(context) {
		this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
		this._super(context);
	}
});
