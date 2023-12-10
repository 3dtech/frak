import Cloneable from 'scene/Cloneable';

/** Base uniform class. Uniforms are used as parameters for shaders. */
class Uniform extends Cloneable {
	value: any;

	constructor(value?) {
		super();
		this.value = value;
	}

	/** Called by Shader to bind the uniform and/or associated data
		@param context Instance of RenderingContext
		@param uniformLocation Location of uniform */
	bind(context, uniformLocation): any {}

	clone() {
		var c = super.clone();
		c.value = this.value;
		return c;
	}
}

globalThis.Uniform = Uniform;
export default Uniform;
