import RenderStage from 'rendering/camera/RenderStage.js'
import TargetTexture from 'rendering/camera/TargetTexture.js'
import Sampler from 'rendering/shaders/Sampler.js'
import Material from 'rendering/materials/Material.js'
import MaterialRenderStage from 'rendering/camera/MaterialRenderStage.js'

/**
 * Render-stage used to render MaterialRenderStage to a texture,
 * then apply sub-stages to it and then render the resulting texture
 * to a screen-aligned quad that covers the entire viewport.
 */

class PostProcessRenderStage extends RenderStage {
	size: any;
	src: any;
	dst: any;
	srcSampler: any;
	dstSampler: any;
	textureQuad: any;
	screenQuad: any;
	material: any;
	generator: any;
	
	constructor() {
		super();
		this.size = false;
		this.src = false; ///< TargetTexture, once we receive context
		this.dst = false; ///< TargetTexture, once we receive context
		this.srcSampler = false; ///< Sampler for src
		this.dstSampler = false; ///< Sampler for dst
		this.textureQuad = false; ///< Quad used to render textures
		this.screenQuad = false; ///< Quad used to render to screen
		this.material = false; ///< Material used to render the final image

		this.generator = this.getGeneratorStage();
		this.generator.parent = this;
	}

	setSize(width, height): any {
		if (this.size === false)
			this.size = vec2.create();
		this.size[0]=width;
		this.size[1]=height;
	}

	getGeneratorStage(): any {
		return new MaterialRenderStage();
	}

	onStart(context, engine, camera): any {
		if (!this.size) {
			this.size = vec2.clone(camera.target.size);
		}

		this.src = new TargetTexture(this.size, context, false, true);
		this.srcSampler = new Sampler('src', this.src.texture);

		this.dst = new TargetTexture(this.size, context, false, true);
		this.dstSampler = new Sampler('src', this.dst.texture);

		this.material = new Material(
			// engine.assetsManager.addShaderSource("shaders/default/ScreenQuad"),
			engine.assetsManager.addShaderSource(engine.assetsManager.shadersManager.bundle('ScreenQuad')),
			{}
			[]
		);
		this.material.name = 'To Screen';

		this.textureQuad = new ScreenQuad(context);
		this.screenQuad = new ScreenQuad(context);

		engine.assetsManager.load();

		this.generator.start(context, engine, camera);
	},

	onPreRender(context, scene, camera): any {
		var cameraTarget = camera.target;

		this.src.resetViewport();
		this.dst.resetViewport();

		if (cameraTarget.size[0] != this.src.size[0] || cameraTarget.size[1] != this.src.size[1]) {
			this.setSize(cameraTarget.size[0], cameraTarget.size[1]);
			this.src.setSize(cameraTarget.size[0], cameraTarget.size[1]);
			this.dst.setSize(cameraTarget.size[0], cameraTarget.size[1]);
		}

		if (this.substages.length>0) {
			camera.target = this.src;
		}

		this.generator.render(context, scene, camera);
		camera.target = cameraTarget;
	}

	onPostRender(context, scene, camera): any {
		if (this.substages.length == 0)
			return;

		if (camera.target instanceof TargetTexture) {
			camera.target.bind(context);
			this.renderEffect(context, this.material, this.srcSampler);
			camera.target.unbind(context);
		}
		else {
			camera.target.bind(context);
			this.renderEffect(context, this.material, this.srcSampler, true);
			camera.target.unbind(context);
		}

		this.swapBuffers();
	}

	swapBuffers(): any {
		var tmpTexture = this.src;
		var tmpSampler = this.srcSampler;
		this.src = this.dst;
		this.srcSampler = this.dstSampler;
		this.dst = tmpTexture;
		this.dstSampler = tmpSampler;
	}

	renderEffect(context, material, sampler, renderToScreen) {
		var gl = context.gl;
		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		if (renderToScreen === true)
			this.screenQuad.render(context, material, sampler);
		else
			this.textureQuad.render(context, material, sampler);
	}

}

globalThis.PostProcessRenderStage = PostProcessRenderStage;

export default PostProcessRenderStage;