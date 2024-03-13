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
import Camera from "../../rendering/camera/Camera";
import BoundingBox from "../geometry/BoundingBox";
import Renderer from "../../rendering/renderers/Renderer";

/**
 * Directional light (affects entire buffer)
 */
class DirectionalLight extends Light {
	shadowResolution: any;
	shadow: TargetTextureFloat;
	shadowSampler: Sampler;
	lightView = mat4.create()
	lightProj = mat4.create();
	frustum = new BoundingBox();
	spaceDamaged = -1;
	position = vec3.create();
	lookTarget = vec3.create();
	upVector = vec3.fromValues(0, 1, 0);
	filteredRenderers: Renderer[] = [];

	constructor(public direction = vec3.fromValues(1, 1, 1), public color = new Color(1, 1, 1, 1)) {
		super();

		this.intensity = 1.0;
		this.setLightDirection(direction);
		this.shadowResolution = vec2.fromValues(2048, 2048);

		this.shadow = null;
		this.shadowSampler = null;
	}

	type(): any {
		return "DirectionalLight";
	}

	onAddScene(node: Node) {
		node.scene.directionalLights.push(this);
		super.onAddScene(node);
	}

	onRemoveScene(node: Node) {
		const i = node.scene.directionalLights.indexOf(this);
		if (i !== -1) {
			node.scene.directionalLights.splice(i, 1);
		}
		super.onRemoveScene(node);
	}

	/** Sets light direction. The given vector is re-normalized.
		@param direction {vec3} The new light direction. Does not have to be normalized. */
	setLightDirection(direction): any {
		vec3.copy(this.direction, direction);
		vec3.normalize(this.direction, this.direction);
	}

	onStart(context, engine): any {
		super.onStart(context, engine);

		vec2.set(this.shadowResolution, engine.options.directionalShadowResolution, engine.options.directionalShadowResolution);

		this.material = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/pbr_directional.frag'),
			),
			{
				'lightColor': new UniformColor(this.color),
				'lightIntensity': new UniformFloat(this.intensity),
				'lightDirection': new UniformVec3(vec3.create()),
				'lightView': new UniformMat4(mat4.create()),
				'lightProjection': new UniformMat4(mat4.create()),
			},
			[]
		);

		if (this.shadowCasting && !this.shadow) {
			this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);

			this.shadowSampler = new Sampler('shadow0', this.shadow.texture);
			this.material.samplers.push(this.shadowSampler);
		}

		engine.assetsManager.load();
	}

	onUpdate(engine): any {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
		vec3.copy(this.material.uniforms.lightDirection.value, this.direction);
		this.material.uniforms.lightIntensity.value = this.intensity;

		this.updateSamplers(engine.context);
	}

	updateSamplers(context): any {
		if (this.shadowCasting) {
			if (!this.shadow) {
				this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);
				if (!this.shadowSampler) {
					this.shadowSampler = new Sampler('shadow0', this.shadow.texture);
					this.material.samplers.push(this.shadowSampler);
				}
				else {
					this.shadowSampler.texture = this.shadow.texture;
				}

			}

			mat4.copy(this.material.uniforms.lightView.value, this.lightView);
			mat4.copy(this.material.uniforms.lightProjection.value, this.lightProj);
		}
	}

	onContextRestored(context) {
		delete this.shadow;
		this.shadow = null;
	}
}

globalThis.DirectionalLight = DirectionalLight;
export default DirectionalLight;
