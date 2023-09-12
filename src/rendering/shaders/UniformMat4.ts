import Uniform from 'rendering/shaders/Uniform';

/** 4x4 matrix uniform */
class UniformMat4 extends Uniform {
	bind(context, uniformLocation): any {
		context.gl.uniformMatrix4fv(uniformLocation, false, this.value);
	}

	type(): any {
		return "UniformMat4";
	}

	clone() {
		var c = super.clone();
		c.value = mat4.clone(this.value);
		return c;
	}
}

globalThis.UniformMat4 = UniformMat4;
export default UniformMat4;
