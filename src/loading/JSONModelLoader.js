/** Loads models to scene hierarchy from JSON data */
var JSONModelLoader = Class.extend({
	init: function(context, descriptor, shadersManager, texturesManager) {
		this.descriptor = descriptor;
		this.shadersManager = shadersManager;
		this.texturesManager = texturesManager;
		this.defaultTexture = false;
		this.defaultSampler = false;
		this.nodesByID = {};
		this.submeshesByID = {};
		this.submeshes = [];
	},

	createDefaultTextureSampler: function(context) {
		if (this.defaultTexture)
			return;

		this.defaultTexture=new Texture(context);
		this.defaultTexture.clearImage(context, [0xFF, 0xFF, 0xFF, 0xFF]);
		this.defaultSampler=new Sampler("diffuse0", this.defaultTexture);
	},

	/** Loads parsed data to scene hierarchy at given node */
	load: function(node, parsedData) {
		node.name = parsedData.scene.name;

		this.linkReferences(parsedData);

		this.loadMaterials(parsedData.materials);
		this.loadSubmeshes(parsedData.meshes);
		this.loadNode(node, parsedData.scene);
		this.loadCollision(node, parsedData);
	},

	linkReferences: function(data) {
		for (var i=0; i<data.meshes.length; i++) {
			if (data.meshes[i].materialIndex>=0 && data.meshes[i].materialIndex<data.materials.length)
				data.meshes[i].material = data.materials[data.meshes[i].materialIndex];
		}
	},

	/** Loads all material instances. */
	loadMaterials: function(parsedMaterials) {
		for (var i=0; i<parsedMaterials.length; i++) {
			var material = parsedMaterials[i];
			material.instance = new Material();
			this.loadMaterial(material.instance, material);
		}
	},

	/** Loads a material */
	loadMaterial: function(material, parsedMaterial) {
		var shaderName = parsedMaterial.shader || 'diffuse';
		material.name = parsedMaterial.name;
		material.shader = this.shadersManager.addSource(shaderName);
		material.uniforms = {};
		this.loadUniforms(material.uniforms, parsedMaterial);

		// Load textures
		for (var textureType in parsedMaterial.textures) {
			var textures = parsedMaterial.textures[textureType];
			for (var i=0; i<textures.length; i++) {
				var textureDescriptor = new TextureDescriptor(textures[i].path);
				textureDescriptor.parentDescriptor = this.descriptor;

				var texture = this.texturesManager.addDescriptor(textureDescriptor);
				if (!material.samplers)
					material.samplers=[];
				material.samplers.push(new Sampler(textureType+i, texture));

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
		else
			uniforms["ambient"] = new UniformColor(new Color(0.2, 0.2, 0.2, 1.0));

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
		for (var i=0; i<meshes.length; i++) {
			var submesh = new Submesh();
			this.loadSubmesh(submesh, meshes[i]);
			this.submeshesByID[i]={'submesh': submesh, 'material': meshes[i].material.instance};
		}
	},

	loadSubmesh: function(submesh, parsedSubmesh) {
		if (!parsedSubmesh.faces || parsedSubmesh.faces.length == 0)
			return;
		if (!parsedSubmesh.vertices || parsedSubmesh.vertices.length == 0)
			return;

		submesh.faces = parsedSubmesh.faces;
		submesh.positions = parsedSubmesh.vertices;

		var pointCount = parsedSubmesh.vertices.length / 3;

		if (parsedSubmesh.normals && parsedSubmesh.normals.length/3 == pointCount)
			submesh.normals = parsedSubmesh.normals;

		if (parsedSubmesh.tangents && parsedSubmesh.tangents.length/3 == pointCount)
			submesh.tangents = parsedSubmesh.tangents;

		if (parsedSubmesh.bitangents && parsedSubmesh.bitangents.length/3 == pointCount)
			submesh.bitangents = parsedSubmesh.bitangents;

		if (parsedSubmesh.texCoords2D) {
			for (var i=0; i<parsedSubmesh.texCoords2D.length; i++) {
				if (parsedSubmesh.texCoords2D[i].length/2 == pointCount)
					submesh.texCoords2D.push(parsedSubmesh.texCoords2D[i]);
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

		for (var i=0; i<parsedNode.subnodes.length; i++) {
			var subnode = new Node(parsedNode.subnodes[i].name);
			this.loadNode(subnode, parsedNode.subnodes[i]);
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