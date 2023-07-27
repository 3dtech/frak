import Light from 'scene/components/Light.js'
import Material from 'rendering/materials/Material.js'
import UniformColor from 'rendering/shaders/UniformColor.js'
import UniformVec3 from 'rendering/shaders/UniformVec3.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'
import Color from 'rendering/Color'
import MeshRendererComponent from 'scene/components/MeshRendererComponent'

/**
 * Omni-directional light (sphere)
 */

class OmniLight extends Light {
	size: any;
	color: any;
	intensity: any;
	geometry: any;
	material: any;

	constructor(size, color) {
		super();
		this.size = size || 1.0;
		this.color = color || new Color(1.0, 1.0, 1.0, 1.0);
		this.intensity = 1.0;
		this.geometry = null;
		this.material = null;
	}

	type(): any {
		return "OmniLight";
	}

	onStart(context, engine): any {
		super.onStart(context, engine);

		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_light_omni"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_light_omni')),
			{
				'lightColor': new UniformColor(this.color),
				'lightPosition': new UniformVec3(vec3.create()),
				'lightIntensity': new UniformFloat(this.intensity),
				'lightRadius': new UniformFloat(this.size)
			},
			[]
		);

		this.geometry = Primitives.sphere(this.size, 16, 16, this.material);
		this.geometry.getComponent(MeshRendererComponent).disable();
		this.node.addNode(this.geometry);

		engine.assetsManager.load();
	}

	onPreRender(): any {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
		this.node.transform.getPosition(this.material.uniforms.lightPosition.value);
		this.material.uniforms.lightIntensity.value = this.intensity;
		this.material.uniforms.lightRadius.value = this.size;
	}

	getGeometryRenderers(): any {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	}

	isPositional() {
		return true;
	}

}

globalThis.OmniLight = OmniLight;

export default OmniLight;
