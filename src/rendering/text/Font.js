/** Font class is used to keep font textures, data and material. Essentially everything 
	that is loaded and required to draw the font on GPU. */
var Font=Class.extend({
	/** Constructor 
		@param materialSource Material used to render the font. Material textures are automatically replaced by appropriate font textures while rendering
		@param descriptor FontDescriptor, if provided [optional] */
	init: function(materialSource, descriptor) {
		this.data=false;
		this.materialSource=materialSource;
		this.descriptor=descriptor;
	}
});