import UniformColor from "rendering/shaders/UniformColor";
import Material from "rendering/materials/Material";
import Color from "rendering/Color";
import type RenderingContext from "rendering/RenderingContext";
import type Camera from "../Camera";
import PBRRenderStage from "./PBRRenderStage";
import type Engine from "engine/Engine";
import type Scene from "scene/Scene";
import ShaderDescriptor from "scene/descriptors/ShaderDescriptor";
import SkyboxComponent from "scene/components/SkyboxComponent";

class BackgroundRenderStage extends PBRRenderStage {
	backgroundMaterial: Material;
	immersiveColor = new Color(0.0, 0.0, 0.0, 0.0);
	skyboxMaterial: Material;
	isImmersive = false;

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		super.onStart(context, engine, camera);

		this.backgroundMaterial = new Material(
			engine.assetsManager.shadersManager.addDescriptor(new ShaderDescriptor("shaders/uv.vert", "shaders/color.frag", [])),
			{
				color1: new UniformColor(new Color(0.8, 0.8, 0.8, 1.0)),
			},
			[],
		);

		this.skyboxMaterial = new Material(
			engine.assetsManager.addShader("shaders/uv.vert", "shaders/skybox.frag"),
			{},
			[],
		);

		engine.assetsManager.load();
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		let gl = context.gl;

		gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);

		if (!this.isImmersive) {
			let skyboxComponent = scene.cameraNode.getComponent(SkyboxComponent);
			if (skyboxComponent) {
				camera.renderStage.renderEffect(context, this.skyboxMaterial, skyboxComponent.sampler);
			} else {
				camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color1.value);
				camera.renderStage.renderEffect(context, this.backgroundMaterial, []);
			}
		} else {
			this.immersiveColor.toVector(this.backgroundMaterial.uniforms.color1.value);
			camera.renderStage.renderEffect(context, this.backgroundMaterial, []);
		}

		super.onPostRender(context, scene, camera);
	}

	onContextRestored(context: RenderingContext): void {
		this.backgroundMaterial.shader.onContextRestored(context);
		this.skyboxMaterial.shader.onContextRestored(context);
	}
}

globalThis.BackgroundRenderStage = BackgroundRenderStage;
export default BackgroundRenderStage;
