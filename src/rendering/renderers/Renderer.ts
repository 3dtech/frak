import BoundingBox from 'scene/geometry/BoundingBox.js';
import BoundingSphere from 'scene/geometry/BoundingSphere.js';
import UniformMat4 from 'rendering/shaders/UniformMat4.js';
import Material from '../materials/Material';

/** Renderer baseclass. Essentially Renderer classes are for containing ready-made buffers
  that are used straight for rendering. To render many at once add them to DynamicSpace. */

class Renderer {
	matrix: any;
	layer: any;
	visible: any;
	castShadows: any;
	receiveShadows: any;
	lightContribution: any;
	reflectivity: any;
	localBoundingBox: any;
	localBoundingSphere: any;
	globalBoundingBox: any;
	globalBoundingSphere: any;
	material: Material;

	/** Constructor
		@param matrix Matrix applied to anything rendered
		*/
	constructor(matrix) {
		// Usually updated automatically by the component
		this.matrix = matrix;
		this.layer = 1;
		this.visible = true;
		this.castShadows = true;
		this.receiveShadows = true;
		this.lightContribution = 1.0;
		this.reflectivity = 0.0;

		this.localBoundingBox = new BoundingBox();
		this.localBoundingSphere = new BoundingSphere();
		this.globalBoundingBox = new BoundingBox();
		this.globalBoundingSphere = new BoundingSphere();
	}

	// Methods
	/** Rendering function that calls onRender method doing the actual rendering
		@param context Instance of RenderingContext
		@param pass Rendering pass */
	render(context, pass): any {
		this.onRender(context, pass);
	}

	/** Rendering function that calls onRenderGeometry method doing the actual rendering.
		Used to render plain geometry with given shader.
		@param context Instance of RenderingContext
		@param shader Instance of Shader */
	renderGeometry(context, shader): any {
		this.onRenderGeometry(context, shader);
	}

	/**
	 * Returns default uniforms used commonly for everything.
	 * @param context Instance of RenderingContext
	 * @param uniforms Optional previously allocated uniforms object (cache) that the values will be written to.
	 */
	getDefaultUniforms(context, uniforms): any {
		if (typeof uniforms !== 'object' || uniforms === null) {
			uniforms = {};
		}

		if (uniforms.hasOwnProperty('model')) mat4.copy(uniforms.model.value, this.matrix);
		else uniforms.model = new UniformMat4(this.matrix);

		return uniforms;
	}

	getGlobalSamplers(context): any {
		var samplers = [];
		if (context.shadow) {
			samplers.push(context.shadow.shadow0);
		}
		return samplers;
	}

	/** Updates matrix and global bounding volumes */
	setMatrix(matrix): any {
		this.matrix = matrix;
		this.updateGlobalBoundingVolumes();
	}

	/** Updates global bounding volumes */
	updateGlobalBoundingVolumes(): any {
		this.localBoundingBox.transform(this.matrix, this.globalBoundingBox);
		this.localBoundingSphere.transform(this.matrix, this.globalBoundingSphere);
	}

	// Events
	/** Called when render is called
		@param context Instance of RenderingContext
		@param pass Rendering pass */
	onRender(context, pass): any {}

	/** Called when renderGeometry is called
		@param context Instance of RenderingContext
		@param shader Instance of Shader */
	onRenderGeometry(context, shader) {}

}

globalThis.Renderer = Renderer;

export default Renderer;
