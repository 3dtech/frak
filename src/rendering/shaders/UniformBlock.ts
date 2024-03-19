import RenderingContext from '../RenderingContext';

interface Block {
	[key: string]: BufferSource;
}

interface Offsets {
	[key: string]: number;
}

class UniformBlock {
	private buffer: WebGLBuffer;
	private offsets: Offsets = {};

	constructor(
		public name: string,
		public values: Block,
		private type: number = WebGL2RenderingContext.STATIC_DRAW
	) {}

	create(context: RenderingContext, program: WebGLProgram) {
		const gl = context.gl;
		const blockIndex = gl.getUniformBlockIndex(program, this.name);
		const blockSize = gl.getActiveUniformBlockParameter(program, blockIndex, gl.UNIFORM_BLOCK_DATA_SIZE);

		this.buffer = gl.createBuffer();

		gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer);
		gl.bufferData(gl.UNIFORM_BUFFER, blockSize, this.type);
		gl.bindBuffer(gl.UNIFORM_BUFFER, null);

		const uniforms = Object.keys(this.values);
		const indices = gl.getUniformIndices(program, uniforms);
		const offsets = gl.getActiveUniforms(program, indices, gl.UNIFORM_OFFSET);

		uniforms.forEach((v, i) => {
			this.offsets[v] = offsets[i];
		});
	}

	bindBuffer(context: RenderingContext) {
		context.gl.bindBuffer(context.gl.UNIFORM_BUFFER, this.buffer);
	}

	unbindBuffer(context: RenderingContext) {
		context.gl.bindBuffer(context.gl.UNIFORM_BUFFER, null);
	}

	updateIndividual(context: RenderingContext, name: string, value: BufferSource) {
		const gl = context.gl;
		gl.bufferSubData(gl.UNIFORM_BUFFER, this.offsets[name], value);
	}

	update(context: RenderingContext) {
		const gl = context.gl;
		this.bindBuffer(context);

		Object.entries(this.values).forEach(([name, value]) => {
			gl.bufferSubData(gl.UNIFORM_BUFFER, this.offsets[name], value);
		});

		this.unbindBuffer(context);
	}

	bind(context: RenderingContext, location: number) {
		const gl = context.gl;
		gl.bindBufferBase(gl.UNIFORM_BUFFER, location, this.buffer);
	}
}

globalThis.UniformBlock = UniformBlock;
export default UniformBlock;
