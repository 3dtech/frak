import Serializable from 'scene/Serializable.js'
import Shader from 'rendering/shaders/Shader.js'
import MaterialDescriptor from 'scene/descriptors/MaterialDescriptor.js'
import Sampler from 'rendering/shaders/Sampler.js'

/** Material definition */

class Material extends Serializable {
	name: any;
	shader: any;
	uniforms: any;
	samplers: any;
	descriptor: any;
	boundSamplers: any;

	/** Constructor
		@param shader Shader that will be used
		@param uniforms Shader uniforms as object described in Shader.use
		@param samplers Shader samplers as array described in Shader.bindSamplers/unbindSamplers
		@param descriptor MaterialDescriptor instance [optional] */
	constructor(shader?, uniforms?, samplers?: Sampler[], name?, descriptor?) {
		super();
		this.name = name;
		if (!this.name)
			this.name = 'unnamed_' + Math.round(Math.random() * Math.pow(36, 12)).toString(36);

		this.shader = shader; ///< Instance of Shader
		this.uniforms = uniforms; ///< Shader uniforms as described by Shader
		this.samplers = samplers; ///< Shader samplers list
		this.descriptor = descriptor;

		this.boundSamplers = new SamplerAccumulator();
	}

	type(): any {
		return "Material";
	}

	/** Binds material
		@param uniforms Optional extra uniforms to go with the material
		@param ... All the rest of the arguments are treated as optional
		extra samplers or lists of samplers to go with the material */
	bind(uniforms): any {
		if (!this.shader)
			return;

		this.shader.use(this.uniforms);
		if (uniforms) {
			this.shader.bindUniforms(uniforms);
		}

		var arg;

		for (var i = 1, l = arguments.length; i < l; ++i) {
			arg = arguments[i];

			if (arg instanceof Sampler) {
				this.boundSamplers.add(arg);
			}
			else if (arg instanceof Array) {
				for (var j = 0, l2 = arg.length; j < l2; ++j) {
					this.boundSamplers.add(arg[j]);
				}
			}
		}

		for (var i=0, l3 = this.samplers.length; i < l3; ++i)
			this.boundSamplers.add(this.samplers[i]);

		if (this.boundSamplers.length == 0 && this.shader.context.engine) {
			this.boundSamplers.add(this.shader.context.engine.DiffuseFallbackSampler);
		}

		this.shader.bindSamplers(this.boundSamplers.samplers);
	}

	/** Unbinds material */
	unbind(): any {
		if (!this.shader)
			return;
		this.shader.unbindSamplers(this.boundSamplers.samplers);
		this.boundSamplers.clear();
	}

	instantiate() {
		var uniforms = {};
		for (var i in this.uniforms) {
			uniforms[i] = this.uniforms[i].clone();
		}

		var samplers = [];
		for (var i in this.samplers) {
			if(typeof this.samplers[i] == "object")
				samplers.push(this.samplers[i].clone());
		}

		var copy = new Material(this.shader, uniforms, samplers, this.descriptor);
		copy.name = this.name+" (instance)";
		return copy;
	}

}

globalThis.Material = Material;

export default Material;
