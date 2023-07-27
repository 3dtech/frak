import Descriptor from 'scene/descriptors/Descriptor.js'
import Shader from 'rendering/shaders/Shader.js'
import ShaderDescriptor from 'scene/descriptors/ShaderDescriptor.js'
import Uniform from 'rendering/shaders/Uniform.js'
import TextureDescriptor from 'scene/descriptors/TextureDescriptor.js'

/** Material descriptor is used for describing materials */

class MaterialDescriptor extends Descriptor {
	shaderDescriptor: any;
	uniforms: any;
	textureDescriptors: any;
	materialResourceDescriptor: any;
	requirements: any;
	
	/** Constructor. If source is not given a new texture is created with given width and height.
		@param shaderDescriptor Shader descriptor used by the material. Eg {"source": new ShaderDescriptor("shaders/default/diffuse")}
		@param uniforms Uniform values as object. Eg {"uniformVec4": [1,2,3,4], "uniformInt": 5, ...}. The appropriate types for uniforms are described in shader descriptor
		@param textureDescriptor Object of texture descriptors. Eg {"diffuse0": new TextureDescriptor("textures/diffuse0.png"), ...}}
		*/
	constructor(shaderDescriptor, uniforms, textureDescriptors) {
		super();
		if(!textureDescriptors) textureDescriptors=[];
		if(!uniforms) uniforms={};
		this.shaderDescriptor=shaderDescriptor;
		this.uniforms=uniforms;
		this.textureDescriptors=textureDescriptors;
		
		this.materialResourceDescriptor=false;	// Optional resource descriptor
		
		this.requirements={};
	}
	
	type(): any {
		return "MaterialDescriptor";
	}
	
	equals(other) {
		return false;
	}

}

globalThis.MaterialDescriptor = MaterialDescriptor;

export default MaterialDescriptor;