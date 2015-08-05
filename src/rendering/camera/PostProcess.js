/**
 * Base class for creating image space post-processing render stages.
 */
var PostProcess = RenderStage.extend({
	init: function() {
		this._super();
		this.material = false;
	},

	onPostRender: function(context, scene, camera) {
		if (!(this.parent instanceof PostProcessRenderStage))
			throw "PostProcess can only be the sub-stage of a PostProcessRenderStage";
		if (!this.material)
			throw "PostProcess must have a material defined"

		this.parent.dst.bind(context);
		this.parent.renderEffect(context, this.material, this.parent.srcSampler);
		this.parent.dst.unbind(context);
		this.parent.swapBuffers();
	}
});
