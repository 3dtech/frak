import RenderStage from './RenderStage';
import RenderingContext from 'rendering/RenderingContext';
import MainRenderStage from './MainRenderStage';
import Camera from '../Camera';
import Scene from "scene/Scene";

/**
 * Deferred shading light accumulation pass
 */
class PBRRenderStage extends RenderStage {
	parent: MainRenderStage;

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		var gl = context.gl;

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.parent.gbuffer.depth);

		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(false);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0x00);

		gl.stencilFunc(gl.EQUAL, 1, 0xFF);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		var gl = context.gl;

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, null);
	}
}

globalThis.PBRRenderStage = PBRRenderStage;
export default PBRRenderStage;
