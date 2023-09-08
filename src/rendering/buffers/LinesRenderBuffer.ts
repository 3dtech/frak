import RenderBuffer from 'rendering/buffers/RenderBuffer';

/**
 * RenderBuffer for line primitives.
 */
class LinesRenderBuffer extends RenderBuffer {
	/** Constructor
		@param context Rendering context
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	constructor(context) {
		super(context, [], context.gl.DYNAMIC_DRAW);
	}

	/** Adds a named vertex attribute buffer that will be
		passed to glsl shader by its name. See usage example at class definition.
		@param name Name of the buffer (passed to vertex shader as attribute)
		@param items Items to be passed to vertex buffer
		@param itemSize Size of an item (number elements from items array, eg 3 to pass vec3 attribute) */
	add(name, items, itemSize, divisor?): any {
		if (items.length / itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0)
			throw "RenderBuffer: Buffer '{0}' too small ({1} vertices, {2} max index).".format(name, items.length / itemSize, this.maxFaceIndex);

		var gl = this.context.gl;

		// Convert items to typed array if needed
		if (!(items instanceof Float32Array))
			items = new Float32Array(items);

		// Create buffer
		this.buffers[name] = gl.createBuffer();

		// Bind buffer and pass data to it
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
		gl.bufferData(gl.ARRAY_BUFFER, items, this.type);

		// Set buffer item size and count of items in it
		this.buffers[name].itemSize = itemSize;
		this.buffers[name].numItems = items.length / this.buffers[name].itemSize;
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	update(name, items): any {
		if (!(name in this.buffers))
			throw "RenderBuffer: Unknown buffer: '{0}'".format(name);

		var buf = this.buffers[name];

		if (items.length / buf.itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0)
			throw "RenderBuffer: Buffer '{0}' too small.".format(name);

		// Convert items to typed array if needed
		if (!(items instanceof Float32Array))
			items = new Float32Array(items);

		var gl = this.context.gl;

		// Bind buffer and pass data to it
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
		buf.numItems = items.length / buf.itemSize;
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	drawElements(count?): any {
		var gl = this.context.gl;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		gl.drawElements(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}
}

globalThis.LinesRenderBuffer = LinesRenderBuffer;
export default LinesRenderBuffer;
