/** Renders submeshes dynamically. The transform value may change between calls to onRender.
	Its technically a render-buffer with attached material reference.
 */
var SubmeshRenderer = Renderer.extend({
	init: function(context, matrix, submesh, material) {
		this._super(matrix);
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
	},

	allocBuffer: function(context) {
		if (!this.submesh)
			throw Error("SubmeshRenderer.allocBuffer: No submesh set");

		if (context.engine && (context.engine.options.useVAO === true || context.isWebGL2())) {
			try {
				this.buffer = new TrianglesRenderBufferVAO(context, this.submesh.faces);
			}
			catch(e) {
				this.buffer = new TrianglesRenderBuffer(context, this.submesh.faces);
			}
		}
		else {
			this.buffer = new TrianglesRenderBuffer(context, this.submesh.faces);
		}
	},

	build: function(context) {
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
					console.warn("Wrong number of 1D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords1D[i].length, pointCount));
					continue;
				}
				this.buffer.add("texcoord1d" + i, submesh.texCoords1D[i], 1);
			}
		}

		// 2D texture coordinates
		if (submesh.texCoords2D) {
			for (var i = 0; i < submesh.texCoords2D.length; ++i) {
				if (submesh.texCoords2D[i].length / 2 != pointCount) {
					console.warn("Wrong number of 2D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords2D[i].length / 2, pointCount));
					continue;
				}
				this.buffer.add("texcoord2d" + i, submesh.texCoords2D[i], 2);
			}
		}

		// 3D texture coordinates
		if (submesh.texCoords3D) {
			for (var i = 0; i < submesh.texCoords3D.length; ++i) {
				if (submesh.texCoords3D[i].length / 3 != pointCount) {
					console.warn("Wrong number of 3D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords3D[i].length / 3, pointCount));
					continue;
				}
				this.buffer.add("texcoord3d" + i, submesh.texCoords3D[i], 3);
			}
		}

		// 4D texture coordinates
		if (submesh.texCoords4D) {
			for (var i = 0; i < submesh.texCoords4D.length; ++i) {
				if (submesh.texCoords4D[i].length / 4 != pointCount) {
					console.warn("Wrong number of 4D texture coordinates ({0}). Must be the same as positions ({1}).".format(submesh.texCoords4D[i].length / 4, pointCount));
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
				console.warn("Wrong number of tangents ({0}). Must be the same as positions ({1}).".format(submesh.tangents4D.length / 4, pointCount));
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

		var material = this.material;

		// In case some key shader parameters are missing assign some defaults
		// to prevent nonintuitive rendering problems
		if (!material.uniforms.diffuse)
			material.uniforms.diffuse = new UniformColor(new Color(1.0, 1.0, 1.0, 1.0));
		if (!material.uniforms.ambient)
			material.uniforms.ambient = new UniformColor(new Color(0.2, 0.2, 0.2, 1.0));
		if (!material.uniforms.specularStrength)
			material.uniforms.specularStrength = new UniformFloat(0.0);
		if (!material.uniforms.specularPower)
			material.uniforms.specularPower = new UniformInt(8);

		// Set this renderer to transparent, if its material is transparent or if diffuse color or ambient color has alpha less than 1
		this.transparent = material.shader.requirements.transparent ||
			(material.uniforms['diffuse'] && material.uniforms['diffuse'].value[3] < 1.0) ||
			(material.uniforms['ambient'] && material.uniforms['ambient'].value[3] < 1.0);

		this.failed = false;
	},

	/** Renders mesh geometry with material */
	onRender: function(context) {
		this.buffer.render(this.material.shader);
	},

	/** Renders only mesh geometry without material switches with given shader */
	onRenderGeometry: function(context, shader) {
		this._cache = this.getDefaultUniforms(context, this._cache);
		shader.bindUniforms(this._cache);
		this.buffer.render(shader);
	},

	onContextRestored: function(context) {
		this.build(context);
	}
});
