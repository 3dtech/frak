import RenderingContext from 'rendering/RenderingContext';
import ExplicitAttributeLocations from "../shaders/AttributeLocations";

type IndexType = WebGL2RenderingContext['UNSIGNED_SHORT'] | WebGL2RenderingContext['UNSIGNED_INT'];

/**
 * Render buffer (VBO) base class.
 */
class RenderBuffer {
	type: any;
	context: RenderingContext;
	debug: any;
	buffers: any;
	maxFaceIndex: any;
	facesBuffer: any;

	/** Constructor
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...]
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	constructor(context, faces, type?, public indexType: IndexType = context.gl.UNSIGNED_SHORT) {
		if(!type) type=context.gl.STATIC_DRAW;
		this.type=type;
		this.context=context;
		this.debug=false;														///< Set to true, to enable debugging
		this.buffers={};	// Vertex attribute buffers

		this.maxFaceIndex=0;
		for (var i=0; i<faces.length; i++)
			this.maxFaceIndex = faces[i]>this.maxFaceIndex ? faces[i] : this.maxFaceIndex;
		this.createFacesBuffer(faces);
	}

	/** Returns true if a buffer with the given name exists in this RenderBuffer. */
	has(name): any {
		return (name in this.buffers);
	}

	/** Adds a named vertex attribute buffer that will be
		passed to glsl shader by its name. See usage example at class definition.
		@param name Name of the buffer (passed to vertex shader as attribute)
		@param items Items to be passed to vertex buffer
		@param itemSize Size of an item (number elements from items array, eg 3 to pass vec3 attribute) */
	add(name, items, itemSize): any {
		if (items.length/itemSize <= this.maxFaceIndex)
			throw `RenderBuffer: Buffer '${name}' too small (${items.length/itemSize} vertices, ${this.maxFaceIndex} max index).`;

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
		this.buffers[name].numItems = items.length/this.buffers[name].itemSize;
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	update(name, items): any {
		if (!(name in this.buffers))
			throw `RenderBuffer: Unknown buffer: '${name}'`;

		var buf = this.buffers[name];

		if (items.length/buf.itemSize <= this.maxFaceIndex)
			throw `RenderBuffer: Buffer '${name}' too small.`;

		// Convert items to typed array if needed
		if (!(items instanceof Float32Array))
			items = new Float32Array(items);

		var gl = this.context.gl;

		// Bind buffer and pass data to it
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, items, this.type);
		buf.numItems = items.length/buf.itemSize;
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	updateFaces(faces): any {
		var gl = this.context.gl;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(faces), this.type);
		this.facesBuffer.itemSize = 1;
		this.facesBuffer.numItems = faces.length;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

		this.maxFaceIndex=0;
		for (var i=0; i<faces.length; i++)
			this.maxFaceIndex = faces[i]>this.maxFaceIndex ? faces[i] : this.maxFaceIndex;
	}

	/** Renders all elements using given shader and binds all attributes */
	render(shader?): any {
		var gl = this.context.gl;
		var locations = [];
		var bufferLocation;
		for (var bufferName in this.buffers) {
			bufferLocation = -1;
			if (bufferName in ExplicitAttributeLocations) {
				bufferLocation = ExplicitAttributeLocations[bufferName];
			} else if (shader?.linked) {
				bufferLocation = shader.getAttribLocation(bufferName);
			}

			if (bufferLocation == -1) {
				continue;
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[bufferName]);

			gl.enableVertexAttribArray(bufferLocation);
			locations.push(bufferLocation);
			gl.vertexAttribPointer(bufferLocation, this.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
		}

		this.drawElements();
		for (var i = 0, l = locations.length; i < l; i++){
			gl.disableVertexAttribArray(locations[i]);
		}
	}

	/** Generates barycentric coordinates buffer. These are used
		by the wireframe shader */
	generateBarycentric(): any {
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
	}

	generateTexCoords(): any {
		var texcoords=new Float32Array(this.buffers['position'].numItems*2);
		for(var i=0; i<texcoords.length; i++) {
			texcoords[i]=0.0;
		}
		this.add("texcoord2d0", texcoords, 2);
	}

	// Protected methods
	/** Override to create custom rendering of elements */
	drawElements(): any { }

	// Private methods
	/** Creates faces buffer */
	createFacesBuffer(faces) {
		var gl=this.context.gl;
		this.facesBuffer=gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		const arrayType = this.indexType === gl.UNSIGNED_INT ? Uint32Array : Uint16Array;
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new arrayType(faces), this.type);
		this.facesBuffer.itemSize=1;
		this.facesBuffer.numItems=faces.length;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	}
}

globalThis.RenderBuffer = RenderBuffer;
export default RenderBuffer;
