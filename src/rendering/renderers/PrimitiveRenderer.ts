import Renderer from 'rendering/renderers/Renderer.js'
import Material from 'rendering/materials/Material.js'

/** Renderer baseclass. Handles rendering of components and anything else that needs to be rendered using given RenderingContext. */

class PrimitiveRenderer extends Renderer {
	material: any;
	
	/** Constructor
		@param matrix Matrix applied to anything rendered 
		@param material Material to be used for rendering
		*/
	init(matrix, material) {
		this._super(matrix);
		this.material=material;
	}

}

globalThis.PrimitiveRenderer = PrimitiveRenderer;

export default PrimitiveRenderer;