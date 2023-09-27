import RenderingContext from "rendering/RenderingContext";
import Camera from "../Camera";
import RenderStage from "../RenderStage";
import TargetTextureMulti from "../TargetTextureMulti";
import BuffersRenderStage from "./BuffersRenderStage";
import RendererOrganizer from "../RendererOrganizer";
import PBRLightsRenderStage from "./PBRLightsRenderStage";
import OITRenderStage from "../OITRenderStage";

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

class MainRenderStage extends RenderStage {
	gbuffer: TargetTextureMulti;
	organizer = new RendererOrganizer();
	size = vec2.create();

	constructor() {
		super();

		this.addStage(new OITRenderStage());
		this.addStage(new BuffersRenderStage());
		this.addStage(new BindCameraTarget());
		this.addStage(new PBRLightsRenderStage());
		this.addStage(new UnbindCameraTarget());
	}

	onStart(context: any, engine: any, camera: any) {
		vec2.copy(this.size, this.parent.size);
		this.gbuffer = new TargetTextureMulti(context, this.size, {numTargets: 4, stencil: true});
	}

	onPreRender(context: any, scene: any, camera: any) {
		this.organizer.sort(scene.engine, scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask));
	}
}

globalThis.MainRenderStage = MainRenderStage;
export default MainRenderStage;
