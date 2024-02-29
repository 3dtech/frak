/** Base uniform class. Uniforms are used as parameters for shaders. */
class Uniform {
	value: any;

	constructor(value?) {
		this.value = value;
	}

	/** Called by Shader to bind the uniform and/or associated data
		@param context Instance of RenderingContext
		@param uniformLocation Location of uniform */
	bind(context, uniformLocation): any {}

	clone(): this {
		return new (this.constructor as new (...args: any[]) => this)(this.value);
	}
}

globalThis.Uniform = Uniform;
export default Uniform;
