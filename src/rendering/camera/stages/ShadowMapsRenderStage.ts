import RenderStage from "./RenderStage";
import MainRenderStage from "./MainRenderStage";
import Shader from "rendering/shaders/Shader";
import RenderingContext from "rendering/RenderingContext";
import Engine from "engine/Engine";
import Camera from "../Camera";
import Scene from "scene/Scene";
import BoundingBox from "scene/geometry/BoundingBox";
import Renderer from "rendering/renderers/Renderer";
import Color from "rendering/Color";

class ShadowMapsRenderStage extends RenderStage {
	parent: MainRenderStage;
	opaqueShader: Shader;
	blendShader: Shader;
	damaged = -1;
	sceneAABB = new BoundingBox();
	filteredRenderers: Renderer[] = [];
	clearColor = new Color(1.0, 0.0, 0.0, 0.0);

	onStart(context: RenderingContext, engine: Engine, camera: Camera) {
		const defs = [
			'ALPHAMODE_OPAQUE 0',
			'ALPHAMODE_MASK 1',
			'ALPHAMODE_BLEND 2',
			'DEPTH'
		];

		this.opaqueShader = engine.assetsManager.addShader(
			'shaders/mesh.vert',
			'shaders/vsm.frag',
			defs.concat([
				'ALPHAMODE ALPHAMODE_OPAQUE'
			]));

		this.blendShader = engine.assetsManager.addShader(
			'shaders/mesh.vert',
			'shaders/vsm.frag',
			defs.concat([
				'ALPHAMODE ALPHAMODE_BLEND'
			]));
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const space = scene.dynamicSpace;
		if (space.damaged !== this.damaged) {
			// TODO: Doesn't account for transform updates
			this.damaged = space.damaged;

			this.sceneAABB.center = false;

			this.filteredRenderers.length = space.renderers.length;
			for (let i = 0; i < space.renderers.length; ++i) {
				const renderer = space.renderers[i];
				if (renderer.visible && renderer.castShadows) {
					this.filteredRenderers[i] = renderer;
					this.sceneAABB.encapsulateBox(renderer.globalBoundingBox);
				} else {
					this.filteredRenderers[i] = null;
				}
			}

			for (const light of scene.directionalLights) {
				if (!light.shadowCasting) {
					continue;
				}

				if (light.spaceDamaged !== this.damaged) {
					light.spaceDamaged = this.damaged;

                    light.filteredRenderers.length = this.filteredRenderers.length;
                    for (let i = 0; i < this.filteredRenderers.length; ++i) {
                        const renderer = this.filteredRenderers[i];
                        if (renderer && renderer.layer & light.shadowMask) {
                            light.filteredRenderers[i] = renderer;
                        } else {
                            light.filteredRenderers[i] = null;
                        }
                    }

					vec3.copy(light.position, this.sceneAABB.center);
					vec3.sub(light.lookTarget, this.sceneAABB.center, light.direction);
					mat4.lookAt(light.lightView, light.position, light.lookTarget, light.upVector);

					this.sceneAABB.transform(light.lightView, light.frustum);

					mat4.ortho(
						light.lightProj,
						light.frustum.min[0],
						light.frustum.max[0],
						light.frustum.min[1],
						light.frustum.max[1],
						light.frustum.min[2],
						light.frustum.max[2],
					);

					light.updateSamplers(context);
				}
			}
		}
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const gl = context.gl;
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LESS);
		gl.depthMask(true);

		for (const light of scene.directionalLights) {
			if (!light.shadowCasting || !light.enabled) {
				continue;
			}

			light.shadow.bind(context, false, this.clearColor);

			camera.renderStage.replaceViewProjection(context, light.lightProj, light.lightView);

			scene.organizer.opaqueRenderers.run(
				context,
				this.opaqueShader,
				light.filteredRenderers,
			);

			scene.organizer.transparentRenderers.run(
				context,
				this.blendShader,
				light.filteredRenderers,
			);
		}

		camera.renderStage.restoreViewProjection(context, camera);

		gl.disable(gl.DEPTH_TEST);
	}
}

globalThis.ShadowMapsRenderStage = ShadowMapsRenderStage;
export default ShadowMapsRenderStage;
