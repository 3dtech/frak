/** Loads models to scene hierarchy from given parsed data */
var ModelLoader=FrakClass.extend({
	init: function(context, descriptor, shadersManager, texturesManager) {
		this.descriptor=descriptor;
		this.shadersManager=shadersManager;
		this.texturesManager=texturesManager;
		this.defaultTexture=false;
		this.defaultSampler=false;
		this.nodesByID={};
		this.submeshesByID={};
		this.submeshes=[];
	},

	createDefaultTextureSampler: function(context) {
		if(this.defaultTexture) return;

		// Default texture and sampler
		this.defaultTexture=new Texture(context);
		this.defaultTexture.clearImage(context, [0xFF, 0xFF, 0xFF, 0xFF]);
		this.defaultSampler=new Sampler("diffuse0", this.defaultTexture);
	},

	/** Loads parsed data to scene hierarchy at given node */
	load: function(node, parsedData) {
		node.name=parsedData.hierarchy.name;
		this.loadMaterials(parsedData.materials);
		this.loadSubmeshes(parsedData.meshes);
		this.loadNode(node, parsedData.hierarchy);
		this.loadCollision(node, parsedData);
	},

	/** Loads all material instances. */
	loadMaterials: function(parsedMaterials) {
		for (var i=0; i<parsedMaterials.length; i++) {
			var material = parsedMaterials[i];
			material.instance = new Material();
			this.loadMaterial(material.instance, material);
		}
	},

	/** Loads submeshes */
	loadSubmeshes: function(parsedMeshes) {
		for (var i=0; i<parsedMeshes.length; i++) {
			var submesh = new Submesh();
			this.loadSubmesh(submesh, parsedMeshes[i]);
			this.submeshesByID[parsedMeshes[i].index]={'submesh': submesh, 'material': parsedMeshes[i].material.instance};
		}
	},

	/** Loads a node from hierarchy
		@param node */
	loadNode: function(node, parsedNode) {
		node.localCollisionID = parsedNode.id;
		this.nodesByID[node.localCollisionID] = node;

		this.loadTransform(node.transform, parsedNode.transform);
		this.loadMesh(node, parsedNode.meshes);

		for(var child in parsedNode.children) {
			var childNode=new Node(parsedNode.children[child].name);
			this.loadNode(childNode, parsedNode.children[child]);
			node.addNode(childNode);
		}
	},

	/** Loads all meshes as submeshes of mesh component of this node */
	loadMesh: function(node, parsedMeshes) {
		if(!parsedMeshes || parsedMeshes.length==0) return;
		var mesh=new Mesh();
		for(var i in parsedMeshes) {
			if (parsedMeshes[i].index in this.submeshesByID) {
				var o=this.submeshesByID[parsedMeshes[i].index];
				mesh.addSubmesh(o.submesh, o.material);
			}
		}
		node.addComponent(new MeshComponent(mesh));
		node.addComponent(new MeshRendererComponent());
	},

	loadSubmesh: function(submesh, parsedSubmesh) {
		submesh.faces=parsedSubmesh.indices;
		if(parsedSubmesh.vertices.length==0) return;

		var vertex=parsedSubmesh.vertices[0];
		submesh.positions=this.loadSubmeshBuffer("position", parsedSubmesh.vertices, ["x", "y", "z"]);

		if(vertex.normal) submesh.normals=this.loadSubmeshBuffer("normal", parsedSubmesh.vertices, ["x", "y", "z"]);
		if(vertex.tangent) submesh.tangents=this.loadSubmeshBuffer("tangent", parsedSubmesh.vertices, ["x", "y", "z"]);
		if(vertex.bitangent) submesh.bitangents=this.loadSubmeshBuffer("bitangent", parsedSubmesh.vertices, ["x", "y", "z"]);
		if(vertex.texCoord) {
			for(var texCoordIndex in vertex.texCoord) {
				submesh.texCoords2D.push(this.loadSubmeshIndexedBuffer("texCoord", parsedSubmesh.vertices, ["x", "y"], texCoordIndex));
			}
		}
		submesh.recalculateBounds();
	},

	loadSubmeshBuffer: function(vertexAttribute, vertices, attributeParameters) {
		buffer=[];
		for(var i in vertices) {
			vertex=vertices[i];
			for(var i in attributeParameters) {
				var attributeParameter=attributeParameters[i];
				buffer.push(vertex[vertexAttribute][attributeParameter]);
			}
		}
		return buffer;
	},

	loadSubmeshIndexedBuffer: function(vertexAttribute, vertices, attributeParameters, attributeIndex) {
		buffer=[];
		for(var i in vertices) {
			vertex=vertices[i];
			for(var i in attributeParameters) {
				var attributeParameter=attributeParameters[i];
				buffer.push(vertex[vertexAttribute][attributeIndex][attributeParameter]);
			}
		}
		return buffer;
	},

	/** Loads a material */
	loadMaterial: function(material, parsedMaterial) {
		material.name = parsedMaterial.name;
		material.shader = this.shadersManager.addSource(parsedMaterial.shader);
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

				if (textureType == 'normal') {
					material.shader = this.shadersManager.addSource('normalmapped');
				}
			}
		}

		if (!material.samplers && parsedMaterial.shader.toLowerCase() == 'diffuse') {
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
			uniforms["ambient"] = new UniformColor(new Color(0.8, 0.8, 0.8, 1.0));

		if (parsedMaterial.color.diffuse)
			uniforms["diffuse"] = new UniformColor(parsedMaterial.color.diffuse);
		else
			uniforms["diffuse"] = new UniformColor(new Color(1.0, 1.0, 1.0, 1.0));

		if (parsedMaterial.color.emissive) uniforms["emissive"] = new UniformColor(parsedMaterial.color.emissive);
		if (parsedMaterial.color.specular) uniforms["specular"] = new UniformColor(parsedMaterial.color.specular);

		// TODO: these need to be mapped to specularStrength(float) and specularPower(int)
		// if(parsedMaterial.shininess) uniforms["shininess"]=new UniformFloat(parsedMaterial.shininess);
		// if(parsedMaterial.shininess_strength) uniforms["shininess_strength"]=new UniformFloat(parsedMaterial.shininess_strength);

		// Other uniforms
		uniforms["twosided"] = new UniformInt(parsedMaterial.twosided+0);
	},

	loadTransform: function(transform, parsedTransform) {
		transform.relative[0] = parsedTransform[0][0];
		transform.relative[4] = parsedTransform[0][1];
		transform.relative[8] = parsedTransform[0][2];
		transform.relative[12]= parsedTransform[0][3];
		transform.relative[1] = parsedTransform[1][0];
		transform.relative[5] = parsedTransform[1][1];
		transform.relative[9] = parsedTransform[1][2];
		transform.relative[13]= parsedTransform[1][3];
		transform.relative[2] = parsedTransform[2][0];
		transform.relative[6] = parsedTransform[2][1];
		transform.relative[10]= parsedTransform[2][2];
		transform.relative[14]= parsedTransform[2][3];
		transform.relative[3] = parsedTransform[3][0];
		transform.relative[7] = parsedTransform[3][1];
		transform.relative[11]= parsedTransform[3][2];
		transform.relative[15]= parsedTransform[3][3];
	},

	loadCollisionNodeParameters: function(parsedNode, parentCollisionNode) {
		var n = new CollisionOctreeNode(
			[parsedNode.center.x, parsedNode.center.y, parsedNode.center.z],
			parsedNode.extents.x*2.0, // XXX: in retrospect this could totally just be 1 float - size
			parentCollisionNode);
		if (parsedNode.faces)
			n.faces=parsedNode.faces;
		return n;
	},

	loadCollisionNodeSubnodes: function(collisionNode, parsedNode, parsedData) {
		if (parsedNode.children.length==0)
			return;
		collisionNode.subnodes=[];
		for (var i=0; i<8; i++) {
			var subnode = this.loadCollisionNodeParameters(parsedNode.children[i], collisionNode);
			collisionNode.subnodes.push(subnode);
			this.loadCollisionNodeSubnodes(subnode, parsedNode.children[i], parsedData);
		}
	},

	loadCollision: function(rootNode, parsedData) {
		if (parsedData.collision===false)
			return;
		var lmc = rootNode.addComponent(new LargeMeshCollider());
		lmc.tree = this.loadCollisionNodeParameters(parsedData.collision, false);
		lmc.tree.nodes=this.nodesByID;
		lmc.tree.submeshes={};
		for (var mesh_id in this.submeshesByID)
			lmc.tree.submeshes[mesh_id]=this.submeshesByID[mesh_id].submesh;
		this.loadCollisionNodeSubnodes(lmc.tree, parsedData.collision, parsedData);
	}
});
