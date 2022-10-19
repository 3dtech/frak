/** Loads models to scene hierarchy from JSON data */
var ModelLoaderJSON = FrakClass.extend({
	init: function(context, descriptor, shadersManager, texturesManager) {
		this.descriptor = descriptor;
		this.shadersManager = shadersManager;
		this.texturesManager = texturesManager;
		this.defaultTexture = false;
		this.defaultSampler = false;
		this.nodesByID = {};
		this.submeshesByID = {};
		this.submeshes = [];

		this.textureUniformMap = {
			'texturesDiffuse': 'diffuse',
			'texturesNormals': 'normal'
		}
	},

	createDefaultTextureSampler: function(context) {
		if (this.defaultTexture)
			return;

		if (!context.engine)
			return;

		this.defaultTexture = context.engine.WhiteTexture;
		this.defaultSampler = new Sampler("diffuse0", this.defaultTexture);
	},

	/** Loads parsed data to scene hierarchy at given node */
	load: function(node, parsedData) {
		if (FRAK.isEmptyObject(parsedData))
			return;
		node.name = parsedData.scene.name;
		this.linkReferences(parsedData);
		this.loadMaterials(parsedData.materials);
		this.loadSubmeshes(parsedData.meshes);
		this.loadNode(node, parsedData.scene);
		this.loadCollision(node, parsedData);
	},

	linkReferences: function(data) {
		var mesh;
		var matLen = data.materials.length;
		for (var i=0, l = data.meshes.length; i < l; i++) {
			mesh = data.meshes[i];
			if (mesh.materialIndex >= 0 && mesh.materialIndex < matLen)
				mesh.material = data.materials[mesh.materialIndex];
		}
	},

	/** Loads all material instances. */
	loadMaterials: function(parsedMaterials) {
		var material;
		for (var i = 0, l = parsedMaterials.length; i < l; i++) {
			material = parsedMaterials[i];
			material.instance = new Material();
			this.loadMaterial(material.instance, material);
		}
	},

	/** Loads a material */
	loadMaterial: function(material, parsedMaterial) {
		var shaderName = parsedMaterial.shader || 'diffuse';
		material.name = parsedMaterial.name;
		material.shader = this.shadersManager.addSource(shaderName);

		// FIXME: shaders should always download the accompanying requirements json file and apply requirements from there
		if (shaderName.toLowerCase() == 'transparent') {
			material.shader.requirements.transparent = true;
		}

		material.uniforms = {};
		this.loadUniforms(material.uniforms, parsedMaterial);

		// Load textures
		for (var textureType in parsedMaterial.textures) {
			var textures = parsedMaterial.textures[textureType];
			for (var i=0; i<textures.length; i++) {
				var textureDescriptor = new TextureDescriptor(textures[i]);
				textureDescriptor.parentDescriptor = this.descriptor;

				var texture = this.texturesManager.addDescriptor(textureDescriptor);
				var samplerName = 'diffuse';
				if (textureType in this.textureUniformMap)
					samplerName = this.textureUniformMap[textureType];
				if (!material.samplers)
					material.samplers=[];
				material.samplers.push(new Sampler(samplerName + i, texture));

				if (textureType == 'texturesNormals') {
					material.shader = this.shadersManager.addSource('normalmapped');
				}
			}
		}

		if (!material.samplers && shaderName.toLowerCase() == 'diffuse') {
			material.samplers=[];
			this.createDefaultTextureSampler(this.texturesManager.context);
			material.samplers.push(this.defaultSampler);
		}
	},

	loadUniforms: function(uniforms, parsedMaterial) {
		// Color uniforms
		if (parsedMaterial.color.ambient)
			uniforms["ambient"] = new UniformColor(parsedMaterial.color.ambient);

		if (parsedMaterial.color.diffuse)
			uniforms["diffuse"] = new UniformColor(parsedMaterial.color.diffuse);
		else
			uniforms["diffuse"] = new UniformColor(new Color(1.0, 1.0, 1.0, 1.0));

		if (parsedMaterial.color.emissive)
			uniforms["emissive"] = new UniformColor(parsedMaterial.color.emissive);

		if (parsedMaterial.color.specular)
			uniforms["specular"] = new UniformColor(parsedMaterial.color.specular);

		// TODO: these need to be mapped to specularStrength(float) and specularPower(int)
		// if (parsedMaterial.shininess) uniforms["specularPower"]=new UniformFloat(parsedMaterial.shininess);
		// if(parsedMaterial.shininessStrength) uniforms["specularStrength"]=new UniformFloat(parsedMaterial.shininessStrength);

		// Other uniforms
		uniforms["twosided"] = new UniformInt(parsedMaterial.twosided+0);
	},

	/** Loads submeshes */
	loadSubmeshes: function(meshes) {
		var mesh;
		for (var i = 0, l = meshes.length; i < l; i++) {
			var mesh = meshes[i];
			var submesh = new Submesh();
			this.loadSubmesh(submesh, mesh);
			this.submeshesByID[i] = {'submesh': submesh, 'material': mesh.material.instance};
		}
	},

	loadSubmesh: function(submesh, parsedSubmesh) {
		if (!parsedSubmesh.faces || parsedSubmesh.faces.length == 0)
			return;
		if (!parsedSubmesh.vertices || parsedSubmesh.vertices.length == 0)
			return;
		submesh.faces = parsedSubmesh.faces;
		submesh.positions = parsedSubmesh.vertices;

		var _parsedSubMesh;

		var pointCount = parsedSubmesh.vertices.length / 3;

		if (parsedSubmesh.normals && parsedSubmesh.normals.length/3 == pointCount)
			submesh.normals = parsedSubmesh.normals;

		if (parsedSubmesh.tangents && parsedSubmesh.tangents.length/3 == pointCount)
			submesh.tangents = parsedSubmesh.tangents;

		if (parsedSubmesh.bitangents && parsedSubmesh.bitangents.length/3 == pointCount)
			submesh.bitangents = parsedSubmesh.bitangents;

		if (parsedSubmesh.texCoords1D) {
			for (var i=0, l = parsedSubmesh.texCoords1D.length; i < l; i++) {
				_parsedSubMesh = parsedSubmesh.texCoords1D[i];
				if (_parsedSubMesh.length == pointCount)
					submesh.texCoords1D.push(_parsedSubMesh);
			}
		}

		if (parsedSubmesh.texCoords2D) {
			for (var i=0, l1 = parsedSubmesh.texCoords2D.length; i < l1; i++) {
				_parsedSubMesh = parsedSubmesh.texCoords2D[i];
				if (_parsedSubMesh.length/2 == pointCount) {
					submesh.texCoords2D.push(_parsedSubMesh);
				}
			}
		}
		// Generates 2D texture coordiantes for models that do not specify any 2D coordinates, but do specify 3D ones.
		else {
			if (parsedSubmesh.texCoords3D) {
				var texCoords;
				for (var i=0, l2 = parsedSubmesh.texCoords3D.length; i < l2; i++) {
					_parsedSubMesh = parsedSubmesh.texCoords3D[i];
					if (_parsedSubMesh.length/3 !== pointCount)
						continue;
					var texCoords2D = [];
					for (var j=0; j < _parsedSubMesh.length; j+=3) {
						texCoords2D.push(_parsedSubMesh[j]);
						texCoords2D.push(_parsedSubMesh[j+1]);
					}
					submesh.texCoords2D.push(_parsedSubMesh);
					submesh.yesIGeneratedThese = true;
				}
			}
		}

		if (parsedSubmesh.texCoords3D) {
			for (var i=0, l3 = parsedSubmesh.texCoords3D.length; i < l3; i++) {
				_parsedSubMesh = parsedSubmesh.texCoords3D[i];
				if (_parsedSubMesh.length/3 == pointCount) {
					submesh.texCoords3D.push(_parsedSubMesh);
				}
			}
		}

		if (parsedSubmesh.texCoords4D) {
			for (var i = 0, l4 = parsedSubmesh.texCoords4D.length; i < l4; i++) {
				_parsedSubMesh = parsedSubmesh.texCoords4D[i];
				if (_parsedSubMesh.length/4 == pointCount) {
					submesh.texCoords4D.push(_parsedSubMesh);
				}
			}
		}
		submesh.recalculateBounds();
	},

	/** Loads a node from hierarchy
		@param node */
	loadNode: function(node, parsedNode) {
		node.localCollisionID = parsedNode.id;
		this.nodesByID[node.localCollisionID] = node;

		node.transform.relative = parsedNode.relative;
		this.loadMesh(node, parsedNode.meshes);

		var _subnode;
		for (var i = 0, l = parsedNode.subnodes.length; i < l; i++) {
			_subnode = parsedNode.subnodes[i];
			var subnode = new Node(_subnode.name);
			this.loadNode(subnode, _subnode);
			node.addNode(subnode);
		}
	},

	/** Loads all meshes as submeshes of mesh component of this node */
	loadMesh: function(node, meshes) {
		if (!meshes || meshes.length==0)
			return;

		var mesh = new Mesh();
		for (var i=0; i<meshes.length; i++) {
			var meshIndex = meshes[i];
			if (!(meshIndex in this.submeshesByID)) {
				continue;
			}
			var o = this.submeshesByID[meshIndex];
			mesh.addSubmesh(o.submesh, o.material);
		}

		node.addComponent(new MeshComponent(mesh));
		node.addComponent(new MeshRendererComponent());
	},

	loadCollisionNodeParameters: function(parsedNode, parentCollisionNode) {
		var n = new CollisionOctreeNode(
			new Float32Array(parsedNode.center),
			parsedNode.extents[0] * 2.0,
			parentCollisionNode);
		if (parsedNode.faces)
			n.faces = parsedNode.faces;
		return n;
	},

	loadCollisionNodeSubnodes: function(collisionNode, parsedNode, parsedData) {
		if (!parsedNode.subnodes || parsedNode.subnodes.length != 8)
			return;

		collisionNode.subnodes = [];
		for (var i=0; i<8; i++) {
			var subnode = this.loadCollisionNodeParameters(parsedNode.subnodes[i], collisionNode);
			collisionNode.subnodes.push(subnode);
			this.loadCollisionNodeSubnodes(subnode, parsedNode.subnodes[i], parsedData);
		}
	},

	loadCollision: function(rootNode, parsedData) {
		if (!parsedData.collision)
			return;

		var lmc = rootNode.addComponent(new LargeMeshCollider());
		lmc.tree = this.loadCollisionNodeParameters(parsedData.collision, false);
		lmc.tree.nodes = this.nodesByID;
		lmc.tree.submeshes = {};
		for (var mesh_id in this.submeshesByID)
			lmc.tree.submeshes[mesh_id]=this.submeshesByID[mesh_id].submesh;
		this.loadCollisionNodeSubnodes(lmc.tree, parsedData.collision, parsedData);
	}
});
