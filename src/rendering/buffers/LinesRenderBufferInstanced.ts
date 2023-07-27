import LinesRenderBuffer from "./LinesRenderBuffer";

class LinesRenderBufferInstanced extends LinesRenderBuffer {
	constructor(context) {
		super(context);

		if (context.isWebGL2()) {
			this._drawElementsInstanced = context.gl.drawElementsInstanced.bind(context.gl);
			this._vertexAttribDivisor = context.gl.vertexAttribDivisor.bind(context.gl);
		} else {
			var ext = context.gl.getExtension('ANGLE_instanced_arrays');
			if (!ext) {
				throw 'Instancing unsupported';
			}

			this._drawElementsInstanced = ext.drawElementsInstancedANGLE.bind(ext);
			this._vertexAttribDivisor = ext.vertexAttribDivisorANGLE.bind(ext);
		}

		this.divisors = {};
	}

	/** Adds a named vertex attribute buffer that will be
		passed to glsl shader by its name. See usage example at class definition.
		@param name Name of the buffer (passed to vertex shader as attribute)
		@param items Items to be passed to vertex buffer
		@param itemSize Size of an item (number elements from items array, eg 3 to pass vec3 attribute) */
	add(name, items, itemSize, divisor): any {
		if (items.length / itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0 && divisor === 0)
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

		this.divisors[name] = divisor;
	}

	update(name, items): any {
		if (!(name in this.buffers))
			throw "RenderBuffer: Unknown buffer: '{0}'".format(name);

		var buf = this.buffers[name];

		if (items.length / buf.itemSize <= this.maxFaceIndex && this.facesBuffer.numItems > 0 && this.divisors[name] === 0)
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

	render(shader, count?): any {
		if (!shader.linked)
			return;

		var gl = this.context.gl;
		var locations = [];
		for (var bufferName in this.buffers) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[bufferName]);

			var bufferLocation = shader.getAttribLocation(bufferName);
			if (bufferLocation == -1)
				continue;

			gl.enableVertexAttribArray(bufferLocation);
			locations.push(bufferLocation);
			gl.vertexAttribPointer(bufferLocation, this.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
			this._vertexAttribDivisor(bufferLocation, this.divisors[bufferName]);
		}

		this.drawElements(count);
		for (var i = 0, l = locations.length; i < l; i++) {
			gl.disableVertexAttribArray(locations[i]);
		}
	}

	drawElements(count) {
		var gl = this.context.gl;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		this._drawElementsInstanced(gl.TRIANGLES, this.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0, count);
	}

}

globalThis.LinesRenderBuffer = LinesRenderBufferInstanced;

export default LinesRenderBufferInstanced;
