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
	geometry: any;
	material: any;

	constructor(color) {
		super();
		this.color = color || new Color(0.2, 0.2, 0.2, 1.0);
		this.geometry = null;
		this.material = null;
	}

	type(): any {
		return "AmbientLight";
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

		this.geometry = new Node("AmbientLightGeometry");
		this.geometry.addComponent(new MeshComponent(mesh));
		this.geometry.addComponent(new MeshRendererComponent()).disable();
		this.node.addNode(this.geometry);

		engine.assetsManager.load();
	}

	onUpdate(): any {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
	}

	getGeometryRenderers() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	}
}

globalThis.AmbientLight = AmbientLight;
export default AmbientLight;
