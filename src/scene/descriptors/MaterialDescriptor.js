/** Material descriptor is used for describing materials */
var MaterialDescriptor=Descriptor.extend({
	/** Constructor. If source is not given a new texture is created with given width and height.
		@param shaderDescriptor Shader descriptor used by the material. Eg {"source": new ShaderDescriptor("shaders/default/diffuse")}
		@param uniforms Uniform values as object. Eg {"uniformVec4": [1,2,3,4], "uniformInt": 5, ...}. The appropriate types for uniforms are described in shader descriptor
		@param textureDescriptor Object of texture descriptors. Eg {"diffuse0": new TextureDescriptor("textures/diffuse0.png"), ...}}
		*/
	init: function(shaderDescriptor, uniforms, textureDescriptors) {
		this._super();
		if(!textureDescriptors) textureDescriptors=[];
		if(!uniforms) uniforms={};
		this.shaderDescriptor=shaderDescriptor;
		this.uniforms=uniforms;
		this.textureDescriptors=textureDescriptors;
		
		this.materialResourceDescriptor=false;	// Optional resource descriptor
		
		this.requirements={};
	},
	
	type: function() {
		return "MaterialDescriptor";
	},
	
	equals: function(other) {
		return false;
	}
});