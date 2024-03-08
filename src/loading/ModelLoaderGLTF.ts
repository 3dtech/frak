import TextureDescriptor from 'scene/descriptors/TextureDescriptor';
import Sampler from 'rendering/shaders/Sampler';
import UniformMat3 from 'rendering/shaders/UniformMat3';
import Material, { RendererType, TransparencyType } from 'rendering/materials/Material';
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
import DirectionalLight from "../scene/lights/DirectionalLight";
import init, { generateTangents } from '../../lib/mikktspace';
import { TextureOptions } from '../rendering/materials/BaseTexture';
import TexturesManager from './TexturesManager';
import ShadersManager from './ShadersManager';
import ModelDescriptor from '../scene/descriptors/ModelDescriptor';

function defaultSampler(): TextureOptions {
	return {
		flipY: false,
		noConvertColorSpace: true,
		wrapS: 'repeat',
		wrapT: 'repeat',
	};
}

/** Loads models to scene hierarchy from JSON data */
class ModelLoaderGLTF {
	descriptor: ModelDescriptor;
	shadersManager: ShadersManager;
	texturesManager: TexturesManager;
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
	async load(node, data) {
		await init();
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

		await this.loadBuffers(parsedData.buffers);

		this.loadBufferViews(parsedData.bufferViews || []);
		this.loadAccessors(parsedData.accessors || []);
		this.loadImages(parsedData.images || []);
		this.loadSamplers(parsedData.samplers || []);
		this.loadTextures(parsedData.textures || []);
		this.loadMaterials(parsedData.materials || []);
		this.loadMeshes(parsedData.meshes);
		this.loadScene(node, parsedData);
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

	async loadBuffers(buffers) {
		const loadingBuffers = [];
		for (var i = 0, l = buffers.length; i < l; i++) {
			var byteLength = buffers[i].byteLength;
			var buffer = {
				data: undefined,
				length: byteLength,
			};

			this.buffers.push(buffer);

			if (!buffers[i].uri) {
				if (i === 0) {	 // Spec says only the first buffer can be embedded
					buffer.data = this.binaryBuffer;
				}

				continue;
			}

			var uri = buffers[i].uri;
			if (!(new RegExp('^//|(?:[a-z]+:)', 'i')).test(uri)) {
				var source = this.descriptor.source.split('/');
				source.pop();
				source.push(buffers[i].uri);
				uri = source.join('/');
			}

			loadingBuffers.push((async (buffer) => {
				const response = await fetch(uri);
				const data = await response.arrayBuffer();
				if (data.byteLength == byteLength) {
					buffer.data = data;
				}
			})(buffer));
		}

		await Promise.allSettled(loadingBuffers);
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

	loadSamplers(samplers) {
		for (let i = 0, l = samplers.length; i < l; i++) {
			const sampler = defaultSampler();

			if (!isNaN(parseInt(samplers[i].wrapS))) {
				if (samplers[i].wrapS === 33071) {
					sampler.wrapS = 'clamp';
				} else if (samplers[i].wrapS === 33648) {
					sampler.wrapS = 'mirror';
				}
			}

			if (!isNaN(parseInt(samplers[i].wrapT))) {
				if (samplers[i].wrapT === 33071) {
					sampler.wrapT = 'clamp';
				} else if (samplers[i].wrapT === 33648) {
					sampler.wrapT = 'mirror';
				}
			}

			if (!isNaN(parseInt(samplers[i].magFilter))) {
				if (samplers[i].magFilter === 9729) {
					sampler.magFilter = 'linear';
				} else if (samplers[i].magFilter === 9728) {
					sampler.magFilter = 'nearest';
				}
			}

			if (!isNaN(parseInt(samplers[i].minFilter))) {
				if (samplers[i].minFilter === 9729) {
					sampler.minFilter = 'linear';
				} else if (samplers[i].minFilter === 9728) {
					sampler.minFilter = 'nearest';
				} else if (samplers[i].minFilter === 9984) {
					sampler.minFilter = 'nearestMipmapNearest';
				} else if (samplers[i].minFilter === 9985) {
					sampler.minFilter = 'linearMipmapNearest';
				} else if (samplers[i].minFilter === 9986) {
					sampler.minFilter = 'nearestMipmapLinear';
				} else if (samplers[i].minFilter === 9987) {
					sampler.minFilter = 'linearMipmapLinear';
				}
			}

			this.samplers.push(sampler);
		}
	}

	loadTextures(textures): any {
		for (var i = 0, l = textures.length; i < l; i++) {
			if (isNaN(parseInt(textures[i].source))) {
				continue;
			}

			var descriptorImage = this.images[textures[i].source];
			var descriptor = new TextureDescriptor(descriptorImage.uri);

			descriptor.locked = descriptorImage.locked;

			// Hack to enable multiple textures with different settings but same image
			(descriptor as any).glTFID = i;

			const texture = this.texturesManager.addDescriptor(descriptor);

			let sampler = defaultSampler();
			if (!isNaN(parseInt(textures[i].sampler))) {
				sampler = this.samplers[textures[i].sampler];
			}

			texture.setOptions(sampler);

			this.textures.push(texture);
		}
	}

	loadMaterials(materials): any {
		var textures = this.textures;

		function setSampler(material: Material, textureData, name) {
			if (textureData) {
				var upperCaseName = name.toUpperCase();

				material.samplers.push(new Sampler(name + '0', textures[textureData.index]));

				material.definitions.addDefinition(upperCaseName + '_TEXTURE');

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

					material.definitions.addDefinition(upperCaseName + '_UV_TRANSFORM');

					material.uniforms[name + 'UVTransform'] = new UniformMat3(uvMatrix);
				}
			}
		}

		for (var i = 0, l = materials.length; i < l; i++) {
			var material = new Material(null, {}, []);
			if (materials[i].name) {
				material.name = materials[i].name;
			}

			var diffuse = new Color();
			var metallic = 1.0;
			var roughness = 1.0;
			if (materials[i].pbrMetallicRoughness) {
				var mr = materials[i].pbrMetallicRoughness;
				var bcf = mr.baseColorFactor;
				if (bcf) {
					diffuse.set(bcf[0], bcf[1], bcf[2], bcf[3]);
				}

				var metallicFactor = parseFloat(mr.metallicFactor);
				if (!isNaN(metallicFactor)) {
					metallic = metallicFactor;
				}

				var roughnessFactor = parseFloat(mr.roughnessFactor);
				if (!isNaN(roughnessFactor)) {
					roughness = roughnessFactor;
				}

				setSampler(material, mr.baseColorTexture, 'diffuse');
				setSampler(material, mr.metallicRoughnessTexture, 'metallicRoughness');
			}

			material.uniforms.diffuse = new UniformColor(diffuse);
			material.uniforms.perceptualRoughness = new UniformFloat(roughness);
			material.uniforms.metallic = new UniformFloat(metallic);

			material.uniforms.emissive = new UniformColor(new Color(0, 0, 0));

			const eF = materials[i].emissiveFactor;
			if (eF && eF.length > 2) {
				vec4.set(material.uniforms.emissive.value, eF[0], eF[1], eF[2], 1.0);
			}

			setSampler(material, materials[i].normalTexture, 'normal');
			setSampler(material, materials[i].occlusionTexture, 'occlusion');
			setSampler(material, materials[i].emissiveTexture, 'emissive');

			if (!materials[i].alphaMode) {
				if (diffuse.a < 1.0) {	// Legacy compatibility
					materials[i].alphaMode = 'BLEND';
				} else {
					materials[i].alphaMode = 'OPAQUE';
				}
			}

			if (materials[i].alphaMode === 'BLEND') {
				material.setTransparency(TransparencyType.Transparent);
			} else if (materials[i].alphaMode === 'MASK') {
				let cutoff = 0.5;

				const alphaCutoff = parseFloat(materials[i].alphaCutoff);
				if (!isNaN(alphaCutoff)) {
					cutoff = alphaCutoff;
				}

				material.uniforms.alphaCutoff = new UniformFloat(cutoff);
				material.setTransparency(TransparencyType.Mask);
			}

			if (materials[i].extensions) {
				if (materials[i].extensions.KHR_materials_unlit) {
					material.setType(RendererType.Unlit);
				}
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
						null,
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
			submesh.texCoords2D = [this.accessors[primitive.attributes.TEXCOORD_0]];
		}

		if (!isNaN(parseInt(primitive.attributes.COLOR_0))) {
			const colors = this.accessors[primitive.attributes.COLOR_0];
			const pointCount = submesh.positions.length / 3;

			if (colors.length / pointCount === 4) {
				submesh.colors = colors;

				material.definitions.addDefinition('VERTEX_COLORS');
			} else if (colors.length / pointCount === 3) {
				submesh.colors = [];
				for (let i = 0; i < colors.length; i += 3) {
					submesh.colors.push(colors[i], colors[i + 1], colors[i + 2], 1.0);
				}

				material.definitions.addDefinition('VERTEX_COLORS');
			}
		}

		if (!isNaN(parseInt(primitive.attributes.TANGENT))) {
			submesh.tangents4D = this.accessors[primitive.attributes.TANGENT];
			submesh.tangents = submesh.tangents4D.filter(
				function(_, i) {
					return i % 4 !== 3;
				}
			);

			material.definitions.addDefinition('VERTEX_TANGENTS');
		} else if (submesh.texCoords2D.length && submesh.normals.length) {
			try {
				submesh.unweld();
				submesh.tangents4D = generateTangents(submesh.positions, submesh.normals, submesh.texCoords2D[0]);
				material.definitions.addDefinition('VERTEX_TANGENTS');
			} catch (e) {}
		}

		submesh.updateIndexType();
		submesh.recalculateBounds();

		return submesh;
	}

	loadScene(node, parsedData): any {
		let hasSceneNodes = false;
		var i, l;

		const sceneId = parseInt(parsedData.scene);
		if (parsedData.scenes && !isNaN(sceneId)) {
			const scene = parsedData.scenes[sceneId];
			if (scene && scene.nodes) {
				hasSceneNodes = true;
				for (let i = 0; i < scene.nodes.length; i++) {
					node.addNode(this.loadNode(parsedData.nodes, scene.nodes[i], parsedData));
				}
			}
		}

		if (!hasSceneNodes) {
			// Just add all meshes
			for (i = 0, l = this.meshes.length; i < l; i++) {
				var meshNode = new Node();
				var renderer = new MeshRendererComponent();

				meshNode.addComponent(new MeshComponent(this.meshes[i]));
				meshNode.addComponent(renderer);
				meshNode.addComponent(new MeshCollider());

				node.addNode(meshNode);
			}
		}
	}

	loadNode(nodes, index, parsedData): any {
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

		if (node.extensions && node.extensions.KHR_lights_punctual) {
			const light = this.loadLight(node.extensions.KHR_lights_punctual.light, parsedData, sceneNode.transform.relative);
			if (light) {
				sceneNode.addComponent(light);
			}
		}

		for (var i = 0, l = (node.children && node.children.length) || 0; i < l; i++) {
			sceneNode.addNode(this.loadNode(nodes, node.children[i], parsedData));
		}

		return sceneNode;
	}

	loadLight(index, parsedData, transform) {
		const lightInfo = parsedData.extensions?.KHR_lights_punctual?.lights?.[index];
		if (!lightInfo) {
			return;
		}

		let light;
		switch (lightInfo.type) {
			case 'directional':
				light = new DirectionalLight();
				const rotation = quat.fromMat4(quat.create(), transform);
				light.setLightDirection(vec3.transformQuat(light.direction, vec3.fromValues(0, 0, -1), rotation));
				break;

			case 'point':	// TODO
			default:
				return;
		}

		const intensity = parseFloat(lightInfo.intensity);
		if (!isNaN(intensity)) {
			light.intensity = intensity;
		}

		const color = lightInfo.color
		if (color) {
			light.color.set(color[0], color[1], color[2]);
		}

		return light;
	}
}

globalThis.ModelLoaderGLTF = ModelLoaderGLTF;
export default ModelLoaderGLTF;
