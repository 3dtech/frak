import Uniform from 'rendering/shaders/Uniform';

/** Float uniform */
class UniformFloat extends Uniform {
	bind(context, uniformLocation): any {
		context.gl.uniform1f(uniformLocation, this.value);
	}

	type() {
		return "UniformFloat";
	}
}

globalThis.UniformFloat = UniformFloat;
export default UniformFloat;
