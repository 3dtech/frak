import Subshader, { FRAGMENT_SHADER } from 'rendering/shaders/Subshader';

/** FragmentShader for ShaderProgram. */

class FragmentShader extends Subshader {
	compiledShader: any;

	constructor(shader, code) {
		super(shader, code, FRAGMENT_SHADER);
		this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
	}

	getFilename(): any {
		return this.shader.descriptor.fragmentSource;
	}

	onContextRestored(context) {
		this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
		super.onContextRestored(context);
	}

}

globalThis.FragmentShader = FragmentShader;

export default FragmentShader;
