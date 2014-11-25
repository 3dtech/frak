/** Renderer baseclass. Essentially Renderer classes are for containing ready-made buffers
  that are used straight for rendering. To render many at once add them to DynamicSpace. */
var Renderer=Class.extend({
	/** Constructor
		@param matrix Matrix applied to anything rendered
		*/
	init: function(matrix) {
		this.matrix=matrix;											///< Usually updated automatically by the component
		this.layer=1;												///< Usually updated automatically by the component
		this.visible=true;											///< Usually updated automatically by the component
		this.castShadows=true;										///< Usually updated automatically by the component
		this.transparent=false; 									///< Value must be set to true to have renderer passed through transparent pipeline

		this.localBoundingBox=new BoundingBox();
		this.localBoundingSphere=new BoundingSphere();
		this.globalBoundingBox=new BoundingBox();
		this.globalBoundingSphere=new BoundingSphere();
		this.cacheMatrix=mat4.create();
	},

	// Methods
	/** Rendering function that calls onRender method doing the actual rendering
		@param context Instance of RenderingContext
		@param pass Rendering pass */
	render: function(context, pass) {
		this.onRender(context, pass);
	},

	/** Rendering function that calls onRenderGeometry method doing the actual rendering.
		Used to render plain geometry with given shader.
		@param context Instance of RenderingContext
		@param shader Instance of Shader */
	renderGeometry: function(context, shader) {
		this.onRenderGeometry(context, shader);
	},

	/**
	 * Returns default uniforms used commonly for everything.
	 * @param context Instance of RenderingContext
	 * @param uniforms Optional previously allocated uniforms object that the values will be written to.
	 */
	getDefaultUniforms: function(context, uniforms) {
		if (!uniforms)
			uniforms = {};

		if ('model' in uniforms) mat4.copy(uniforms.model.value, this.matrix);
		else uniforms.model = new UniformMat4(this.matrix);

		if ('modelview' in uniforms) mat4.copy(uniforms.modelview.value, context.modelview.top());
		else uniforms.modelview = new UniformMat4(context.modelview.top());

		if ('modelviewInverse' in uniforms) mat4.invert(uniforms.modelviewInverse.value, context.modelview.top());
		else uniforms.modelviewInverse = new UniformMat4(mat4.invert(mat4.create(), context.modelview.top()));

		if ('projection' in uniforms) mat4.copy(uniforms.projection.value, context.projection.top());
		else uniforms.projection = new UniformMat4(context.projection.top());

		if (context.camera) {
			if ('view' in uniforms) mat4.copy(uniforms.view.value, context.camera.viewMatrix);
			else uniforms.view = new UniformMat4(context.camera.viewMatrix);

			if ('viewInverse' in uniforms) mat4.copy(uniforms.viewInverse.value, context.camera.viewInverseMatrix);
			else uniforms.viewInverse = new UniformMat4(context.camera.viewInverseMatrix);

			if (context.camera.near) {
				if ('zNear' in uniforms) uniforms.zNear.value = context.camera.near;
				else uniforms.zNear = new UniformFloat(context.camera.near);
			}
			if (context.camera.far) {
				if ('zFar' in uniforms) uniforms.zFar.value = context.camera.far;
				else uniforms.zFar = new UniformFloat(context.camera.far);
			}
		}

		// Light uniforms
		if (context.light && context.light.uniforms) {
			uniforms.lightDirection = context.light.uniforms.lightDirection;
			uniforms.lightColor = context.light.uniforms.lightColor;
			uniforms.lightIntensity = context.light.uniforms.lightIntensity;
		}

		// Shadow uniforms
		if (context.shadow) {
			uniforms.linearDepthConstant = context.shadow.linearDepthConstant;
			uniforms.lightView = context.shadow.lightView;
			uniforms.lightProjection = context.shadow.lightProjection;
			uniforms.shadowIntensity = context.shadow.shadowIntensity;
		}

		return uniforms;
	},

	getGlobalSamplers: function(context) {
		var samplers = [];
		if (context.shadow) {
			samplers.push(context.shadow.shadow0);
		}
		return samplers;
	},

	/** Updates matrix and global bounding volumes */
	setMatrix: function(matrix) {
		this.matrix=matrix;
		this.updateGlobalBoundingVolumes();
	},

	/** Updates global bounding volumes */
	updateGlobalBoundingVolumes: function() {
		this.globalBoundingBox=this.localBoundingBox.transform(this.matrix);
		this.globalBoundingSphere=this.localBoundingSphere.transform(this.matrix);
	},

	// Events
	/** Called when render is called
		@param context Instance of RenderingContext
		@param pass Rendering pass */
	onRender: function(context, pass) {},

	/** Called when renderGeometry is called
		@param context Instance of RenderingContext
		@param shader Instance of Shader */
	onRenderGeometry: function(context, shader) {}
});