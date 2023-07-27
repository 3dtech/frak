import Color from 'rendering/Color';
import UniformVec4 from 'rendering/shaders/UniformVec4.js'

/** Color uniform (actually just a vec4 uniform). */

class UniformColor extends UniformVec4 {


	constructor(value?) {
		if (!value) {
			super(vec4.fromValues(1.0, 1.0, 1.0, 1.0));
			return;
		}

		if (value instanceof Color) {
			super((value as any).toVector());
			return;
		}

		if ('r' in value && 'g' in value && 'b' in value && 'a' in value) {
			super(vec4.fromValues(value.r, value.g, value.b, value.a));
			return;
		}

		super(vec4.fromValues(1.0, 1.0, 1.0, 1.0));
	}

	type() {
		return "UniformColor";
	}

}

globalThis.UniformColor = UniformColor;

export default UniformColor;
