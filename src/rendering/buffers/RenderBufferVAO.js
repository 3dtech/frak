/**
 * Render buffer implementation utilizing the vertex array object extension.
 */
var RenderBufferVAO = RenderBuffer.extend({
	/** Constructor
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...]
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	init: function(context, faces, type) {
		if (context.isWebGL2()) {
			this.createVAO = context.gl.createVertexArray.bind(context.gl);
			this.bindVAO = context.gl.bindVertexArray.bind(context.gl);
		} else {
			var extVAO = context.gl.getExtension('OES_vertex_array_object');
			if (!extVAO)
				throw 'RenderBufferVAO: Vertex array objects not supported on this device.';
			this.createVAO = extVAO.createVertexArrayOES.bind(extVAO);
			this.bindVAO = extVAO.bindVertexArrayOES.bind(extVAO);
		}

		this.vao = this.createVAO();
		if (!this.vao)
			throw 'RenderBufferVAO: Unable to create vertex array object.';

		this.damaged = true;

		this._super(context, faces, type);
	},

	/** Adds a named vertex attribute buffer that will be
		passed to glsl shader by its name. See usage example at class definition.
		@param name Name of the buffer (passed to vertex shader as attribute)
		@param items Items to be passed to vertex buffer
		@param itemSize Size of an item (number elements from items array, eg 3 to pass vec3 attribute) */
	add: function(name, items, itemSize) {
		if (items.length / itemSize <= this.maxFaceIndex)
			throw "RenderBuffer: Buffer '{0}' too small.".format(name);

		this.bindVAO(this.vao);
		this._super(name, items, itemSize);
		this.bindVAO(null);

		this.damaged = true;
	},

	createFacesBuffer: function(faces) {
		var gl = this.context.gl;
		this.bindVAO(this.vao);
		this._super(faces);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		this.bindVAO(null);

		this.damaged = true;
	},

	/**
	 * Binds attribute locations in the vertex array object.
	 * @param shader {Shader} instance used to query attribute locations for non-standard attribute names [optional]
	 */
	bindLocations: function(shader) {
		var gl = this.context.gl;

		this.bindVAO(this.vao);

		// Attribute buffers
		var bufferLocation;
		for (var name in this.buffers) {
			bufferLocation = -1;
			if (name in ExplicitAttributeLocations)
				bufferLocation = ExplicitAttributeLocations[name];
			else if (shader)
				bufferLocation = shader.getAttribLocation(name);

			if (bufferLocation == -1)
				continue;

			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
			gl.enableVertexAttribArray(bufferLocation);
			gl.vertexAttribPointer(bufferLocation, this.buffers[name].itemSize, gl.FLOAT, false, 0, 0);
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		// Finised setting up VAO
		this.bindVAO(null);

		this.damaged = false;
	},

	/** Renders all elements using given shader and binds all attributes */
	render: function(shader) {
		if (!shader.linked)
			return;

		if (this.damaged) {
			this.bindLocations();
		}

		this.bindVAO(this.vao);
		this.drawElements();
		this.bindVAO(null);
	}
});
