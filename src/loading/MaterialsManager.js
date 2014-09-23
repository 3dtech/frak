/** Used to load materials.	*/
var MaterialsManager=Manager.extend({
	/** Constructor */
	init: function(context, assetsPath, shadersManager, texturesManager) {
		this._super(assetsPath);

		if(shadersManager && !(shadersManager instanceof ShadersManager)) throw "shadersManager is not instance of ShadersManager";
		if(texturesManager && !(texturesManager instanceof TexturesManager)) throw "texturesManager is not instance of TexturesManager";

		if(!shadersManager) shadersManager=new ShadersManager(context);
		this.shadersManager=shadersManager;

		if(!texturesManager) texturesManager=new TexturesManager(context);
		this.texturesManager=texturesManager;

		this.context=context;
	},

	/** Adds new text descriptor to loading queue. This is a helper
		function to load textures simply by providing path
		@param source Path to source
		@return New text resource object (until not loaded: {'data': false, 'descriptor': new TextDescriptor(source)}) */
	add: function(source) {
		source = this.sourceCallback(source);
		return this.addDescriptor(new MaterialDescriptor(source)); // FIXME: MaterialDescriptor does not have any such constructor
	},

	createResource: function(materialDescriptor) {
		var material=new Material();
		material.descriptor=materialDescriptor;
		return material;
	},

	loadResource: function(materialDescriptor, material, loadedCallback, failedCallback) {
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
});