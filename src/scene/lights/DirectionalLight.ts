import Light from 'scene/components/Light.js'
import Material from 'rendering/materials/Material.js'
import UniformColor from 'rendering/shaders/UniformColor.js'
import UniformFloat from 'rendering/shaders/UniformFloat.js'
import UniformVec3 from 'rendering/shaders/UniformVec3.js'
import UniformMat4 from 'rendering/shaders/UniformMat4.js'
import UniformInt from 'rendering/shaders/UniformInt.js'
import TargetTextureFloat from 'rendering/camera/TargetTextureFloat.js'
import TargetTexture from 'rendering/camera/TargetTexture.js'
import Sampler from 'rendering/shaders/Sampler.js'
import Mesh from 'scene/geometry/Mesh.js'
import Submesh from 'scene/geometry/Submesh.js'
import Node from 'scene/Node.js'
import MeshComponent from 'scene/components/MeshComponent.js'
import MeshRendererComponent from 'scene/components/MeshRendererComponent.js'
import Color from 'rendering/Color'

/**
 * Directional light (affects entire buffer)
 */

class DirectionalLight extends Light {
	intensity: any;
	color: any;
	direction: any;
	shadowResolution: any;
	shadowBias: any;
	geometry: any;
	material: any;
	shadow: any;
	shadowSampler: any;
	lightView: any;
	lightProj: any;

	constructor(direction, color) {
		super();

		this.intensity = 1.0;
		this.color = color || new Color(1.0, 1.0, 1.0, 1.0);
		this.direction = vec3.fromValues(1.0, 1.0, 1.0);
		if (direction)
			this.setLightDirection(direction);
		this.shadowResolution = vec2.fromValues(2048, 2048);
		this.shadowBias = 0.01; ///< Used to offset lightspace depth to avoid floating point errors in depth comparison

		this.geometry = null;
		this.material = null;

		this.shadow = null;
		this.shadowSampler = null;
		this.lightView = mat4.create();
		this.lightProj = mat4.create();
	}

	type(): any {
		return "DirectionalLight";
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
			// engine.assetsManager.addShaderSource("shaders/default/deferred_light_directional"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_light_directional')),
			{
				'lightColor': new UniformColor(this.color),
				'lightIntensity': new UniformFloat(this.intensity),
				'lightDirection': new UniformVec3(vec3.create()),
				'lightView': new UniformMat4(mat4.create()),
				'lightProjection': new UniformMat4(mat4.create()),
				'useShadows': new UniformInt(0),
				'shadowBias': new UniformFloat(0.01)
			},
			[]
		);

		if (this.shadowCasting && !this.shadow) {
			if (context.isWebGL2()) {
				this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);
			}
			else {
				var extHalfFloat = context.gl.getExtension('OES_texture_half_float');
				var extFloat = context.gl.getExtension('OES_texture_float');
				if (!extFloat && !extHalfFloat) {
					this.shadow = new TargetTexture(this.shadowResolution, context, false);
				} else {
					this.shadow = new TargetTextureFloat(this.shadowResolution, context, false);
				}
			}

			this.shadowSampler = new Sampler('shadow0', this.shadow.texture);
			this.material.samplers.push(this.shadowSampler);
		}

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

		this.geometry = new Node("DirectionalLightGeometry");
		this.geometry.addComponent(new MeshComponent(mesh));
		this.geometry.addComponent(new MeshRendererComponent()).disable();
		this.node.addNode(this.geometry);

		engine.assetsManager.load();
	}

	onUpdate(engine): any {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
		vec3.copy(this.material.uniforms.lightDirection.value, this.direction);
		this.material.uniforms.lightIntensity.value = this.intensity;
		this.material.uniforms.useShadows.value = this.shadowCasting ? 1 : 0;
		this.material.uniforms.shadowBias.value = this.shadowBias;

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

	getGeometryRenderers(): any {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	}

	onContextRestored(context) {
		delete this.shadow;
		this.shadow = null;
	}

}

globalThis.DirectionalLight = DirectionalLight;

export default DirectionalLight;
