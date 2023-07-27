import Subshader from 'rendering/shaders/Subshader.js'

/** VertexShader for ShaderProgram. */

class VertexShader extends Subshader {
	compiledShader: any;
	
	constructor(shader, code) {
		super(shader, code, this.VERTEX_SHADER);
		this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER);
	}

	getFilename(): any {
		return this.shader.descriptor.vertexSource;
	}

	onContextRestored(context) {
		this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER);
		this._super(context);
	}

}

globalThis.VertexShader = VertexShader;

export default VertexShader;