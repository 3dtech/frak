/**
 * RenderBuffer for line primitives.
 */
var LinesRenderBuffer = RenderBuffer.extend({
	/** Constructor
		@param context Rendering context
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	init: function(context) {
		this._super(context, [], context.gl.DYNAMIC_DRAW);
	},

	drawElements: function() {
		var gl = this.context.gl;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		gl.drawElements(gl.LINES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}
});