import UniformColor from 'rendering/shaders/UniformColor';
import Material from 'rendering/materials/Material';
import Color from 'rendering/Color';
import RenderingContext from 'rendering/RenderingContext';
import Camera from '../Camera';
import PBRRenderStage from "./PBRRenderStage";
import Engine from "../../../engine/Engine";
import Scene from "../../../scene/Scene";
import SkyboxRenderStage from "../SkyboxRenderStage";
import Sampler from "../../shaders/Sampler";

/**
 * Deferred shading light accumulation pass
 */
class BackgroundRenderStage extends PBRRenderStage {
	backgroundMaterial: any;
	skyboxMaterial: Material;
	skyboxRenderStage = new SkyboxRenderStage();

	constructor() {
		super();
	}

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		super.onStart(context, engine, camera);

		this.backgroundMaterial = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_background"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('deferred_background')),
			{
				color: new UniformColor(new Color(0.0, 0.0, 1.0, 1.0))
			},
			[]
		);

		var s = new Sampler('').createFallbackCubeTexture(context);

		this.skyboxMaterial = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/deferred_background"),
			engine.assetsManager.addShaderSource('shaders/skybox'),
			{},
			[new Sampler('diffuse0', fallbackCubeTexture)]
		);

		this.skyboxRenderStage.start(context, engine, camera);

		engine.assetsManager.load();
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera): any {
		var gl = context.gl;

		gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);

		camera.backgroundColor.toVector(this.backgroundMaterial.uniforms.color.value);
		camera.renderStage.renderEffect(context, this.backgroundMaterial, []);

		super.onPostRender(context, scene, camera);
	}
}

globalThis.BackgroundRenderStage = BackgroundRenderStage;
export default BackgroundRenderStage;
