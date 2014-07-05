/** Used to load materials. 
	Example of usage: 
	<pre>
	var textManager=new TextManager();
	var text=textManager.add('test.txt');	// Request text file
	textManager.load(function() {
		// Result is in data, because resource must be an object
		console.log(text.data);
	});
	</pre>
	*/
var MaterialsManager=Manager.extend({
	/** Constructor */
	init: function(context, shadersManager, texturesManager) {
		this._super();
		
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
		return this.addDescriptor(new MaterialDescriptor(source));
	},

	createResource: function(materialDescriptor) {
		var material=new Material();
		material.descriptor=materialDescriptor;
		return material;
	},
	
	loadResource: function(materialDescriptor, material, loadedCallback, failedCallback) {
		var me=this;
		var shader;
		
		// Only load shader, if it's available
		if(materialDescriptor.shaderDescriptor) {
			shader=this.shadersManager.addDescriptor(materialDescriptor.shaderDescriptor);
		}
		
		this.shadersManager.load(function() {
			var textures={};
			for(var t in materialDescriptor.textureDescriptors) {
				textures[t]=me.texturesManager.addDescriptor(materialDescriptor.textureDescriptors[t]);
			}
			
			me.texturesManager.load(function() {
				if(!material.samplers) material.samplers=[];
				for(var mt in textures) {
					material.samplers.push(new Sampler(mt, textures[mt]));
				}
				
				material.shader=shader;
				material.uniforms=materialDescriptor.uniforms;
				
				if(materialDescriptor.requirements && material.shader) {
					material.shader.requirements.transparent=materialDescriptor.requirements.transparent;
				}
				
				loadedCallback(materialDescriptor, material);
			});
		});
	}
});