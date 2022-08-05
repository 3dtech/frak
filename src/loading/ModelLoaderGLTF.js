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
			texturesDiffuse: 'diffuse',
			texturesNormals: 'normal'
		}

		this.binary = format === 'glb';
		this.binaryBuffer = false;

		this.buffers = [];
		this.bufferViews = [];
		this.accessors = [];
		this.images = [];
		this.samplers = [];
		this.textures = [];
		this.materials = [];
		this.meshes = [];
	},

	/** Loads parsed data to scene hierarchy at given node */
	load: function(node, data, cb) {
		var parsedData;

		if (!this.binary) {
			parsedData = data;
		} else {
			var view = new DataView(data);
			if (
				view.getUint32(0, true) === 0x46546C67 && // magic === 'glTF'
				view.getUint32(4, true) === 2 && // version === 2
				view.getUint32(8, true) === data.byteLength
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
		) {
			return;
		}

		var scope = this;

		this.loadBuffers(parsedData.buffers, function() {
			scope.loadBufferViews(parsedData.bufferViews || []);
			scope.loadAccessors(parsedData.accessors || []);
			scope.loadImages(parsedData.images || []);
			scope.loadSamplers(parsedData.samplers || []);
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
		} else {
			var length = view.getUint32(20 + jsonLength, true);
			if (28 + jsonLength + length !== view.byteLength) {
				return;
			}

			if (view.getUint32(24 + jsonLength, true) !== 0x004E4942) { // type === 'BIN'
				throw 'Invalid binary data';
			}

			return view.buffer.slice(28 + jsonLength, 28 + jsonLength + length);
		}
	},

	absoluteURI: function(uri) {
		if ((new RegExp('^//|(?:[a-z]+:)', 'i')).test(uri)) {
			return uri;
		}

		var path = this.descriptor.getFullPath();
		var start = (new RegExp('(.*/).*?$')).exec(path)[1];

		return start + uri;
	},

	loadBuffers: function(buffers, cb) {
		var count = 0;
		for (var i = 0, l = buffers.length; i < l; i++) {
			count++;

			var byteLength = buffers[i].byteLength;
			var buffer = {
				length: byteLength
			};

			this.buffers.push(buffer);

			if (!buffers[i].uri) {
				buffer.data = this.binaryBuffer;
				count--;

				continue;
			}

			Logistics.getBinary(this.absoluteURI(buffers[i].uri), function(binaryData) {
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

			accessor = new arrays[accessors[i].componentType - 5120](
				view.buffer,
				view.byteOffset + (accessors[i].byteOffset || 0),
				accessors[i].count * itemCount
			);

			this.accessors.push(accessor);
		}
	},

	defaultMaterial: function() {
		return new Material(
			this.shadersManager.addSource('pbr'),
			{},
			[
				new Sampler('diffuse0', this.shadersManager.context.engine.WhiteTexture)
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
				this.images.push(this.absoluteURI(uri));
			}
		}
	},

	loadSamplers: function(samplers) {
		this.samplers = samplers.slice();
	},

	loadTextures: function(textures) {
		for (var i = 0, l = textures.length; i < l; i++) {
			var texture = textures[i];
			if (isNaN(parseInt(texture.source))) {
				continue;
			}

			var descriptorImage = this.images[texture.source];
			var descriptor = new TextureDescriptor(descriptorImage);

			// Hack to enable multiple textures with different settings but same image
			descriptor.glTFID = i;

			var image = this.texturesManager.addDescriptor(descriptor);

			image.flipY = false;	// Make sure this happens before texturesManager.load is called

			if (!isNaN(parseInt(texture.sampler))) {
				var sampler = this.samplers[texture.sampler];

				if (!isNaN(parseInt(sampler.wrapS))) {
					if (sampler.wrapS === 33071) {
						image.wrapS = 'clamp';
					} else if (sampler.wrapS === 33648) {
						image.wrapS = 'mirror';
					}
				}

				if (!isNaN(parseInt(sampler.wrapT))) {
					if (sampler.wrapT === 33071) {
						image.wrapT = 'clamp';
					} else if (sampler.wrapT === 33648) {
						image.wrapT = 'mirror';
					}
				}
			}

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
			var emissive = new Color(0.0, 0.0, 0.0);
			var metallic = 1.0;
			var roughness = 1.0;
			if (materials[i].pbrMetallicRoughness) {
				var bcf = materials[i].pbrMetallicRoughness.baseColorFactor;
				if (bcf) {
					diffuse.set(bcf[0], bcf[1], bcf[2], bcf[3]);
				}

				var metallicFactor = materials[i].pbrMetallicRoughness.metallicFactor;
				if (!isNaN(parseFloat((metallicFactor)))) {
					metallic = metallicFactor;
				}

				var roughnessFactor = materials[i].pbrMetallicRoughness.roughnessFactor;
				if (!isNaN(parseFloat((roughnessFactor)))) {
					roughness = roughnessFactor;
				}

				var texture = materials[i].pbrMetallicRoughness.baseColorTexture;
				if (texture) {
					material.samplers = [
						new Sampler('diffuse0', this.textures[texture.index])
					];

					material.shader.definitions.push('DIFFUSE_TEXTURE');
				}

				var metallicRoughness = materials[i].pbrMetallicRoughness.metallicRoughnessTexture;
				if (metallicRoughness) {
					material.samplers.push(
						new Sampler('metallicRoughness0', this.textures[metallicRoughness.index])
					);

					material.shader.definitions.push('METALLIC_ROUGHNESS_TEXTURE');
				}
			}

			var eF = materials[i].emissiveFactor;
			if (eF && eF.length > 2) {
				emissive.set(eF[0], eF[1], eF[2]);
			}

			material.uniforms = {
				diffuse: new UniformColor(diffuse),
				perceptual_roughness: new UniformFloat(roughness),
				reflectance: new UniformFloat(0.5),
				metallic: new UniformFloat(metallic),
				emissive: new UniformColor(emissive)
			};

			if (materials[i].normalTexture) {
				material.samplers.push(
					new Sampler('normal0', this.textures[materials[i].normalTexture.index])
				);

				material.shader.definitions.push('NORMAL_MAP');
			}

			if (materials[i].occlusionTexture) {
				material.samplers.push(
					new Sampler('occlusion0', this.textures[materials[i].occlusionTexture.index])
				);

				material.shader.definitions.push('OCCLUSION_TEXTURE');
			}

			if (materials[i].emissiveTexture) {
				material.samplers.push(
					new Sampler('emissive0', this.textures[materials[i].emissiveTexture.index])
				);

				material.shader.definitions.push('EMISSIVE_TEXTURE');
			}

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
				if (submesh) {
					mesh.addSubmesh(submesh, material);
				} else {
					continue;
				}
			}

			this.meshes.push(mesh);
		}
	},

	loadSubmesh: function(primitive) {
		var submesh = new Submesh();

		if (isNaN(parseInt(primitive.indices)) || isNaN(parseInt(primitive.attributes.POSITION))) {
			return;
		}

		submesh.faces = this.accessors[primitive.indices];
		submesh.positions = this.accessors[primitive.attributes.POSITION];

		if (!isNaN(parseInt(primitive.attributes.NORMAL))) {
			submesh.normals = this.accessors[primitive.attributes.NORMAL];
		}

		if (!isNaN(parseInt(primitive.attributes.TEXCOORD_0))) {
			submesh.texCoords2D.push(this.accessors[primitive.attributes.TEXCOORD_0]);
		}

		if (!isNaN(parseInt(primitive.attributes.TANGENT))) {
			submesh.tangents = this.accessors[primitive.attributes.TANGENT].filter(
				function(_, i) {
					return i % 4 !== 3;
				}
			);
		} else if (submesh.texCoords2D.length) {
			submesh.calculateTangents();
		}

		submesh.recalculateBounds();

		return submesh;
	},

	loadScene: function(node, parsedData) {
		var i;

		if (!parsedData.scenes || isNaN(parseInt(parsedData.scene))) {
			// Just add all meshes
			for (i = 0, l = this.meshes.length; i < l; i++) {
				var meshNode = new Node();
				var renderer = new MeshRendererComponent();

				renderer.customShader = true;

				meshNode.addComponent(new MeshComponent(this.meshes[i]));
				meshNode.addComponent(renderer);
				meshNode.addComponent(new MeshCollider());
			}
		} else {
			var scene = parsedData.scenes[parsedData.scene];
			for (i = 0, l = (scene.nodes && scene.nodes.length) || 0; i < l; i++) {
				node.addNode(this.loadNode(parsedData.nodes, scene.nodes[i]));
			}
		}
	},

	loadNode: function(nodes, index) {
		var node = nodes[index];
		var sceneNode = new Node(node.name);
		var renderer = new MeshRendererComponent();

		renderer.customShader = true;

		if (!isNaN(parseInt(node.mesh))) {
			sceneNode.addComponent(new MeshComponent(this.meshes[node.mesh]));
			sceneNode.addComponent(renderer);
			sceneNode.addComponent(new MeshCollider());
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
