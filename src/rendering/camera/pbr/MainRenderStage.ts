import RenderingContext from "rendering/RenderingContext";
import Camera from "../Camera";
import RenderStage from "../RenderStage";
import TargetTextureMulti from "../TargetTextureMulti";
import BuffersRenderStage from "./BuffersRenderStage";
import RendererOrganizer from "../RendererOrganizer";
import PBRLightsRenderStage from "./PBRLightsRenderStage";
import PBRPipeline from "../PBRPipeline";
import TonemapRenderStage from "./TonemapRenderStage";
import Sampler from "../../shaders/Sampler";
import UniformVec3 from "../../shaders/UniformVec3";
import EmissiveRenderStage from "./EmissiveRenderStage";
import BackgroundRenderStage from "./BackgroundRenderStage";
import TransparentRenderStage from "./TransparentRenderStage";
import Scene from "../../../scene/Scene";
import Renderer from "../../renderers/Renderer";
import TargetTextureFloat from "../TargetTextureFloat";
import Engine from "../../../engine/Engine";
import TargetTexture from "../TargetTexture";

class BindDstTarget extends RenderStage {
	render(context: RenderingContext, _: any, camera: Camera) {
		camera.renderStage.dst.bind(context);
	}
}

class UnbindDstTarget extends RenderStage {
	render(context: RenderingContext, _: any, camera: Camera) {
		camera.renderStage.dst.unbind(context);
		camera.renderStage.swapBuffers();
	}
}

class MainRenderStage extends RenderStage {
	gbuffer: TargetTextureMulti;
	parent: PBRPipeline;
	oitAccum: TargetTextureFloat;
	oitReveal: TargetTexture;
	size = vec2.create();
	sharedSamplers: Sampler[] = [];
	oitSamplers: Sampler[] = [];
	filteredRenderers: Renderer[] = [];
	emissiveStage: EmissiveRenderStage;

	constructor() {
		super();

		this.addStage(new BuffersRenderStage());

		this.addStage(new BindDstTarget());
		this.addStage(new PBRLightsRenderStage());
		this.addStage(new UnbindDstTarget());

		this.addStage(new BindDstTarget());
		this.addStage(new BackgroundRenderStage());
		this.addStage(new TonemapRenderStage());
		this.addStage(new TransparentRenderStage());
		this.emissiveStage = this.addStage(new EmissiveRenderStage()).disable();
		this.addStage(new UnbindDstTarget());
	}

	onStart(context: RenderingContext, engine: Engine, camera: Camera) {
		const gl = context.gl;

		vec2.copy(this.size, this.parent.size);
		const numTargets = engine.options.emissiveEnabled ? 4 : 3;
		this.gbuffer = new TargetTextureMulti(context, this.size, {numTargets, stencil: true});

		this.sharedSamplers.push(new Sampler('colorMetallic', this.gbuffer.targets[0]));
		this.sharedSamplers.push(new Sampler('normalRoughness', this.gbuffer.targets[1]));
		this.sharedSamplers.push(new Sampler('positionOcclusion', this.gbuffer.targets[2]));

		if (engine.options.emissiveEnabled) {
			this.sharedSamplers.push(new Sampler('emissive', this.gbuffer.targets[3]));
			this.emissiveStage.enable();
		}

		// OIT
		this.oitAccum = new TargetTextureFloat(this.size, context, false);
		this.oitAccum.bind(context);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.gbuffer.depth);
		this.oitReveal = new TargetTexture(this.size, context, false);
		this.oitReveal.bind(context);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.gbuffer.depth);
		this.oitReveal.unbind(context);

		this.oitSamplers.push(new Sampler('oitAccum', this.oitAccum.texture));
		this.oitSamplers.push(new Sampler('oitReveal', this.oitReveal.texture));
	}

	onPreRender(context: any, scene: Scene, camera: any) {
		scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask, this.filteredRenderers);
	}
}

globalThis.MainRenderStage = MainRenderStage;
export default MainRenderStage;
