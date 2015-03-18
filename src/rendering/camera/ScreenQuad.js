
/**
 * Creates a screen-aligned rectangle for rendering. If constructed without
 * parameters a full-screen quad is created.
 * Screen coordinates are in the range of [-1, 1].
 *
 * @param context RenderingContext instance
 * @param x Lower-left corner of the rectangle (defaults to -1.0) [optional]
 * @param y Lower-left corner of the rectangle (defaults to -1.0) [optional]
 * @param width Width of the rectangle (defaults to 2.0) [optional]
 * @param height Height of the rectangle (defaults to 2.0) [optional]
 */
function ScreenQuad(context, x, y, width, height) {
	x = x || -1.0;
	y = y || -1.0;
	width = width || 2.0;
	height = height || 2.0;

	var vertices = [
		x, y, 0,
		x, y+height, 0,
		x+width, y+height, 0,
		x+width, y, 0
	];
	this.quad = new TrianglesRenderBuffer(context, [0, 1, 2, 0, 2, 3]);
	this.quad.add('position', vertices, 3);
	this.quad.add("uv0", [0,0, 0,1, 1,1, 1,0], 2);
}

ScreenQuad.prototype.render = function(context, material, samplerOrList) {
	var gl = context.gl;
	var samplers;
	if (samplerOrList) {
		if (samplerOrList instanceof Sampler)
			samplers = [samplerOrList];
		else
			samplers = samplerOrList;
	}

	material.bind({}, samplers);
	this.renderQuad(context, material.shader, this.quad);
	material.unbind(samplers);
};

ScreenQuad.prototype.renderQuad = function(context, shader, quad) {
	if (!shader.linked)
		return;
	var gl = context.gl;
	var locations = [];
	for (var bufferName in quad.buffers) {
		gl.bindBuffer(gl.ARRAY_BUFFER, quad.buffers[bufferName]);
		var bufferLocation = shader.getAttribLocation(bufferName);
		if (bufferLocation==-1)
			continue;
		gl.enableVertexAttribArray(bufferLocation);
		locations.push(bufferLocation);
		gl.vertexAttribPointer(bufferLocation, quad.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
	}
	quad.drawElements();
	for (var i=0; i<locations.length; i++) {
		gl.disableVertexAttribArray(locations[i]);
	}
};
