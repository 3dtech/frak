import UniformColor from 'rendering/shaders/UniformColor';
import Material from 'rendering/materials/Material';
import Color from 'rendering/Color';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import PBRRenderStage from "./PBRRenderStage";
import Engine from "engine/Engine";
import Scene from "scene/Scene";
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
			engine.assetsManager.shadersManager.addDescriptor(new ShaderDescriptor(
				'shaders/uv.vert', 'shaders/color.frag', []
			)),
			{
				color1: new UniformColor(new Color(0.8, 0.8, 0.8, 1.0))
			},
			[]
		);

		this.skyboxMaterial = new Material(
			engine.assetsManager.addShader('shaders/uv.vert', 'shaders/skybox.frag'),
			{},
			[]
		);

		engine.assetsManager.load();
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var gl = context.gl;

		gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);

		if (!this.isImmersive) {
			var skyboxComponent = scene.cameraNode.getComponent(SkyboxComponent);
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
}

globalThis.BackgroundRenderStage = BackgroundRenderStage;
export default BackgroundRenderStage;
