/** Loads models to scene hierarchy from JSON data */
var ModelLoaderGLTF = FrakClass.extend({
	init: function(context, descriptor, shadersManager, texturesManager, format) {
		this.descriptor = descriptor;
		this.shadersManager = shadersManager;
		this.texturesManager = texturesManager;
		this.nodesByID = {};
		this.submeshesByID = {};
		this.submeshes = [];

		this.textureUniformMap = {
			'texturesDiffuse': 'diffuse',
			'texturesNormals': 'normal'
		}

		this.binary = format === 'glb';
		this.binaryBuffer = false;

		this.buffers = [];
		this.bufferViews = [];
		this.accessors = [];
		this.images = [];
		this.textures = [];
		this.materials = [];
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
	load: function(node, data, cb) {
		var parsedData;

		if (!this.binary) {
			parsedData = data;
		}
		else {
			var view = new DataView(data);
			if (
				view.getUint32(0, true) == 0x46546C67 && // magic === 'glTF'
				view.getUint32(4, true) == 2 && // version === 2
				view.getUint32(8, true) == data.byteLength
			) {
				parsedData = this.parseJSON(view);
				this.binaryBuffer = this.parseBinaryBuffer(view);
			} else {
				throw 'Invalid data';
			}
		}

		if (
			FRAK.isEmptyObject(parsedData) ||
			FRAK.isEmptyObject(parsedData.asset) ||
			parsedData.asset.version[0] !== '2'
		)
			return;

		var scope = this;
		this.loadBuffers(parsedData.buffers, function() {
			scope.loadBufferViews(parsedData.bufferViews || []);
			scope.loadAccessors(parsedData.accessors || []);
			scope.loadImages(parsedData.images || []);
			scope.loadTextures(parsedData.textures || []);
			scope.loadMaterials(parsedData.materials || []);
			scope.loadMeshes(parsedData.meshes);
			scope.loadScene(node, parsedData);
			cb();
		});
	},

	parseJSON: function(view) {
		var length = view.getUint32(12, true);
		if (view.getUint32(16, true) !== 0x4E4F534A) { // type === 'JSON'
			throw 'Invalid JSON data';
		}

		var data = new Uint8Array(view.buffer, 20, length);
		var str = '';
		for (var i = 0; i < length; i++) {
			str += String.fromCodePoint(data[i]);
		}

		return JSON.parse(str);
	},

	parseBinaryBuffer: function(view) {
		var jsonLength = view.getUint32(12, true);
		if (20 + jsonLength === view.byteLength) {
			return;
		}
		else {
			var length = view.getUint32(20 + jsonLength, true);
			if (28 + jsonLength + length != view.byteLength) {
				return;
			}

			if (view.getUint32(24 + jsonLength, true) !== 0x004E4942) { // type === 'BIN'
				throw 'Invalid binary data';
			}

			return view.buffer.slice(28 + jsonLength, 28 + jsonLength + length);
		}
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
			if (!buffers[i].uri) {
				buffer.data = this.binaryBuffer;
				count--;

				continue;
			}

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

		if (count === 0) {
			cb();
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

	defaultMaterial: function() {
		this.createDefaultTextureSampler(this.shadersManager.context);

		return new Material(
			this.shadersManager.addSource('diffuse'),
			{
				diffuse: new UniformColor(new Color()),
			},
			[
				this.defaultSampler,
			]
		);
	},

	loadImages: function(images) {
		for (var i = 0, l = images.length; i < l; i++) {
			var uri;
			if (images[i].uri) {
				uri = images[i].uri;
			} else if (!isNaN(parseInt(images[i].bufferView)) && images[i].mimeType) {
				var blob = new Blob([this.bufferViews[images[i].bufferView]], { type: images[i].mimeType });
				uri = URL.createObjectURL(blob);
			}

			if (uri) {
				this.images.push(this.texturesManager.addDescriptor(new LockedTextureDescriptor(uri)));
			}
		}
	},

	loadTextures: function(textures) {
		for (var i = 0, l = textures.length; i < l; i++) {
			if (isNaN(parseInt(textures[i].source))) {
				continue;
			}

			var image = this.images[textures[i].source];
			image.flipY = false;	// Make sure this happens before texturesManager.load is called

			this.textures.push(image);
		}
	},

	loadMaterials: function(materials) {
		for (var i = 0, l = materials.length; i < l; i++) {
			var material = this.defaultMaterial();
			if (materials[i].name) {
				material.name = materials[i].name;
			}

			if (materials[i].alphaMode === 'BLEND') {
				material.shader = this.shadersManager.addSource('transparent');
				material.shader.requirements.transparent = true;
			}

			var diffuse = new Color();
			if (materials[i].pbrMetallicRoughness) {
				var bcf = materials[i].pbrMetallicRoughness.baseColorFactor;
				if (bcf) {
					diffuse.set(bcf[0], bcf[1], bcf[2], bcf[3]);
				}

				var texture = materials[i].pbrMetallicRoughness.baseColorTexture;
				if (texture) {
					material.samplers = [
						new Sampler('diffuse0', this.textures[texture.index])
					];
				}
			}

			material.uniforms = {
				diffuse: new UniformColor(diffuse)
			};

			// Does not work right now for some reason
			/* if (materials[i].normalTexture) {
				material.samplers.push(
					new Sampler('normal0', this.textures[materials[i].normalTexture.index])
				);

				material.shader = this.shadersManager.addSource('normalmapped');
				material.uniforms['specularStrength'] = new UniformFloat(0.1);
				material.uniforms['specularPower'] = new UniformInt(10);
			} */

			this.materials.push(material);
		}
	},

	loadMeshes: function(meshes) {
		for (var i = 0, l = meshes.length; i < l; i++) {
			var mesh = new Mesh();

			for (var j = 0, m = meshes[i].primitives.length; j < m; j++) {
				var material;
				if (!isNaN(parseInt(meshes[i].primitives[j].material))) {
					material = this.materials[meshes[i].primitives[j].material];
				} else {
					material = this.defaultMaterial();
				}

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

		if (!isNaN(parseInt(primitive.attributes.TEXCOORD_0)))
			submesh.texCoords2D.push(this.accessors[primitive.attributes.TEXCOORD_0]);

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
				node.addNode(this.loadNode(parsedData.nodes, scene.nodes[i]));
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
