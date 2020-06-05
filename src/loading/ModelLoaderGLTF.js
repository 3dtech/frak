/** Loads models to scene hierarchy from JSON data */
var ModelLoaderGLTF = FrakClass.extend({
	init: function(context, descriptor, shadersManager) {
		this.descriptor = descriptor;
		this.shadersManager = shadersManager;
		this.nodesByID = {};
		this.submeshesByID = {};
		this.submeshes = [];

		this.textureUniformMap = {
			'texturesDiffuse': 'diffuse',
			'texturesNormals': 'normal'
		}

		this.buffers = [];
		this.bufferViews = [];
		this.accessors = [];
		this.meshes = [];
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
		if (
			FRAK.isEmptyObject(parsedData) ||
			FRAK.isEmptyObject(parsedData.asset) ||
			parsedData.asset.version[0] !== '2'
		)
			return;

		var scope = this;
		this.loadBuffers(parsedData.buffers, function() {
			scope.loadBufferViews(parsedData.bufferViews);
			scope.loadAccessors(parsedData.accessors);
			scope.loadMeshes(parsedData.meshes);
			scope.loadScene(node, parsedData);
		});
	},

	loadBuffers: function(buffers, cb) {
		var count = 0;
		for (var i = 0, l = buffers.length; i < l; i++) {
			count++;

			var byteLength = buffers[i].byteLength;
			var buffer = {
				length: byteLength,
			};

			this.buffers.push(buffer);

			Logistics.getBinary(buffers[i].uri, function(binaryData) {
				count--;

				if (!binaryData || binaryData.byteLength !== byteLength) {
					return;
				}

				buffer.data = binaryData;

				if (count === 0) {
					cb();
				}
			});
		}
	},

	loadBufferViews: function(bufferViews) {
		for (var i = 0, l = bufferViews.length; i < l; i++) {
			var view = bufferViews[i];
			var buffer = this.buffers[view.buffer];
			this.bufferViews.push(new DataView(buffer.data, view.byteOffset || 0, view.byteLength || buffer.length));
		}
	},

	loadAccessors: function(accessors) {
		for (var i = 0, l = accessors.length; i < l; i++) {
			var accessor;
			var view = this.bufferViews[accessors[i].bufferView];
			var itemCount;
			
			switch (accessors[i].type) {
				case 'VEC2':
					itemCount = 2;
					break;
				
				case 'VEC3':
					itemCount = 3;
					break;
				
				case 'VEC4':
					itemCount = 4;
					break;
				
				case 'MAT2':
					itemCount = 4;
					break;
				
				case 'MAT3':
					itemCount = 9;
					break;
				
				case 'MAT4':
					itemCount = 16;
					break;
				
				default:
					itemCount = 1;
			}

			var arrays = [Int8Array, Uint8Array, Int16Array, Uint16Array, undefined, Uint32Array, Float32Array];
			accessor = new arrays[accessors[i].componentType - 5120](view.buffer, view.byteOffset + (accessors[i].byteOffset || 0), accessors[i].count * itemCount);

			this.accessors.push(accessor);
		}
	},

	loadMeshes: function(meshes) {
		for (var i = 0, l = meshes.length; i < l; i++) {
			var mesh = new Mesh();

			for (var j = 0, m = meshes[i].primitives.length; j < m; j++) {
				var material = new Material();
				material.uniforms = {
					diffuse: new UniformColor(new Color(1.0, 1.0, 1.0, 1.0))
				};
				material.shader = this.shadersManager.addSource('diffuse');
				material.samplers=[];
				this.createDefaultTextureSampler(this.shadersManager.context);
				material.samplers.push(this.defaultSampler);

				var submesh = this.loadSubmesh(meshes[i].primitives[j]);
				if (submesh)
					mesh.addSubmesh(submesh, material);
				else
					continue;
			}

			this.meshes.push(mesh);
		}
	},

	loadSubmesh: function(primitive) {
		var submesh = new Submesh();

		if (isNaN(parseInt(primitive.indices)) || isNaN(parseInt(primitive.attributes.POSITION)))
			return;

		submesh.faces = this.accessors[primitive.indices];
		submesh.positions = this.accessors[primitive.attributes.POSITION];

		if (!isNaN(parseInt(primitive.attributes.NORMAL)))
			submesh.normals = this.accessors[primitive.attributes.NORMAL];
		
		submesh.recalculateBounds();

		return submesh;
	},

	loadScene: function(node, parsedData) {
		if (!parsedData.scenes || isNaN(parseInt(parsedData.scene))) {
			// Just add all meshes
			for (var i = 0, l = this.meshes.length; i < l; i++) {
				var meshNode = new Node();
				meshNode.addComponent(new MeshComponent(this.meshes[i]));
				meshNode.addComponent(new MeshRendererComponent());
			}
		}
		else {
			var scene = parsedData.scenes[parsedData.scene];
			for (var i = 0, l = (scene.nodes && scene.nodes.length) || 0; i < l; i++) {
				node.addNode(this.loadNode(parsedData.nodes, i));
			}
		}
	},

	loadNode: function(nodes, i) {
		var node = nodes[i];
		var sceneNode = new Node(node.name);

		if (!isNaN(parseInt(node.mesh))) {
			sceneNode.addComponent(new MeshComponent(this.meshes[node.mesh]));
			sceneNode.addComponent(new MeshRendererComponent());
		}

		if (node.matrix) {
			sceneNode.transform.relative = node.matrix;
		} else {
			sceneNode.transform.relative = mat4.fromRotationTranslationScale(
				mat4.create(),
				node.rotation || quat.create(),
				node.translation || vec3.create(),
				node.scale || vec3.fromValues(1, 1, 1)
			);
		}

		for (var i = 0, l = (node.children && node.children.length) || 0; i < l; i++) {
			sceneNode.addNode(this.loadNode(nodes, node.children[i]));
		}

		return sceneNode;
	}
});
