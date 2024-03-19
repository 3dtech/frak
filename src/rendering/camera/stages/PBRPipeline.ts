import PostProcessRenderStage from './PostProcessRenderStage';
import RenderingContext from 'rendering/RenderingContext';
import Scene from 'scene/Scene';
import Camera from '../Camera';
import MainRenderStage from './MainRenderStage';
import DebugRenderStage from './DebugRenderStage';

class PBRPipeline extends PostProcessRenderStage {
	declare generator: MainRenderStage;
	debugActive = false;
	debugStage: DebugRenderStage;

	constructor() {
		super();

		this.debugStage = new DebugRenderStage(this.generator).disable();
	}

	getGeneratorStage() {
		return new MainRenderStage();
	}

	onStart(context, engine, camera) {
		super.onStart(context, engine, camera);

		this.debugStage.start(context, engine, camera);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		super.onPostRender(context, scene, camera);

		this.debugStage.render(context, scene, camera);
	}

	debug(v = false) {
		if (v) {
			this.debugStage.enable();
			this.debugActive = true;
		} else {
			this.debugStage.disable();
			this.debugActive = false;
		}
	}
}

globalThis.PBRPipeline = PBRPipeline;
export default PBRPipeline;
