import Material from "../../materials/Material";
import ShaderDescriptor from "../../../scene/descriptors/ShaderDescriptor";
import RenderStage from "../RenderStage";
import RenderingContext from "../../RenderingContext";
import Engine from "../../../engine/Engine";
import Camera from "../Camera";

class TonemapRenderStage extends RenderStage {
	material: Material;

	onStart(context: RenderingContext, engine: Engine, camera: Camera): any {
		this.material = new Material(
			engine.assetsManager.shadersManager.addDescriptor(
				new ShaderDescriptor('shaders/uv.vert', 'shaders/tonemap.frag')
			),
			{},
			[]
		);

		engine.assetsManager.load();
	}

	onPostRender(context, scene, camera): any {
		var gl = context.gl;

		this.parent.parent.dst.bind(context);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.parent.gbuffer.depth);

		gl.disable(gl.DEPTH_TEST);
		gl.depthMask(false);

		gl.enable(gl.STENCIL_TEST);
		gl.stencilMask(0x00);

		gl.stencilFunc(gl.EQUAL, 1, 0xFF);

		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);

		this.parent.parent.screenQuad.render(context, this.material, this.parent.parent.srcSampler);

		gl.stencilMask(0xFF);
		gl.disable(gl.STENCIL_TEST);

		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, null);
		this.parent.parent.dst.unbind(context);
		this.parent.parent.swapBuffers();
	}
}

globalThis.TonemapRenderStage = TonemapRenderStage;
export default TonemapRenderStage;
