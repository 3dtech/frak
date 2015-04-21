/** Render buffer baseclass is used for to keep WebGL buffers of vertices (any vertex attribute buffers) and faces.

	var renderBuffer=new RenderBuffer(context, [0, 1, 2]);
	renderBuffer.addBuffer("position", [0.5, 0.2, 0.4, 0.1, 0.2, 0.4, 0.6, 0.1, 0.2], 3); // Add vec3 vertex attribute named position

  Vertices with size that divides with 3 [v0x, v0y, v0z, v1x, v1y, v1z, ...].
 */
var RenderBuffer=Class.extend({
	/** Constructor
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...]
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	init: function(context, faces, type) {
		if(!type) type=context.gl.STATIC_DRAW;
		this.type=type;
		this.context=context;
		this.debug=false;														///< Set to true, to enable debugging
		this.buffers={};	// Vertex attribute buffers

		this.maxFaceIndex=0;
		for (var i=0; i<faces.length; i++)
			this.maxFaceIndex = faces[i]>this.maxFaceIndex ? faces[i] : this.maxFaceIndex;
		this.createFacesBuffer(faces);
	},

	/** Adds a named vertex attribute buffer that will be
		passed to glsl shader by its name. See usage example at class definition.
		@param name Name of the buffer (passed to vertex shader as attribute)
		@param items Items to be passed to vertex buffer
		@param itemSize Size of an item (number elements from items array, eg 3 to pass vec3 attribute) */
	add: function(name, items, itemSize) {
		if (items.length/itemSize <= this.maxFaceIndex)
			throw "RenderBuffer: Buffer '{0}' too small.".format(name);

		var gl = this.context.gl;

		// Create buffer
		this.buffers[name] = gl.createBuffer();

		// Bind buffer and pass data to it
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(items), this.type);

		// Set buffer item size and count of items in it
		this.buffers[name].itemSize = itemSize;
		this.buffers[name].numItems = items.length/this.buffers[name].itemSize;
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	},

	update: function(name, items) {
		if (!(name in this.buffers))
			throw "RenderBuffer: Unknown buffer: '{0}'".format(name);

		var buf = this.buffers[name];

		if (items.length/buf.itemSize <= this.maxFaceIndex)
			throw "RenderBuffer: Buffer '{0}' too small.".format(name);

		if (items.length/buf.itemSize !== buf.numItems)
			throw "Passed buffer does not match the size of the existing buffer.";

		var gl = this.context.gl;

		// Bind buffer and pass data to it
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(items), this.type);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	},

	/** Renders all elements using given shader and binds all attributes */
	render: function(shader) {
		if (!shader.linked)
			return;

		var gl = this.context.gl;
		var locations = [];
		shader.requirements.apply(this);
		for (var bufferName in this.buffers) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[bufferName]);

			var bufferLocation = shader.getAttribLocation(bufferName);
			if (bufferLocation == -1)
				continue;

			gl.enableVertexAttribArray(bufferLocation);
			locations.push(bufferLocation);
			gl.vertexAttribPointer(bufferLocation, this.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
		}

		this.drawElements();
		for (var i = 0, l = locations.length; i < l; i++){
			gl.disableVertexAttribArray(locations[i]);
		}

	},

	/** Generates barycentric coordinates buffer. These are used
		by the wireframe shader */
	generateBarycentric: function() {
		var barycentric=new Float32Array(this.buffers['position'].numItems*3);
		for(var i=0; i<barycentric.length; i+=9) {
			barycentric[i+0]=1.0;
			barycentric[i+1]=0.0;
			barycentric[i+2]=0.0;

			barycentric[i+3]=0.0;
			barycentric[i+4]=1.0;
			barycentric[i+5]=0.0;

			barycentric[i+6]=0.0;
			barycentric[i+7]=0.0;
			barycentric[i+8]=1.0;
		}
		this.add("barycentric", barycentric, 3);
	},

	generateTexCoords: function() {
		var texcoords=new Float32Array(this.buffers['position'].numItems*2);
		for(var i=0; i<texcoords.length; i++) {
			texcoords[i]=0.0;
		}
		this.add("texcoord2d0", texcoords, 2);
	},

	// Protected methods
	/** Override to create custom rendering of elements */
	drawElements: function() { },

	// Private methods
	/** Creates faces buffer */
	createFacesBuffer: function(faces) {
		var gl=this.context.gl;
		this.facesBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), this.type);
		this.facesBuffer.itemSize=1;
		this.facesBuffer.numItems=faces.length;
	}
});