/** VertexShader for ShaderProgram. */
var VertexShader=Subshader.extend({
	init: function(shader, code) {
		this._super(shader, code, this.VERTEX_SHADER);
		this.compiledShader=this.context.gl.createShader(this.context.gl.VERTEX_SHADER);
	},

	getFilename: function() {
		return this.shader.descriptor.vertexSource;
	}
});