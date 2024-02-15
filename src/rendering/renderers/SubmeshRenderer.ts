import Renderer from 'rendering/renderers/Renderer';
import TrianglesRenderBufferVAO from 'rendering/buffers/TrianglesRenderBufferVAO';
import UniformColor from 'rendering/shaders/UniformColor';
import UniformFloat from 'rendering/shaders/UniformFloat';
import UniformInt from 'rendering/shaders/UniformInt';
import Color from 'rendering/Color';

/** Renders submeshes dynamically. The transform value may change between calls to onRender.
	Its technically a render-buffer with attached material reference.
 */

class SubmeshRenderer extends Renderer {
	submesh: any;
	material: any;
	buffer: any;
	failed: any;
	transparent: any;
	localBoundingBox: any;
	localBoundingSphere: any;
	_cache: any;

	constructor(context, matrix, submesh, material) {
		super(matrix);
		this.submesh = submesh;
		this.material = material;
		this.buffer = [];
		this.failed = false;
		this.transparent = false;
		this.localBoundingBox = this.submesh.boundingBox;
		this.localBoundingSphere = this.submesh.boundingSphere;
		this.updateGlobalBoundingVolumes();

		this.build(context);

		this._cache = null;
	}

	allocBuffer(context): any {
		if (!this.submesh)
			throw Error("SubmeshRenderer.allocBuffer: No submesh set");

		this.buffer = new TrianglesRenderBufferVAO(context, this.submesh.faces, undefined, this.submesh.indexType);
	}

	build(context): any {
		if (this.buffer)
			delete this.buffer;

		this.allocBuffer(context);

		var submesh = this.submesh;

		this.buffer.add("position", submesh.positions, 3);
		var pointCount = submesh.positions.length / 3;

		// 1D texture coordinates
		if (submesh.texCoords1D) {
			for (var i = 0; i < submesh.texCoords1D.length; ++i) {
				if (submesh.texCoords1D[i].length != pointCount) {
					console.warn(`Wrong number of 1D texture coordinates (${submesh.texCoords1D[i].length}). Must be the same as positions (${pointCount}).`);
					continue;
				}
				this.buffer.add("texcoord1d" + i, submesh.texCoords1D[i], 1);
			}
		}

		// 2D texture coordinates
		if (submesh.texCoords2D) {
			for (var i = 0; i < submesh.texCoords2D.length; ++i) {
				if (submesh.texCoords2D[i].length / 2 != pointCount) {
					console.warn(`Wrong number of 2D texture coordinates (${submesh.texCoords2D[i].length / 2}). Must be the same as positions (${pointCount}).`);
					continue;
				}
				this.buffer.add("texcoord2d" + i, submesh.texCoords2D[i], 2);
			}
		}

		// 3D texture coordinates
		if (submesh.texCoords3D) {
			for (var i = 0; i < submesh.texCoords3D.length; ++i) {
				if (submesh.texCoords3D[i].length / 3 != pointCount) {
					console.warn(`Wrong number of 3D texture coordinates (${submesh.texCoords3D[i].length / 3}). Must be the same as positions (${pointCount}).`);
					continue;
				}
				this.buffer.add("texcoord3d" + i, submesh.texCoords3D[i], 3);
			}
		}

		// 4D texture coordinates
		if (submesh.texCoords4D) {
			for (var i = 0; i < submesh.texCoords4D.length; ++i) {
				if (submesh.texCoords4D[i].length / 4 != pointCount) {
					console.warn(`Wrong number of 4D texture coordinates (${submesh.texCoords4D[i].length / 4}). Must be the same as positions (${pointCount}).`);
					continue;
				}
				this.buffer.add("texcoord4d" + i, submesh.texCoords4D[i], 4);
			}
		}

		if (submesh.normals) {
			if(submesh.positions.length != submesh.normals.length) {
				console.warn("Wrong number of normals. Must be the same as positions.");
			}
			else {
				this.buffer.add("normal", submesh.normals, 3);
			}
		}
		if (submesh.tangents) {
			if (submesh.positions.length != submesh.tangents.length) {
				console.warn("Wrong number of tangents. Must be the same as positions.");
			}
			else {
				this.buffer.add("tangent", submesh.tangents, 3);
			}
		}
		if (submesh.tangents4D) {
			if (submesh.tangents4D.length / 4 != pointCount) {
				console.warn(`Wrong number of tangents (${submesh.tangents4D.length / 4}). Must be the same as positions (${pointCount}).`);
			}
			else {
				this.buffer.add("tangent4d", submesh.tangents4D, 4);
			}
		}
		if (submesh.bitangents) {
			if (submesh.positions.length != submesh.bitangents.length) {
				console.warn("Wrong number of bitangents. Must be the same as positions.");
			}
			else {
				this.buffer.add("bitangent", submesh.bitangents, 3);
			}
		}

		if (submesh.barycentric) {
			if(submesh.positions.length != submesh.barycentric.length) {
				console.warn("Wrong number of barycentric coordinates. Must be the same as positions.");
			}
			else {
				this.buffer.add("barycentric", submesh.barycentric, 3);
			}
		}

		if (submesh.colors) {
			if (submesh.colors.length / 4 != pointCount) {
				console.warn(`Wrong number of vertex colors (${submesh.colors.length / 4}). Must be the same as positions (${pointCount}).`);
			}
			else {
				this.buffer.add("color", submesh.colors, 4);
			}
		}

		var material = this.material;

		// In case some key shader parameters are missing assign some defaults
		// to prevent nonintuitive rendering problems
		if (!material.uniforms.diffuse)
			material.uniforms.diffuse = new UniformColor(new Color(1.0, 1.0, 1.0, 1.0));
		if (!material.uniforms.specularStrength)
			material.uniforms.specularStrength = new UniformFloat(0.0);
		if (!material.uniforms.specularPower)
			material.uniforms.specularPower = new UniformInt(8);
		if (!material.uniforms.metallic)
			material.uniforms.metallic = new UniformFloat(1.0);
		if (!material.uniforms.perceptualRoughness)
			material.uniforms.perceptualRoughness = new UniformFloat(1.0);

		// Set this renderer to transparent, if its material is transparent or if diffuse color or ambient color has alpha less than 1
		this.transparent = material.transparent ||
			(material.shader && material.shader.requirements.transparent) ||
			(material.uniforms['diffuse'] && material.uniforms['diffuse'].value[3] < 1.0) ||
			(material.uniforms['ambient'] && material.uniforms['ambient'].value[3] < 1.0);

		this.unlit = material.unlit;
		this.customShader = material.customShader;
		this.stencilLayer = material.stencilLayer;

		this.failed = false;
	}

	/** Renders mesh geometry with material */
	onRender(context): any {
		this.buffer.render(this.material.shader);
	}

	/** Renders only mesh geometry without material switches with given shader */
	onRenderGeometry(context, shader): any {
		this._cache = this.getDefaultUniforms(context, this._cache);
		shader.bindUniforms(this._cache);
		this.buffer.render(shader);
	}

	onContextRestored(context) {
		this.build(context);
	}

}

globalThis.SubmeshRenderer = SubmeshRenderer;

export default SubmeshRenderer;
