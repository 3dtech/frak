import Uniform from 'rendering/shaders/Uniform.js'

/** Int uniform */

class UniformInt extends Uniform {

	
	bind(context, uniformLocation): any {
		context.gl.uniform1i(uniformLocation, this.value);
	}

	type() {
		return "UniformInt";
	}

}

globalThis.UniformInt = UniformInt;

export default UniformInt;