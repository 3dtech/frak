import RenderBufferVAO from 'rendering/buffers/RenderBufferVAO';

/**
 * Render buffer for drawing triangle primitives. Uses vertex array objects.
 */
class TrianglesRenderBufferVAO extends RenderBufferVAO {


	/** Constructor
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...]
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	constructor(context, faces, type?) {
		super(context, faces, type);
	}

	drawElements() {
		var gl=this.context.gl;
		gl.drawElements(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}
}

globalThis.TrianglesRenderBufferVAO = TrianglesRenderBufferVAO;
export default TrianglesRenderBufferVAO;
