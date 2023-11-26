import Light from 'scene/components/Light';
import Material from 'rendering/materials/Material';
import UniformColor from 'rendering/shaders/UniformColor';
import Mesh from 'scene/geometry/Mesh';
import Submesh from 'scene/geometry/Submesh';
import Node from 'scene/Node';
import MeshComponent from 'scene/components/MeshComponent';
import MeshRendererComponent from 'scene/components/MeshRendererComponent';
import Color from 'rendering/Color';
import ShaderDescriptor from "../descriptors/ShaderDescriptor";

/**
 * Ambient light (affects entire buffer)
 */
class AmbientLight extends Light {
	constructor(color) {
		super();
		this.color = color || new Color(0.2, 0.2, 0.2, 1.0);
	}

	type(): any {
		return "AmbientLight";
	}

	onAddScene(node: Node) {
		node.scene.ambientLights.push(this);
		super.onAddScene(node);
	}

	onRemoveScene(node: Node) {
		const i = node.scene.ambientLights.indexOf(this);
		if (i !== -1) {
			node.scene.ambientLights.splice(i, 1);
		}
		super.onRemoveScene(node);
	}

	onStart(context, engine): any {
		super.onStart(context, engine);

		this.material = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/pbr_ambient.frag'),
			),
			{
				'lightColor': new UniformColor(this.color)
			},
			[]
		);

		engine.assetsManager.load();
	}

	onUpdate(): any {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
	}
}

globalThis.AmbientLight = AmbientLight;
export default AmbientLight;
