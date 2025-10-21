/* eslint-disable max-classes-per-file */
import Serializable from "scene/Serializable";
import Sampler from "rendering/shaders/Sampler";
import SamplerAccumulator from "rendering/shaders/SamplerAccumulator";
import DefinitionsHelper from "../DefinitionsHelper";
import type Shader from "../shaders/Shader";
import type Uniform from "../shaders/Uniform";
import { stringHash } from "../../Helpers";

enum RendererType {
	PBR = "PBR",
	Unlit = "Unlit",
	Custom = "Custom",
}

enum TransparencyType {
	Opaque = "Opaque",
	Transparent = "Transparent",
	Mask = "Mask",
}

const TransparencyToDefinition = {
	[TransparencyType.Opaque]: "OPAQUE",
	[TransparencyType.Transparent]: "BLEND",
	[TransparencyType.Mask]: "MASK",
};

interface Properties {
	type: RendererType;
	transparency: TransparencyType;
}

class MaterialProperties implements Properties {
	hash = 0;

	constructor(
		public type: RendererType = RendererType.PBR,
		public transparency: TransparencyType = TransparencyType.Opaque,
	) {
		this.hash ^= stringHash(type);
		this.hash ^= stringHash(transparency);
	}

	setType(type: RendererType) {
		if (type === this.type) {
			return;
		}

		this.hash ^= stringHash(this.type);
		this.type = type;
		this.hash ^= stringHash(type);
	}

	setTransparency(transparency: TransparencyType) {
		if (transparency === this.transparency) {
			return;
		}

		this.hash ^= stringHash(this.transparency);
		this.transparency = transparency;
		this.hash ^= stringHash(transparency);
	}
}

interface Uniforms {
	[key: string]: Uniform;
}

/** Material definition */
class Material extends Serializable {
	boundSamplers: any;
	stencilLayer = 1;
	properties = new MaterialProperties();
	definitions = new DefinitionsHelper([
		"ALPHAMODE_OPAQUE 0",
		"ALPHAMODE_MASK 1",
		"ALPHAMODE_BLEND 2",
		`ALPHAMODE ALPHAMODE_${TransparencyToDefinition[this.properties.transparency]}`,
	]);
	hash = this.properties.hash;

	/** Constructor
		@param shader Shader that will be used
		@param uniforms Shader uniforms as object described in Shader.use
		@param samplers Shader samplers as array described in Shader.bindSamplers/unbindSamplers
		@param name string name of the material */
	constructor(public shader?: Shader, public uniforms?: Uniforms, public samplers: Sampler[] = [], public name?: string) {
		super();
		this.name = name;

		if (!this.name) { this.name = "unnamed_" + Math.round(Math.random() * Math.pow(36, 12)).toString(36); }

		for (const sampler of this.samplers) {
			switch (sampler.name) {
				case "diffuse0":
					this.definitions.addDefinition("DIFFUSE_TEXTURE");

					break;

				case "normal0":
					this.definitions.addDefinition("NORMAL_TEXTURE");

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
		if (!this.shader) { return; }

		this.shader.use(this.uniforms);

		if (uniforms) {
			this.shader.bindUniforms(uniforms);
		}

		let arg;

		for (var i = 1, l = arguments.length; i < l; ++i) {
			arg = arguments[i];

			if (arg instanceof Sampler) {
				this.boundSamplers.add(arg);
			} else if (arg instanceof Array) {
				for (let j = 0, l2 = arg.length; j < l2; ++j) {
					this.boundSamplers.add(arg[j]);
				}
			}
		}

		for (var i = 0, l3 = this.samplers.length; i < l3; ++i) { this.boundSamplers.add(this.samplers[i]); }

		if (this.boundSamplers.length === 0 && this.shader.context.engine) {
			this.boundSamplers.add(this.shader.context.engine.DiffuseFallbackSampler);
		}

		this.shader.bindSamplers(this.boundSamplers.samplers);
	}

	/** Unbinds material */
	unbind(): any {
		if (!this.shader) { return; }

		this.shader.unbindSamplers(this.boundSamplers.samplers);
		this.boundSamplers.clear();
	}

	setOptions(options: Partial<Properties>) {
		this.hash ^= this.properties.hash;

		if (options.type !== undefined) {
			this.properties.setType(options.type);
		}

		if (options.transparency !== undefined) {
			this.properties.setTransparency(options.transparency);
			this.definitions.addDefinition("ALPHAMODE", `ALPHAMODE_${TransparencyToDefinition[options.transparency]}`);
		}

		// TODO: More options (presence of textures, etc)

		this.hash ^= this.properties.hash;
	}

	setType(type: RendererType) {
		this.setOptions({ type });
	}

	setTransparency(transparency: TransparencyType) {
		this.setOptions({ transparency });
	}

	instantiate() {
		let uniforms = {};
		for (var i in this.uniforms) {
			uniforms[i] = this.uniforms[i].clone();
		}

		let samplers = [];
		for (var i in this.samplers) {
			if (typeof this.samplers[i] === "object") { samplers.push(this.samplers[i].clone()); }
		}

		let copy = new Material(this.shader, uniforms, samplers);

		copy.definitions = this.definitions.clone();
		copy.setOptions(this.properties);

		// TODO: hash
		copy.name = this.name + " (instance)";

		return copy;
	}
}

globalThis.Material = Material;

export { Material as default, MaterialProperties, RendererType, TransparencyType };
