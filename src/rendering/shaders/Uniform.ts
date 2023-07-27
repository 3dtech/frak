import Cloneable from 'scene/Cloneable.js'
import Shader from 'rendering/shaders/Shader.js'
import RenderingContext from 'rendering/RenderingContext.js'

/** Base uniform class. Uniforms are used as parameters for shaders. */

class Uniform extends Cloneable {
	value: any;
	
	constructor(value) {
		this.value = value;
	}

	/** Called by Shader to bind the uniform and/or associated data
		@param context Instance of RenderingContext
		@param uniformLocation Location of uniform */
	bind(context, uniformLocation): any {}

	clone() {
		var c = this._super();
		c.value = this.value;
		return c;
	}

}

globalThis.Uniform = Uniform;

export default Uniform;