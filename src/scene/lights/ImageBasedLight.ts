import Light from 'scene/components/Light';
import Material from 'rendering/materials/Material';
import Sampler from 'rendering/shaders/Sampler';
import Node from 'scene/Node';
import ShaderDescriptor from "../descriptors/ShaderDescriptor";
import CubeTexture from "../../rendering/materials/CubeTexture";

/**
 * Image based lighting
 */
class ImageBasedLight extends Light {
	constructor(public source: CubeTexture) {
		super();
	}

	type(): any {
		return "ImageBasedLight";
	}

	onAddScene(node: Node) {
		node.scene.imageBasedLights.push(this);
		super.onAddScene(node);
	}

	onRemoveScene(node: Node) {
		const i = node.scene.imageBasedLights.indexOf(this);
		if (i !== -1) {
			node.scene.imageBasedLights.splice(i, 1);
		}
		super.onRemoveScene(node);
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

		engine.assetsManager.load();
	}

	onContextRestored(context) {}
}

globalThis.ImageBasedLight = ImageBasedLight;
export default ImageBasedLight;
