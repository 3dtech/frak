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
var TrianglesRenderBuffer=RenderBuffer.extend({
	/** Constructor
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...]
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	init: function(context, faces, type) {
		this._super(context, faces, type);
	},

	drawElements: function() {
		var gl=this.context.gl;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		gl.drawElements(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}
});