import Uniform from 'rendering/shaders/Uniform.js'

/** vec4(x, y, z, w) uniform */

class UniformVec4 extends Uniform {


	constructor(value) {
		if (!value)
			value = vec4.create();

		if (value instanceof Float32Array) {
			super(value);
		}
		else {
			super(new Float32Array(value));
		}
	}

	type(): any {
		return "UniformVec4";
	}

	bind(context, uniformLocation): any {
		context.gl.uniform4fv(uniformLocation, this.value);
	}

	clone() {
		var c = super.clone();
		c.value = vec4.clone(this.value);
		return c;
	}

}

globalThis.UniformVec4 = UniformVec4;

export default UniformVec4;
