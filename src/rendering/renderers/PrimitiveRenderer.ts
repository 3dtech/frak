import Renderer from 'rendering/renderers/Renderer';

/** Renderer baseclass. Handles rendering of components and anything else that needs to be rendered using given RenderingContext. */

class PrimitiveRenderer extends Renderer {
	material: any;

	/** Constructor
		@param matrix Matrix applied to anything rendered
		@param material Material to be used for rendering
		*/
	constructor(matrix, material) {
		super(matrix);
		this.material=material;
	}

}

globalThis.PrimitiveRenderer = PrimitiveRenderer;

export default PrimitiveRenderer;
