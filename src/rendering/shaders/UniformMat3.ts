import Uniform from 'rendering/shaders/Uniform';

/** 3x3 matrix uniform */
class UniformMat3 extends Uniform {
	bind(context, uniformLocation): any {
		context.gl.uniformMatrix3fv(uniformLocation, false, this.value);
	}

	type(): any {
		return "UniformMat3";
	}

	clone() {
		var c = super.clone();
		c.value = mat3.clone(this.value);
		return c;
	}
}

globalThis.UniformMat3 = UniformMat3;
export default UniformMat3;
