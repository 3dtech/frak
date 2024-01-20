import RenderBuffer from 'rendering/buffers/RenderBuffer';
import ExplicitAttributeLocations from 'rendering/shaders/AttributeLocations';
import Shader from "../shaders/Shader";

/**
 * Render buffer implementation utilizing the vertex array object extension.
 */
class RenderBufferVAO extends RenderBuffer {
	vao: any;
	damaged: any;

	/** Constructor
		@param context Rendering context
		@param faces Faces buffer with size that divides with 3 [f0i, f0j, f0k, f1i, f1j, f1k, ...]
		@param type Either context.gl.STATIC_DRAW, context.gl.STREAM_DRAW or context.gl.DYNAMIC_DRAW [optional, default: context.gl.STATIC_DRAW] */
	constructor(context, faces, type?) {
		super(context, faces, type);
		this.createFacesBuffer(faces);	// Even though RenderBuffer does this, class initialization order deletes the VAO
		this.damaged = true;
	}

	/** Adds a named vertex attribute buffer that will be
		passed to glsl shader by its name. See usage example at class definition.
		@param name Name of the buffer (passed to vertex shader as attribute)
		@param items Items to be passed to vertex buffer
		@param itemSize Size of an item (number elements from items array, eg 3 to pass vec3 attribute) */
	add(name, items, itemSize): any {
		if (items.length / itemSize <= this.maxFaceIndex)
			throw `RenderBuffer: Buffer '${name}' too small.`;

		var gl = this.context.gl;

		gl.bindVertexArray(this.vao);
		super.add(name, items, itemSize);
		gl.bindVertexArray(null);

		this.damaged = true;
	}

	createFacesBuffer(faces): any {
		var gl = this.context.gl;
		this.vao = gl.createVertexArray();
		if (!this.vao)
			throw 'RenderBufferVAO: Unable to create vertex array object.';

		gl.bindVertexArray(this.vao);
		super.createFacesBuffer(faces);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesBuffer);
		gl.bindVertexArray(null);

		this.damaged = true;
	}

	/**
	 * Binds attribute locations in the vertex array object.
	 * @param shader {Shader} instance used to query attribute locations for non-standard attribute names [optional]
	 */
	bindLocations(shader?: Shader): any {
		var gl = this.context.gl;

		gl.bindVertexArray(this.vao);

		// Attribute buffers
		var bufferLocation;
		for (var name in this.buffers) {
			bufferLocation = -1;
			if (name in ExplicitAttributeLocations) {
				bufferLocation = ExplicitAttributeLocations[name];
			} else if (shader?.linked) {
				bufferLocation = shader.getAttribLocation(name);
			}

			if (bufferLocation == -1) {
				continue;
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[name]);
			gl.enableVertexAttribArray(bufferLocation);
			gl.vertexAttribPointer(bufferLocation, this.buffers[name].itemSize, gl.FLOAT, false, 0, 0);
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		// Finised setting up VAO
		gl.bindVertexArray(null);

		this.damaged = false;
	}

	/** Renders all elements using given shader and binds all attributes */
	render(shader?: Shader) {
		if (this.damaged) {
			this.bindLocations(shader);
		}

		var gl = this.context.gl;

		gl.bindVertexArray(this.vao);
		this.drawElements();
		gl.bindVertexArray(null);
	}
}

globalThis.RenderBufferVAO = RenderBufferVAO;
export default RenderBufferVAO;
