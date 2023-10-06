import Light from 'scene/components/Light';
import Material from 'rendering/materials/Material';
import UniformColor from 'rendering/shaders/UniformColor';
import UniformFloat from 'rendering/shaders/UniformFloat';
import UniformVec3 from 'rendering/shaders/UniformVec3';
import UniformMat4 from 'rendering/shaders/UniformMat4';
import UniformInt from 'rendering/shaders/UniformInt';
import TargetTextureFloat from 'rendering/camera/TargetTextureFloat';
import TargetTexture from 'rendering/camera/TargetTexture';
import Sampler from 'rendering/shaders/Sampler';
import Mesh from 'scene/geometry/Mesh';
import Submesh from 'scene/geometry/Submesh';
import Node from 'scene/Node';
import MeshComponent from 'scene/components/MeshComponent';
import MeshRendererComponent from 'scene/components/MeshRendererComponent';
import Color from 'rendering/Color';
import ShaderDescriptor from "../descriptors/ShaderDescriptor";
import CubeTexture from "../../rendering/materials/CubeTexture";

/**
 * Image based lighting
 */
class ImageBasedLight extends Light {
	geometry: any;
	material: any;

	constructor(public source: CubeTexture) {
		super();

		this.geometry = null;
		this.material = null;
	}

	type(): any {
		return "ImageBasedLight";
	}

	onStart(context, engine): any {
		super.onStart(context, engine);

		this.material = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/pbr_ibl.frag'),
			),
			{},
			[new Sampler('light0', this.source)]
		);

		var mesh = new Mesh();
		var submesh = new Submesh();
		submesh.positions = [
			-1, -1, 0,
			-1, 1, 0,
			1, 1, 0,
			1, -1, 0
		];
		submesh.normals = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		];
		submesh.texCoords2D = [[
			0.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0
		]];
		submesh.faces = [0, 1, 2, 0, 2, 3];
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, this.material);

		this.geometry = new Node("ImageBasedLightGeometry");
		this.geometry.addComponent(new MeshComponent(mesh));
		this.geometry.addComponent(new MeshRendererComponent()).disable();
		this.node.addNode(this.geometry);

		engine.assetsManager.load();
	}

	getGeometryRenderers(): any {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	}

	onContextRestored(context) {}
}

globalThis.ImageBasedLight = ImageBasedLight;
export default ImageBasedLight;
