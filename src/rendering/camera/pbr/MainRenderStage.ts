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

class BindCameraTarget extends RenderStage {
	render(context: RenderingContext, _: any, camera: Camera) {
		camera.target.bind(context);
	}
}

class UnbindCameraTarget extends RenderStage {
	render(context: RenderingContext, _: any, camera: Camera) {
		camera.target.unbind(context);
	}
}

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
	organizer = new RendererOrganizer();
	size = vec2.create();
	sharedSamplers: Sampler[] = [];
	sharedUniforms = {
		cameraPosition: new UniformVec3(vec3.create()),
	};

	constructor() {
		super();

		this.addStage(new BuffersRenderStage());

		this.addStage(new BindDstTarget());
		this.addStage(new PBRLightsRenderStage());
		this.addStage(new UnbindDstTarget());

		this.addStage(new BindDstTarget());
		this.addStage(new BackgroundRenderStage());
		this.addStage(new TonemapRenderStage());
		this.addStage(new EmissiveRenderStage());
		this.addStage(new UnbindDstTarget());
	}

	onStart(context: any, engine: any, camera: any) {
		vec2.copy(this.size, this.parent.size);
		this.gbuffer = new TargetTextureMulti(context, this.size, {numTargets: 4, stencil: true});

		this.sharedSamplers.push(new Sampler('color', this.gbuffer.targets[0]));
		this.sharedSamplers.push(new Sampler('normalMetallic', this.gbuffer.targets[1]));
		this.sharedSamplers.push(new Sampler('positionRoughness', this.gbuffer.targets[2]));
		this.sharedSamplers.push(new Sampler('emissiveOcclusion', this.gbuffer.targets[3]));
	}

	onPreRender(context: any, scene: any, camera: any) {
		camera.getPosition(this.sharedUniforms.cameraPosition.value);

		this.organizer.sort(scene.engine, scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask));
	}
}

globalThis.MainRenderStage = MainRenderStage;
export default MainRenderStage;