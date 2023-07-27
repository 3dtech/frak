import PrimitiveRenderer from 'rendering/renderers/PrimitiveRenderer.js'
import QuadsRenderBuffer from 'rendering/buffers/QuadsRenderBuffer.js'
import UniformMat4 from 'rendering/shaders/UniformMat4.js'

/** Renders cube with given size at given transform (assuming the vertex shader works as intended) */

class CubeRenderer extends PrimitiveRenderer {
	size: any;
	renderBuffer: any;
	
	/** Constructor
		@param context Rendering context
		@param matrix Transformation matrix
		@param material Cube material
		@param size Size of the cube
		*/
	constructor(context, matrix, size, material) {
		super(matrix, material);
		this.size=size;

		var halfsize=this.size/2;
		var vertices=[
				// Top
				-halfsize, -halfsize,  halfsize,
				 halfsize, -halfsize,  halfsize,
				 halfsize, -halfsize, -halfsize,
				-halfsize, -halfsize, -halfsize,

				// Bottom
				-halfsize,  halfsize,  halfsize,
				 halfsize,  halfsize,  halfsize,
				 halfsize,  halfsize, -halfsize,
				-halfsize,  halfsize, -halfsize
		  ];

		var faces=[
				0, 1, 2, 3, // Top
				4, 5, 6, 7, // Bottom
				0, 1, 5, 4, // and round...
				1, 2, 6, 5,
				2, 3, 7, 6,
				3, 0, 0, 7
			];
		this.renderBuffer=new QuadsRenderBuffer(context, faces);
		this.renderBuffer.add("position", vertices, 3);
	}

	onRender(context) {
		this.material.bind({
					"modelview": new UniformMat4(context.modelview.top()),
					"projection": new UniformMat4(context.projection.top())
				});
		this.renderBuffer.render(this.material.shader);
		this.material.unbind();
	}

}

globalThis.CubeRenderer = CubeRenderer;

export default CubeRenderer;