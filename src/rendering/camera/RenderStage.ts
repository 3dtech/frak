

/** Render-stages can be used to model complex rendering pipelines.
	They are recursive - each render-stage can have be composed of sub render-stages.
	This allows for creating combined render-stages that use results of child-render
	stages to provide output. */

class RenderStage {
	parent: any;
	substages: any;
	started: any;
	enabled: any;
	
	/** Constructor */
	constructor() {
		this.parent = false; ///< Parent RenderStage
		this.substages = [];
		this.started = false;
		this.enabled = true;
	}

	/** Adds a substage to this RenderStage.
		@param stage Instance of {RenderStage} */
	addStage(stage): any {
		stage.parent=this;
		this.substages.push(stage);
		return stage;
	}

	/** Removes a substage from this RenderStage.
		@param stage Instance of {RenderStage} */
	removeStage(stage): any {
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
	removeStagesByType(stageType): any {
		var removed=[];
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
	clearStages(): any {
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
	start(context, engine, camera): any {
		this.started = true;
		this.onStart(context, engine, camera);
		for (var i=0; i<this.substages.length; i++)
			this.substages[i].start(context, engine, camera);
	}

	/** Renders this stage and substages */
	render(context, scene, camera): any {
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
	enable(): any {
		this.enabled = true;
		this.onEnable();
		return this;
	}

	/** Disables this render stage. */
	disable(): any {
		this.enabled = false;
		this.onDisable();
		return this;
	}

	// Events
	/** Called immediately after engine has been started.
		Loading of render stage specific shaders and other precomputations can be done during this call. */
	onStart(context, engine, camera): any {}

	/** Called before rendering substages of this render-stage.
		The target of this render-stage is bound. */
	onPreRender(context, scene, camera): any {}

	/** Called after rendering substages of this render-stage.
		The target of this render-stage is bound. */
	onPostRender(context, scene, camera): any {}

	/** Called when the render stage is enabled. */
	onEnable(): any {}

	/** Called when the render stage is disabled. */
	onDisable() {}

}

globalThis.RenderStage = RenderStage;

export default RenderStage;