import Uniform from 'rendering/shaders/Uniform.js'

/** vec3(x, y, z) uniform */

class UniformVec3 extends Uniform {

	
	constructor(value) {
		if (!value)
			value = vec3.create();

		if (value instanceof Float32Array) {
			super(value);
		}
		else {
			this._super(new Float32Array(value));
		}
	}

	type(): any {
		return "UniformVec3";
	}

	bind(context, uniformLocation): any {
		context.gl.uniform3fv(uniformLocation, this.value);
	}

	clone() {
		var c = this._super();
		c.value = vec3.clone(this.value);
		return c;
	}

}

globalThis.UniformVec3 = UniformVec3;

export default UniformVec3;