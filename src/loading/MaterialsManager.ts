import Manager from 'loading/Manager.js'
import ShadersManager from 'loading/ShadersManager.js'
import TexturesManager from 'loading/TexturesManager.js'
import TextDescriptor from 'scene/descriptors/TextDescriptor.js'
import MaterialDescriptor from 'scene/descriptors/MaterialDescriptor.js'
import Material from 'rendering/materials/Material.js'
import Sampler from 'rendering/shaders/Sampler.js'

/** Used to load materials.	*/

class MaterialsManager extends Manager {
	shadersManager: any;
	texturesManager: any;
	context: any;

	/** Constructor */
	constructor(context, assetsPath?, shadersManager?, texturesManager?) {
		super(assetsPath);

		if(shadersManager && !(shadersManager instanceof ShadersManager)) throw "shadersManager is not instance of ShadersManager";
		if(texturesManager && !(texturesManager instanceof TexturesManager)) throw "texturesManager is not instance of TexturesManager";

		if(!shadersManager) shadersManager=new ShadersManager(context);
		this.shadersManager=shadersManager;

		if(!texturesManager) texturesManager=new TexturesManager(context);
		this.texturesManager=texturesManager;

		this.context=context;
	}

	/** Adds new text descriptor to loading queue. This is a helper
		function to load textures simply by providing path
		@param source Path to source
		@return New text resource object (until not loaded: {'data': false, 'descriptor': new TextDescriptor(source)}) */
	add(source): any {
		source = this.sourceCallback(source);
		return this.addDescriptor(new MaterialDescriptor(source)); // FIXME: MaterialDescriptor does not have any such constructor
	}

	createResource(materialDescriptor): any {
		var material=new Material();
		material.descriptor=materialDescriptor;
		return material;
	}

	loadResource(materialDescriptor, material, loadedCallback, failedCallback) {
		var descriptor = this.descriptorCallback(materialDescriptor);

		var scope = this;
		var shader;

		// Only load shader, if it's available
		if(descriptor.shaderDescriptor) {
			shader=this.shadersManager.addDescriptor(descriptor.shaderDescriptor);
		}

		this.shadersManager.load(function() {
			var textures={};
			for(var t in descriptor.textureDescriptors) {
				textures[t]=scope.texturesManager.addDescriptor(descriptor.textureDescriptors[t]);
			}

			scope.texturesManager.load(function() {
				if(!material.samplers) material.samplers=[];
				for(var mt in textures) {
					material.samplers.push(new Sampler(mt, textures[mt]));
				}

				material.shader=shader;
				material.uniforms=descriptor.uniforms;

				if(descriptor.requirements && material.shader) {
					material.shader.requirements.transparent=descriptor.requirements.transparent;
				}

				loadedCallback(descriptor, material);
			});
		});
	}

}

globalThis.MaterialsManager = MaterialsManager;

export default MaterialsManager;
