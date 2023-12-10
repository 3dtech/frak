import RenderingContext from "rendering/RenderingContext";
import Engine from "engine/Engine";
import Camera from "../Camera";
import Scene from "scene/Scene";

/** Render-stages can be used to model complex rendering pipelines.
	They are recursive - each render-stage can have be composed of sub render-stages.
	This allows for creating combined render-stages that use results of child-render
	stages to provide output. */
class RenderStage {
	parent: any;
	substages: RenderStage[] = [];
	started = false;
	enabled = true;

	/** Constructor */
	constructor() {
		this.parent = false; ///< Parent RenderStage
	}

	/** Adds a substage to this RenderStage.
		@param stage Instance of {RenderStage} */
	addStage<T extends RenderStage>(stage: T): T {
		stage.parent=this;
		this.substages.push(stage);
		return stage;
	}

	/** Removes a substage from this RenderStage.
		@param stage Instance of {RenderStage} */
	removeStage(stage: RenderStage): boolean {
		for (var i=0; i<this.substages.length; i++) {
			if (this.substages[i]===stage) {
				stage.parent=false;
				this.substages.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	/** Removes all sub-stages of type stageType. */
	removeStagesByType(stageType): RenderStage[] {
		var removed: RenderStage[] = [];
		for (var i=0; i<this.substages.length; i++) {
			if (this.substages[i] instanceof stageType) {
				removed.push(this.substages[i]);
				this.substages.splice(i, 1);
				i--;
			}
		}
		for (var i=0; i<removed.length; i++) {
			removed[i].parent = false;
		}
		return removed;
	}

	/** Removes all sub-stages. */
	clearStages() {
		for (var i=0; i<this.substages.length; i++) {
			this.substages[i].parent = false;
		}
		this.substages = [];
	}

	/** Returns the first sub-stage of type stageType. */
	getStageByType(stageType): any {
		for (var i=0; i<this.substages.length; i++) {
			if (this.substages[i] instanceof stageType)
				return this.substages[i];
		}
		return false;
	}

	// Methods
	/** Performs initialization tasks on this render stage and its substages that
		require rendering context or engine (for loading additional assets). */
	start(context, engine, camera) {
		this.started = true;
		this.onStart(context, engine, camera);
		for (var i=0; i<this.substages.length; i++)
			this.substages[i].start(context, engine, camera);
	}

	/** Renders this stage and substages */
	render(context: RenderingContext, scene: Scene, camera: Camera) {
		if (!this.enabled)
			return;

		this.onPreRender(context,  scene, camera);

		for (var i=0; i<this.substages.length; i++) {
			if (!this.substages[i].started)
				this.substages[i].start(context, scene.engine, camera);
			this.substages[i].render(context, scene, camera);
		}

		this.onPostRender(context, scene, camera);
	}

	/** Enables this render stage. */
	enable(): this {
		this.enabled = true;
		this.onEnable();
		return this;
	}

	/** Disables this render stage. */
	disable(): this {
		this.enabled = false;
		this.onDisable();
		return this;
	}

	// Events
	/** Called immediately after engine has been started.
		Loading of render stage specific shaders and other precomputations can be done during this call. */
	onStart(context: RenderingContext, engine: Engine, camera: Camera) {}

	/** Called before rendering substages of this render-stage.
		The target of this render-stage is bound. */
	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {}

	/** Called after rendering substages of this render-stage.
		The target of this render-stage is bound. */
	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {}

	/** Called when the render stage is enabled. */
	onEnable() {}

	/** Called when the render stage is disabled. */
	onDisable() {}
}

globalThis.RenderStage = RenderStage;
export default RenderStage;
