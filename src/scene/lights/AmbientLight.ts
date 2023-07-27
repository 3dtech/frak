import Light from 'scene/components/Light.js'
import Material from 'rendering/materials/Material.js'
import UniformColor from 'rendering/shaders/UniformColor.js'
import Mesh from 'scene/geometry/Mesh.js'
import Submesh from 'scene/geometry/Submesh.js'
import Node from 'scene/Node.js'
import MeshComponent from 'scene/components/MeshComponent.js'
import MeshRendererComponent from 'scene/components/MeshRendererComponent.js'

/**
 * Ambient light (affects entire buffer)
 */

class AmbientLight extends Light {
	color: any;
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
		super.onStart();

		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_light_ambient"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_light_ambient')),
			{
				'lightColor': new UniformColor(this.color)
			}
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
	},

	onUpdate(): any {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
	}

	getGeometryRenderers() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	}

}

globalThis.AmbientLight = AmbientLight;

export default AmbientLight;