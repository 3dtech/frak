import Subshader from 'rendering/shaders/Subshader.js'

/** FragmentShader for ShaderProgram. */

class FragmentShader extends Subshader {
	compiledShader: any;
	
	constructor(shader, code) {
		super(shader, code, this.FRAGMENT_SHADER);
		this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
	}

	getFilename(): any {
		return this.shader.descriptor.fragmentSource;
	}

	onContextRestored(context) {
		this.compiledShader = this.context.gl.createShader(this.context.gl.FRAGMENT_SHADER);
		this._super(context);
	}

}

globalThis.FragmentShader = FragmentShader;

export default FragmentShader;