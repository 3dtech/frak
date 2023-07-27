import Material from 'rendering/materials/Material.js'

/** Font class is used to keep font textures, data and material. Essentially everything 
	that is loaded and required to draw the font on GPU. */

class Font {
	data: any;
	materialSource: any;
	descriptor: any;
	
	/** Constructor 
		@param materialSource Material used to render the font. Material textures are automatically replaced by appropriate font textures while rendering
		@param descriptor FontDescriptor, if provided [optional] */
	init(materialSource, descriptor) {
		this.data=false;
		this.materialSource=materialSource;
		this.descriptor=descriptor;
	}

}

globalThis.Font = Font;

export default Font;