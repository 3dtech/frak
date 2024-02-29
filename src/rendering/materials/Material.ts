import Serializable from 'scene/Serializable';
import Sampler from 'rendering/shaders/Sampler';
import SamplerAccumulator from 'rendering/shaders/SamplerAccumulator';
import DefinitionsHelper from "../DefinitionsHelper";
import Shader from '../shaders/Shader';
import Uniform from '../shaders/Uniform';

interface Uniforms {
	[key: string]: Uniform;
}

/** Material definition */
class Material extends Serializable {
	boundSamplers: any;
	transparent = false;	// TODO: Requirements spread across too many files? (Shader, this, SubmeshRenderer)
	unlit = false;
	customShader = false;
	stencilLayer = 1;
	definitions = new DefinitionsHelper();

	/** Constructor
		@param shader Shader that will be used
		@param uniforms Shader uniforms as object described in Shader.use
		@param samplers Shader samplers as array described in Shader.bindSamplers/unbindSamplers
		@param descriptor MaterialDescriptor instance [optional] */
	constructor(public shader?: Shader, public uniforms?: Uniforms, public samplers: Sampler[] = [], public name?: string) {
		super();
		this.name = name;
		if (!this.name)
			this.name = 'unnamed_' + Math.round(Math.random() * Math.pow(36, 12)).toString(36);

		for (const sampler of this.samplers) {
			switch (sampler.name) {
				case 'diffuse0':
					this.definitions.addDefinition('DIFFUSE_TEXTURE');

					break;

				case 'normal0':
					this.definitions.addDefinition('NORMAL_TEXTURE');

					break;
			}
		}

		this.boundSamplers = new SamplerAccumulator();
	}

	type(): any {
		return "Material";
	}

	/** @deprecated Prefer to bind your requirements directly in the appropriate render stage to avoid repeat work */
	bind(uniforms?, ...samplers): any {
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

		var copy = new Material(this.shader, uniforms, samplers);
		copy.definitions = this.definitions.clone();
		copy.name = this.name+" (instance)";
		return copy;
	}

}

globalThis.Material = Material;

export default Material;
