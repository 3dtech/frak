import TextureDescriptor from 'scene/descriptors/TextureDescriptor';
import Sampler from 'rendering/shaders/Sampler';
import UniformMat3 from 'rendering/shaders/UniformMat3';
import Material from 'rendering/materials/Material';
import UniformColor from 'rendering/shaders/UniformColor';
import UniformFloat from 'rendering/shaders/UniformFloat';
import Mesh from 'scene/geometry/Mesh';
import Submesh from 'scene/geometry/Submesh';
import Node from 'scene/Node';
import MeshRendererComponent from 'scene/components/MeshRendererComponent';
import MeshComponent from 'scene/components/MeshComponent';
import MeshCollider from 'scene/components/MeshCollider';
import Color from 'rendering/Color';
import FRAK from 'Helpers';

/** Loads models to scene hierarchy from JSON data */
class ModelLoaderGLTF {
	descriptor: any;
	shadersManager: any;
	texturesManager: any;
	nodesByID: any;
	submeshesByID: any;
	submeshes: any;
	textureUniformMap: any;
	binary: any;
	binaryBuffer: any;
	buffers: any;
	bufferViews: any;
	accessors: any;
	images: any;
	samplers: any;
	textures: any;
	materials: any;
	meshes: any;

	constructor(descriptor, shadersManager, texturesManager, format) {
		this.descriptor = descriptor;
		this.shadersManager = shadersManager;
		this.texturesManager = texturesManager;
		this.nodesByID = {};
		this.submeshesByID = {};
		this.submeshes = [];

		this.textureUniformMap = {
			texturesDiffuse: 'diffuse',
			texturesNormals: 'normal',
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
	}

	/** Loads parsed data to scene hierarchy at given node */
	load(node, data, cb): any {
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
	}

	parseJSON(view): any {
		var length = view.getUint32(12, true);
		if (view.getUint32(16, true) !== 0x4E4F534A) { // type === 'JSON'
			throw 'Invalid JSON data';
		}

		var data = new Uint8Array(view.buffer, 20, length);

		return JSON.parse(new TextDecoder().decode(data));
	}

	parseBinaryBuffer(view): any {
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
	}

	loadBuffers(buffers, cb): any {
		var count = 0;
		for (var i = 0, l = buffers.length; i < l; i++) {
			count++;

			var byteLength = buffers[i].byteLength;
			var buffer = {
				data: undefined,
				length: byteLength,
			};

			this.buffers.push(buffer);

			if (!buffers[i].uri) {
				buffer.data = this.binaryBuffer;
				count--;

				continue;
			}

			var uri = buffers[i].uri;
			if (!(new RegExp('^//|(?:[a-z]+:)', 'i')).test(uri)) {
				var source = this.descriptor.source.split('/');
				source.pop();
				source.push(buffers[i].uri);
				uri = source.join('/');
			}

			Logistics.getBinary(uri, function(binaryData) {
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
	}

	loadBufferViews(bufferViews): any {
		for (var i = 0, l = bufferViews.length; i < l; i++) {
			var view = bufferViews[i];
			var buffer = this.buffers[view.buffer];

			this.bufferViews.push(new DataView(buffer.data, view.byteOffset || 0, view.byteLength || buffer.length));
		}
	}

	loadAccessors(accessors): any {
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

			if (accessors[i].max && itemCount === accessors[i].max.length) {
				accessor = accessor.map(function(val, idx) {
					return Math.min(val, accessors[i].max[idx % itemCount]);
				});
			}

			if (accessors[i].min && itemCount === accessors[i].min.length) {
				accessor = accessor.map(function(val, idx) {
					return Math.max(val, accessors[i].min[idx % itemCount]);
				});
			}

			this.accessors.push(accessor);
		}
	}

	loadImages(images): any {
		for (var i = 0, l = images.length; i < l; i++) {
			var uri;
			if (images[i].uri) {
				uri = images[i].uri;
				if (!(new RegExp('^//|(?:[a-z]+:)', 'i')).test(uri)) {
					var source = this.descriptor.source.split('/');
					source.pop();
					source.push(uri);
					uri = source.join('/');
				}
			} else if (!isNaN(parseInt(images[i].bufferView)) && images[i].mimeType) {
				var blob = new Blob([this.bufferViews[images[i].bufferView]], { type: images[i].mimeType });

				uri = URL.createObjectURL(blob);
			}

			if (uri) {
				this.images.push({
					locked: (new RegExp('^//|(?:[a-z]+:)', 'i')).test(uri),
					uri: uri,
				});
			}
		}
	}

	loadSamplers(samplers): any {
		this.samplers = samplers.slice();
	}

	loadTextures(textures): any {
		for (var i = 0, l = textures.length; i < l; i++) {
			var texture = textures[i];
			if (isNaN(parseInt(texture.source))) {
				continue;
			}

			var descriptorImage = this.images[texture.source];
			var descriptor = new TextureDescriptor(descriptorImage.uri);

			descriptor.locked = descriptorImage.locked;

			// Hack to enable multiple textures with different settings but same image
			(descriptor as any).glTFID = i;

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
	}

	loadMaterials(materials): any {
		var textures = this.textures;

		function setSampler(material, definitions, textureData, name) {
			if (textureData) {
				var upperCaseName = name.toUpperCase();

				material.samplers.push(new Sampler(name + '0', textures[textureData.index]));

				if (definitions.indexOf(upperCaseName + '_TEXTURE') === -1) {
					definitions.push(upperCaseName + '_TEXTURE');
				}

				if (textureData.extensions && textureData.extensions.KHR_texture_transform) {
					var transform = textureData.extensions.KHR_texture_transform;

					var uvMatrix = mat3.create();
					var tmp = mat3.create();

					if (transform.offset) {
						tmp[6] = transform.offset[0];
						tmp[7] = transform.offset[1];
						mat3.mul(uvMatrix, uvMatrix, tmp);
						mat3.identity(tmp);
					}

					if (transform.rotation) {
						var s = Math.sin(transform.rotation);
						var c = Math.cos(transform.rotation);

						tmp[0] = tmp[4] = c;
						tmp[1] = -s;
						tmp[3] = s;

						mat3.mul(uvMatrix, uvMatrix, tmp);
						mat3.identity(tmp);
					}

					if (transform.scale) {
						tmp[0] = transform.scale[0];
						tmp[4] = transform.scale[1];
						mat3.mul(uvMatrix, uvMatrix, tmp);
						mat3.identity(tmp);
					}

					if (definitions.indexOf(upperCaseName + '_UV_TRANSFORM') === -1) {
						definitions.push(upperCaseName + '_UV_TRANSFORM');
					}

					material.uniforms[name + 'UVTransform'] = new UniformMat3(uvMatrix);
				}
			}
		}

		for (var i = 0, l = materials.length; i < l; i++) {
			var material = new Material(this.shadersManager.addSource('pbr'), {}, []);
			if (materials[i].name) {
				material.name = materials[i].name;
			}

			var transparent = false;
			if (materials[i].alphaMode === 'BLEND') {
				transparent = true;
			}

			var definitions = [];
			var diffuse = new Color();
			var emissive = new Color(0.0, 0.0, 0.0);
			var metallic = 1.0;
			var roughness = 1.0;
			if (materials[i].pbrMetallicRoughness) {
				var mr = materials[i].pbrMetallicRoughness;
				var bcf = mr.baseColorFactor;
				if (bcf) {
					diffuse.set(bcf[0], bcf[1], bcf[2], bcf[3]);

					if (bcf[3] < 1.0) {
						transparent = true;	// Legacy compatibility
					}
				}

				var metallicFactor = parseFloat(mr.metallicFactor);
				if (!isNaN(metallicFactor)) {
					metallic = metallicFactor;
				}

				var roughnessFactor = parseFloat(mr.roughnessFactor);
				if (!isNaN(roughnessFactor)) {
					roughness = roughnessFactor;
				}

				setSampler(material, definitions, mr.baseColorTexture, 'diffuse');
				setSampler(material, definitions, mr.metallicRoughnessTexture, 'metallicRoughness');
			}

			var eF = materials[i].emissiveFactor;
			if (eF && eF.length > 2) {
				emissive.set(eF[0], eF[1], eF[2]);
			}

			material.uniforms.diffuse = new UniformColor(diffuse);
			material.uniforms.perceptualRoughness = new UniformFloat(roughness);
			material.uniforms.metallic = new UniformFloat(metallic);
			material.uniforms.emissive = new UniformColor(emissive);

			setSampler(material, definitions, materials[i].normalTexture, 'normal');
			setSampler(material, definitions, materials[i].occlusionTexture, 'occlusion');
			setSampler(material, definitions, materials[i].emissiveTexture, 'emissive');

			if (transparent) {
				material.shader = this.shadersManager.addSource('transparent');
				material.shader.requirements.transparent = true;
			} else {
				material.shader = this.shadersManager.addSource('deferred_pbr', definitions);
			}

			this.materials.push(material);
		}
	}

	loadMeshes(meshes): any {
		for (var i = 0, l = meshes.length; i < l; i++) {
			var mesh = new Mesh();

			for (var j = 0, m = meshes[i].primitives.length; j < m; j++) {
				var material;
				if (!isNaN(parseInt(meshes[i].primitives[j].material))) {
					material = this.materials[meshes[i].primitives[j].material];
				} else {
					material = new Material(
						this.shadersManager.addSource('pbr', []),
						{},
						[]
					);
				}

				var submesh = this.loadSubmesh(meshes[i].primitives[j], material);
				if (submesh) {
					mesh.addSubmesh(submesh, material);
				} else {
					continue;
				}
			}

			this.meshes.push(mesh);
		}
	}

	loadSubmesh(primitive, material): any {
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
			submesh.tangents4D = this.accessors[primitive.attributes.TANGENT];
			submesh.tangents = submesh.tangents4D.filter(
				function(_, i) {
					return i % 4 !== 3;
				}
			);

			material.shader.definitions.push('VERTEX_TANGENTS');
		} else if (submesh.texCoords2D.length) {
			submesh.calculateTangents();
			material.shader.definitions.push('VERTEX_TANGENTS');
		}

		submesh.recalculateBounds();

		return submesh;
	}

	loadScene(node, parsedData): any {
		var i, l;

		if (!parsedData.scenes || isNaN(parseInt(parsedData.scene))) {
			// Just add all meshes
			for (i = 0, l = this.meshes.length; i < l; i++) {
				var meshNode = new Node();
				var renderer = new MeshRendererComponent();

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
	}

	loadNode(nodes, index): any {
		var node = nodes[index];
		var sceneNode = new Node(node.name);
		var renderer = new MeshRendererComponent();

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
}

globalThis.ModelLoaderGLTF = ModelLoaderGLTF;
export default ModelLoaderGLTF;
