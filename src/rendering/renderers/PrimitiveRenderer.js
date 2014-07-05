/** Renderer baseclass. Handles rendering of components and anything else that needs to be rendered using given RenderingContext. */
var PrimitiveRenderer=Renderer.extend({
	/** Constructor
		@param matrix Matrix applied to anything rendered 
		@param material Material to be used for rendering
		*/
	init: function(matrix, material) {
		this._super(matrix);
		this.material=material;
	}
});