import Uniform from 'rendering/shaders/Uniform.js'

/** 2x2 matrix uniform */

class UniformMat2 extends Uniform {

	
	type(): any {
		return "UniformMat2";
	}

	bind(context, uniformLocation): any {
		context.gl.uniformMatrix2fv(uniformLocation, 0, this.value);
	}

	clone() {
		var c = this._super();
		c.value = mat2.clone(this.value);
		return c;
	}

}

globalThis.UniformMat2 = UniformMat2;

export default UniformMat2;