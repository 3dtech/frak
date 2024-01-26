import RenderingContext from "../RenderingContext";

const VERTEX_SHADER = 0;
const FRAGMENT_SHADER = 1;

/** Subshader is the baseclass that keeps the code that can be linked to shader program later.
	Use VertexShader and FragmentShader to create appropriate types of shaders for ShaderProgram. */
class Subshader {
	shader: any;
	context: any;
	code: string;
	type: any;
	compiledShader: any;
	failedCompilation: any;

	constructor(shader, code, type) {
		this.shader=shader;
		this.context=shader.context;
		this.code=code;
		this.type=type;

		// Created by subclass (either FragmentShader or VertexShader)
		this.compiledShader=false;
		this.failedCompilation=false;
	}

	attach(): any {
		this.context.gl.attachShader(this.shader.program, this.compiledShader);
	}

	getFilename(): any {
		return 'Unknown';
	}

	/** Preprocesses shader code. Currently only supports #include <filename> */
	preprocess(context: RenderingContext, definitions?: string[]) {
		const lines = this.code.split('\n');

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();

			if (line.startsWith('#include')) {
				const filename = line.split(' ')[1].replace(/"/g, '');
				const snippet = context.getShaderSnippet(filename);

				if (!snippet) {
					throw `Shader snippet ${filename} not found`;
				}

				lines.splice(i, 1, ...snippet.split('\n'));
			}
		}

		if (definitions) {
			definitions = definitions.map(d => `#define ${d}`);

			lines.splice(1, 0, ...definitions);
		}

		this.code = lines.join('\n');
	}

	/** Compiles the shader. Normally called by shader program prior to linking. */
	compile(context, definitions): any {
		if(this.failedCompilation) return;	// Only try to compile one time

		if(!this.compiledShader) throw 'WebGL shader has not been created. FragmentShader or VertexShader class instances should be used, not Shader.';

		this.preprocess(context, definitions);

		this.context.gl.shaderSource(this.compiledShader, this.code);
		this.context.gl.compileShader(this.compiledShader);

		var status = this.context.gl.getShaderParameter(this.compiledShader, this.context.gl.COMPILE_STATUS);
		if (!status) {
			if(!this.failedCompilation) {
				this.failedCompilation=true;
				throw 'Shader \''+this.getFilename()+'\' failed to compile: '+this.context.gl.getShaderInfoLog(this.compiledShader);
			}
		}
	}

	onContextRestored(context) {
		this.failedCompilation = false;
		this.context = context;
		this.attach();
	}
}

globalThis.Subshader = Subshader;
export {Subshader as default, VERTEX_SHADER, FRAGMENT_SHADER};
