import Uniform from 'rendering/shaders/Uniform';

/** vec2(x, y) uniform */
class UniformVec2 extends Uniform {
	constructor(value?) {
		if (!value)
			value = vec2.create();

		if (value instanceof Float32Array) {
			super(value);
		}
		else {
			super(new Float32Array(value));
		}
	}

	type(): any {
		return "UniformVec2";
	}

	bind(context, uniformLocation): any {
		context.gl.uniform2fv(uniformLocation, this.value);
	}

	clone() {
		var c = super.clone();
		c.value = vec2.clone(this.value);
		return c;
	}
}

globalThis.UniformVec2 = UniformVec2;
export default UniformVec2;
