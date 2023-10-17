import UniformColor from 'rendering/shaders/UniformColor';
import Material from 'rendering/materials/Material';
import Color from 'rendering/Color';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import PBRRenderStage from "./PBRRenderStage";
import Engine from "../../../engine/Engine";
import Scene from "../../../scene/Scene";
import ShaderDescriptor from "../../../scene/descriptors/ShaderDescriptor";
import SkyboxComponent from "../../../scene/components/SkyboxComponent";

/**
 * Deferred shading light accumulation pass
 */
class BackgroundRenderStage extends PBRRenderStage {
	backgroundMaterial: Material;
	skyboxMaterial: Material;

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		super.onStart(context, engine, camera);

		this.backgroundMaterial = new Material(
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_background')),
			{
				color: new UniformColor(new Color(0.8, 0.8, 0.8, 1.0))
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

		camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value);
		camera.renderStage.renderEffect(context, this.backgroundMaterial, []);
		var skyboxComponent = scene.cameraNode.getComponent(SkyboxComponent);
		if (skyboxComponent) {
			camera.renderStage.renderEffect(context, this.skyboxMaterial, skyboxComponent.sampler);
		}

		super.onPostRender(context, scene, camera);
	}
}

globalThis.BackgroundRenderStage = BackgroundRenderStage;
export default BackgroundRenderStage;
