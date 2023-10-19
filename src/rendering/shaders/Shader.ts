import Serializable from 'scene/Serializable';
import ShadersManager from 'loading/ShadersManager';
import RenderingContext from 'rendering/RenderingContext';
import ShaderRequirements from 'rendering/shaders/ShaderRequirements';
import VertexShader from 'rendering/shaders/VertexShader';
import FragmentShader from 'rendering/shaders/FragmentShader';
import Uniform from 'rendering/shaders/Uniform';
import Sampler from 'rendering/shaders/Sampler';
import ExplicitAttributeLocations from './AttributeLocations';

/**
 * Used to compile and link vertex and fragment shader to a shader program.
 */

class Shader extends Serializable {
	descriptor: any;
	context: any;
	program: any;
	shaders: any;
	requirements: any;
	linked: any;
	failed: any;
	uniformLocations: any;
	bindings: any;
	definitions: any;
	vertexShader: VertexShader;
	fragmentShader: FragmentShader;

	/** Constructor
		@param context Rendering context
		@param descriptor Shader source descriptor normally passed to shader by ShadersManager to make it identifiable later [optional] */
	constructor(context, descriptor) {
		if (!context) {
			throw 'Shader: RenderingContext required';
		}

		super();

		this.descriptor = descriptor;
		this.context = context;
		this.program = context.gl.createProgram();
		this.shaders = [];
		this.requirements = new ShaderRequirements();
		this.linked = false;
		this.failed = false;
		this.uniformLocations = {};

		this.bindings = {};

		this.definitions = [
			'ALPHAMODE_OPAQUE 0',
			'ALPHAMODE_MASK 1',
			'ALPHAMODE_BLEND 2'
		].concat(descriptor.definitions);
	}

	excluded(): any {
		return true;
	}

	included(): any {
		return ['descriptor'];
	}

	/** Creates a fragment shader from given code and adds it to this shader program
		@param code Shader code */
	addVertexShader(code): any {
		this.vertexShader=new VertexShader(this, code);

		this.addShader(this.vertexShader);
	}

	/** Creates a fragment shader from given code and adds it to this shader program
		@param code Shader code */
	addFragmentShader(code): any {
		this.fragmentShader=new FragmentShader(this, code);

		this.addShader(this.fragmentShader);
	}

	/** Adds a shader
		@param shader Instance of VertexShader or FragmentShader */
	addShader(shader): any {
		this.shaders.push(shader);
		shader.attach();
	}

	/** Compiles and links the shader program */
	link(): any {
		if (this.failed) {
			return;
		}

		for (var i=0; i<this.shaders.length; i++) {
			this.shaders[i].compile(this.context, this.definitions);
		}

		this.uniformLocations = {};
		this.linked = true;
		this.context.gl.linkProgram(this.program);
		var status = this.context.gl.getProgramParameter(this.program, this.context.gl.LINK_STATUS);
		if (!status) {
			console.error('Shader linking failed: ', this.context.gl.getProgramInfoLog(this.program));
			this.linked = false;
			this.failed = true;

			return;
		}

		// if supported, map standard binding blocks immediately
		this.updateBlockBindings(this.context);
	}

	/** Uses the shader program. Links automatically, if not linked
		@param uniforms Object of named uniform variables (all values must be instances of Uniform)
		                that will be passed to shader [optional] */
	use(uniforms?): any {
		if(this.failed) return;

		if(this.shaders.length<2) return;	// Don't try to use, there are not enough added subshaders (ie vertex and fragment)

		if(!this.linked) this.link();

		if(!this.linked) return;
		this.context.gl.useProgram(this.program);
		this.bindUniforms(uniforms);
	}

	getAttribLocation(bufferName): any {
		if (bufferName in ExplicitAttributeLocations) {
			return ExplicitAttributeLocations[bufferName];
		}

		return this.context.gl.getAttribLocation(this.program, bufferName);
	}

	getUniformLocation(uniformName): any {
		if (!(uniformName in this.uniformLocations)) {
			this.uniformLocations[uniformName] = this.context.gl.getUniformLocation(this.program, uniformName);
		}

		return this.uniformLocations[uniformName];
	}

	/** Binds uniform variables to this shader.
		This method is called by Shader.use, if uniforms are passed to it, but it can be called separately
		as well during batching.
		@param uniforms Uniform variables that will be passed to shader
	*/
	bindUniforms(uniforms?): any {
		if (!uniforms) {
			return;
		}

		if (!this.linked) {
			return;
		}

		for (var uniformName in uniforms) {
			var uniformLocation = this.getUniformLocation(uniformName);

			if (!uniformLocation || uniformLocation == -1) {
				continue;
			}

			var uniform = uniforms[uniformName];
			if (!uniform) {
				throw 'Uniform \''+uniformName+'\' is undefined.';
			}

			uniform.bind(this.context, uniformLocation);
		}
	}

	/** Binds all texture samplers.
		@param samplers Array of named texture samplers (values must be instances
		                of of Sampler). Eg [new Sampler("texture1", texture)] */
	bindSamplers(samplers): any {
		if (!samplers || samplers.length == 0 || !this.linked) {
			return;
		}

		var gl = this.context.gl;
		var slotIndex = 0;
		for (var i = 0; i < samplers.length; ++i) {
			var sampler = samplers[i];
			if (!sampler) {
				break;
			}

			var uniformLocation = this.getUniformLocation(sampler.name);
			if (uniformLocation == -1) {
				continue;
			}

			sampler.bind(this.context, uniformLocation, slotIndex);
			slotIndex++;
		}

		gl.activeTexture(gl.TEXTURE0);
	}

	/** Unbinds all texture samplers.
		@param samplers Array of named texture samplers (values must be instances
		                of of Sampler). Eg [new Sampler("texture1", texture)] */
	unbindSamplers(samplers): any {
		if (!samplers || samplers.length == 0 || !this.linked) {
			return;
		}

		var gl = this.context.gl;
		var slotIndex = 0;
		for (var i = 0; i < samplers.length; ++i) {
			var sampler = samplers[i];
			if (!sampler) {
				break;
			}

			var uniformLocation = this.getUniformLocation(sampler.name);
			if(uniformLocation == -1) {
				continue;
			}

			sampler.unbind(this.context, uniformLocation, slotIndex);
			slotIndex++;
		}

		gl.activeTexture(gl.TEXTURE0);
	}

	onContextRestored(context): any {
		this.context = context;
		this.program = context.gl.createProgram();
		this.uniformLocations = {};
		this.failed = false;
		this.linked = false;

		for (var i=0; i<this.shaders.length; ++i) {
			this.shaders[i].onContextRestored(context);
		}

		this.link();
	}

	updateBlockBindings(context) {
		const index = context.gl.getUniformBlockIndex(this.program, 'Camera');
		if (index !== context.gl.INVALID_INDEX) {
			context.gl.uniformBlockBinding(this.program, index, 0);
		}
	}

}

globalThis.Shader = Shader;

export default Shader;
