/** Render-stages can be used to model complex rendering pipelines.
	They are recursive - each render-stage can have be composed of sub render-stages.
	This allows for creating combined render-stages that use results of child-render
	stages to provide output. */
var RenderStage=Class.extend({
	/** Constructor */
	init: function() {
		this.parent = false; ///< Parent RenderStage
		this.substages = [];
		this.started = false;
	},

	/** Adds a substage to this RenderStage.
		@param stage Instance of {RenderStage} */
	addStage: function(stage) {
		stage.parent=this;
		this.substages.push(stage);
		return stage;
	},

	/** Removes a substage from this RenderStage.
		@param stage Instance of {RenderStage} */
	removeStage: function(stage) {
		for (var i=0; i<this.substages.length; i++) {
			if (this.substages[i]===stage) {
				stage.parent=false;
				this.substages.splice(i, 1);
				return true;
			}
		}
		return false;
	},

	removeStagesByType: function(stageType) {
		var removed=[];
		for (var i=0; i<this.substages.length; i++) {
			if (this.substages[i] instanceof stageType) {
				removed.push(this.substages[i]);
				this.substages.splice(i, 1);
				i--;
			}
		}
		for (var i in removed) {
			removed[i].parent = false;
		}
		return removed;
	},

	clearStages: function() {
		this.substages = [];
	},

	// Methods
	/** Performs initialization tasks on this render stage and its substages that
		require rendering context or engine (for loading additional assets). */
	start: function(context, engine, camera) {
		this.started = true;
		this.onStart(context, engine, camera);
		for(var stage in this.substages) this.substages[stage].start(context, engine, camera);
	},

	/** Renders this stage and substages */
	render: function(context, scene, camera) {
		this.onPreRender(context,  scene, camera);
		for(var stage in this.substages) {
			if (!this.substages[stage].started)
				this.substages[stage].start(context, scene.engine, camera);
			this.substages[stage].render(context, scene, camera);
		}
		this.onPostRender(context, scene, camera);
	},

	// Events
	/** Called immediately after engine has been started.
		Loading of render stage specific shaders and other precomputations can be done during this call. */
	onStart: function(context, engine, camera) {},

	/** Called before rendering substages of this render-stage.
		The target of this render-stage is bound. */
	onPreRender: function(context, scene, camera) {},

	/** Called after rendering substages of this render-stage.
		The target of this render-stage is bound. */
	onPostRender: function(context, scene, camera) {}
});