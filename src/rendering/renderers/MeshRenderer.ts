import Renderer from 'rendering/renderers/Renderer.js'
import TrianglesRenderBuffer from 'rendering/buffers/TrianglesRenderBuffer.js'

/** Renders meshes dynamically. The transform value may change between calls to onRender. */

class MeshRenderer extends Renderer {
	mesh: any;
	buffers: any;
	_cache: any;
	
	constructor(context, matrix, mesh) {
		super(matrix);
		this.mesh=mesh;
		this.buffers=[];
		this._cache = null;

		for(var submeshIndex in this.mesh.submeshes) {
			var submesh=this.mesh.submeshes[submeshIndex];
			var renderBuffer=new TrianglesRenderBuffer(context, submesh.faces);
			renderBuffer.add("position", submesh.positions, 3);
			for(var texCoords1DIndex in submesh.texCoords1D) {
				renderBuffer.add("texcoord1d"+texCoords1DIndex, submesh.texCoords1D[texCoords1DIndex], 1);
			}
			for(var texCoords2DIndex in submesh.texCoords2D) {
				renderBuffer.add("texcoord2d"+texCoords2DIndex, submesh.texCoords2D[texCoords2DIndex], 2);
			}
			for(var texCoords3DIndex in submesh.texCoords3D) {
				renderBuffer.add("texcoord3d"+texCoords3DIndex, submesh.texCoords3D[texCoords3DIndex], 3);
			}
			if(submesh.normals) renderBuffer.add("normal", submesh.normals, 3);
			if(submesh.tangents) renderBuffer.add("tangent", submesh.tangents, 3);
			if(submesh.bitangents) renderBuffer.add("bitangent", submesh.bitangents, 3);

			this.buffers.push(renderBuffer);
		}
	}

	/** Renders mesh geometry with materials */

	onRender(context): any {
		this._cache = this.getDefaultUniforms(context, this._cache);
		for(var submeshIndex in this.mesh.submeshes) {
			var submesh=this.mesh.submeshes[submeshIndex];
			var material = this.mesh.getMaterial(submesh.materialIndex);
			if (!material)
				continue;
			material.bind(this._cache);
			this.buffers[submeshIndex].render(material.shader);
			material.unbind();
		}
	}

	/** Renders only mesh geometry without material switches with given shader */
	onRenderGeometry(context, shader) {
		this._cache = this.getDefaultUniforms(context, this._cache);
		shader.bindUniforms(this._cache);
		for(var i in this.buffers) {
			this.buffers[i].render(shader);
		}
	}

}

globalThis.MeshRenderer = MeshRenderer;

export default MeshRenderer;