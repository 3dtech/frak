/**
 * Deferred shading implementation
 */
var DeferredShadingRenderStage = RenderStage.extend({
	init: function() {
		this._super();
		this.organizer = new RendererOrganizer();
		this.diffuseFallback = null;
		this.size = vec2.create();
		this.invModelview = mat4.create();

		this.bindCameraTarget = {
			started: true,
			start: function() {},
			render: function(context, scene, camera) {
				camera.target.bind(context);
			}
		};

		this.unbindCameraTarget = {
			started: true,
			start: function() {},
			render: function(context, scene, camera) {
				camera.target.unbind(context);
			}
		};

		// Rendering order is defined as follows:
		this.shadowStage = this.addStage(new DeferredShadowRenderStage());
		this.oitStage = this.addStage(new OITRenderStage());
		this.gbufferStage = this.addStage(new GBufferRenderStage());
		this.softShadowsStage = this.addStage(new SoftShadowsRenderStage()).disable();
		this.addStage(this.bindCameraTarget);
		this.lightsStage = this.addStage(new LightsRenderStage());
		this.addStage(this.unbindCameraTarget);

		// Shared uniforms cache
		this.sharedUniforms = {
			"view": new UniformMat4(mat4.create()),
			"viewInverse": new UniformMat4(mat4.create()),
			"projection": new UniformMat4(mat4.create())
		};

		// Renderer uniforms cache
		// These are set to null because they are only given values of existing matrices temporarily while rendering
		this.rendererUniforms = {
			"model": new UniformMat4(null),
			"modelview": new UniformMat4(null),
			"modelviewInverse": new UniformMat4(null),
			"receiveShadows": new UniformInt(1)
		};
	},

	onStart: function(context, engine, camera) {
		this.diffuseFallback = new Sampler('diffuse0', engine.WhiteTexture);
		vec2.copy(this.size, this.parent.size);

		if (engine.options.softShadows)
			this.softShadowsStage.enable();
	},

	/** Prepares data shared among most renderers. */
	prepareShared: function(context) {
		// Inverse modelview matrix
		mat4.invert(this.invModelview, context.modelview.top());

		// Prepares view and projection uniforms; these won't change during rendering.
		mat4.copy(this.sharedUniforms.projection.value, context.projection.top());
		mat4.copy(this.sharedUniforms.view.value, context.camera.viewMatrix);
		mat4.copy(this.sharedUniforms.viewInverse.value, context.camera.viewInverseMatrix);
	},

	/** Acquires and organizes the visible renderers. */
	onPreRender: function(context, scene, camera) {
		// Prepare shared uniforms
		this.prepareShared(context);

		var renderers = scene.dynamicSpace.frustumCast(camera.frustum, camera.layerMask);
		this.organizer.sort(scene.engine, renderers, this.eyePosition);
	},

	onPostRender: function(context, scene, camera) {
	}
});