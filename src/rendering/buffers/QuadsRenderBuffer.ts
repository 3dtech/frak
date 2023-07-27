import TrianglesRenderBuffer from 'rendering/buffers/TrianglesRenderBuffer.js'

/** Render buffer is used for to keep WebGL buffers and faces.
	Usage:
		var positions=[
									0.5, 0, 0,
									0.1, 0.1, 0,
									0.1, 0.5, 0
									0.3, 0.7, 5
									];
		var faces=[0, 1, 2, 3];

		var renderBuffer=new QuadsRenderBuffer(renderingContext, faces);
		renderBuffer.add("position", positions, 3);
		renderBuffer.render(shader);
 */

class QuadsRenderBuffer extends TrianglesRenderBuffer {

	
	/** Constructor 
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...] 
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	init(context, faces, type) {
		var triangles=[];
		for(var i=0; i<faces.length-3; i++) {
			triangles.push(faces[i]);
			triangles.push(faces[i+1]);
			triangles.push(faces[i+2]);
			triangles.push(faces[i]);
			triangles.push(faces[i+2]);
			triangles.push(faces[i+3]);
		}
		this._super(context, triangles, type);
	}

}

globalThis.QuadsRenderBuffer = QuadsRenderBuffer;

export default QuadsRenderBuffer;