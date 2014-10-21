/** Renders submeshes dynamically. The transform value may change between calls to onRender.
	Its technically a render-buffer with attached material reference.
 */
var SubmeshRenderer=Renderer.extend({
	init: function(context, matrix, submesh, material) {
		this._super(matrix);
		this.submesh=submesh;
		this.material=material;
		this.buffer=[];

		this.localBoundingBox = this.submesh.boundingBox;
		this.localBoundingSphere = this.submesh.boundingSphere;
		this.updateGlobalBoundingVolumes();

		this.buffer=new TrianglesRenderBuffer(context, submesh.faces);
		this.buffer.add("position", submesh.positions, 3);
		for(var texCoords1DIndex in submesh.texCoords1D) {
			if(submesh.positions.length/3!=submesh.texCoords1D[texCoords1DIndex].length) {
				console.warn("Wrong number of texture coordinates 1. Must be the same as positions.");
				continue;
			}
			this.buffer.add("texcoord1d"+texCoords1DIndex, submesh.texCoords1D[texCoords1DIndex], 1);
		}
		for(var texCoords2DIndex in submesh.texCoords2D) {
			if(submesh.positions.length/3!=submesh.texCoords2D[texCoords2DIndex].length/2) {
				console.warn("Wrong number of texture coordinates 2 ("+submesh.texCoords2D[texCoords2DIndex].length+"). Must be the same as positions ("+submesh.positions.length+").");
				continue;
			}
			this.buffer.add("texcoord2d"+texCoords2DIndex, submesh.texCoords2D[texCoords2DIndex], 2);
		}
		for(var texCoords3DIndex in submesh.texCoords3D) {
			if(submesh.positions.length!=submesh.texCoords3D[texCoords3DIndex].length) {
				console.warn("Wrong number of texture coordinates 3. Must be the same as positions.");
				continue;
			}
			this.buffer.add("texcoord3d"+texCoords3DIndex, submesh.texCoords3D[texCoords3DIndex], 3);
		}
		if(submesh.normals) {
			if(submesh.positions.length!=submesh.normals.length) {
				console.warn("Wrong number of normals. Must be the same as positions.");
			}
			else {
				this.buffer.add("normal", submesh.normals, 3);
			}
		}
		if(submesh.tangents) {
			if(submesh.positions.length!=submesh.tangents.length) {
				console.warn("Wrong number of tangents. Must be the same as positions.");
			}
			else {
				this.buffer.add("tangent", submesh.tangents, 3);
			}
		}
		if(submesh.bitangents) {
			if(submesh.positions.length!=submesh.bitangents.length) {
				console.warn("Wrong number of bitangents. Must be the same as positions.");
			}
			else {
				this.buffer.add("bitangent", submesh.bitangents, 3);
			}
		}

		// In case some key shader parameters are missing assign some defaults
		// to prevent nonintuitive rendering problems
		if (!material.uniforms.diffuse)
			material.uniforms.diffuse = new UniformColor(new Color(1.0, 1.0, 1.0, 1.0));
		if (!material.uniforms.ambient)
			material.uniforms.ambient = new UniformColor(new Color(0.2, 0.2, 0.2, 1.0));

		// Set this renderer to transparent, if its material is transparent or if diffuse color or ambient color has alpha less than 1
		this.transparent=material.shader.requirements.transparent ||
			(material.uniforms['diffuse'] && material.uniforms['diffuse'].value[3]<1.0) ||
			(material.uniforms['ambient'] && material.uniforms['ambient'].value[3]<1.0);

		this.failed=false;
	},

	/** Renders mesh geometry with material */
	onRender: function(context) {
		try {
			this.buffer.render(this.material.shader);
		}
		catch(e) {
			if(this.failed) return;
			this.failed=true;
			console.warn("Failed to render buffer: ", this.buffer);
			console.warn('material: ', this.material.name, this.material);
			console.warn('positions: ', this.submesh.positions.length);
			console.warn('normals: ', this.submesh.normals.length);
			console.warn('texcoords: ', this.submesh.texCoords2D);
			console.warn('faces: ', this.submesh.faces.length);
			console.warn(e);
		}
	},

	/** Renders only mesh geometry without material switches with given shader */
	onRenderGeometry: function(context, shader) {
		if (!this._cache) {
			this._cache = this.getDefaultUniforms(context);
		}
		else {
			this.getDefaultUniforms(context, this._cache);
		}
		shader.bindUniforms(this._cache);
		this.buffer.render(shader);
	}
});