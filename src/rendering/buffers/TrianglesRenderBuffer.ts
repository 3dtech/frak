import RenderBuffer from 'rendering/buffers/RenderBuffer.js'

/** Render buffer is used for to keep WebGL buffers and faces.
	Usage:
		var positions=[
									0.5, 0, 0,
									0.1, 0.1, 0,
									0.1, 0.5, 0
									];
		var faces=[0, 1, 2];

		var renderBuffer=new TrianglesRenderBuffer(renderingContext, faces);
		renderBuffer.add("position", positions, 3);
		renderBuffer.render(shader);
 */

class TrianglesRenderBuffer extends RenderBuffer {


	/** Constructor
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...]
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	constructor(context, faces, type?) {
		super(context, faces, type);
	}

	drawElements() {
		var gl=this.context.gl;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		gl.drawElements(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}

}

globalThis.TrianglesRenderBuffer = TrianglesRenderBuffer;

export default TrianglesRenderBuffer;
