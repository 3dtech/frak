import Subshader, { VERTEX_SHADER } from 'rendering/shaders/Subshader';

/** VertexShader for ShaderProgram. */

class VertexShader extends Subshader {
	constructor(shader, code) {
		super(shader, code, VERTEX_SHADER);
		this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER);
	}

	getFilename(): any {
		return this.shader.descriptor.vertexSource;
	}

	onContextRestored(context) {
		this.compiledShader = this.context.gl.createShader(this.context.gl.VERTEX_SHADER);
		super.onContextRestored(context);
	}

}

globalThis.VertexShader = VertexShader;

export default VertexShader;
