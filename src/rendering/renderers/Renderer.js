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

	/** Returns default uniforms used commonly for everything */
	getDefaultUniforms: function(context) {
		var date=new Date();
		var time=date.getTime(); // Pass time for time-requiring shaders

		var uniforms = {
			"time": new UniformFloat(time),
			"model": new UniformMat4(this.matrix),
			"modelview": new UniformMat4(context.modelview.top()),
			"modelviewInverse": new UniformMat4(mat4.invert(mat4.create(), context.modelview.top())),
			"projection": new UniformMat4(context.projection.top())
		};

		if (context.camera) {
			uniforms.view = new UniformMat4(context.camera.viewMatrix);
			uniforms.viewInverse = new UniformMat4(context.camera.viewInverseMatrix);
			if (context.camera.near)
				uniforms.zNear = new UniformFloat(context.camera.near);
			if (context.camera.far)
				uniforms.zFar = new UniformFloat(context.camera.far);
		}

		if (context.light) {
			uniforms.lightDirection=new UniformVec3(context.light.direction);
			uniforms.lightColor=new UniformColor(context.light.color);
			uniforms.lightIntensity=new UniformFloat(context.light.intensity);
		}

		if (context.shadow) {
			uniforms.linearDepthConstant=context.shadow.linearDepthConstant;
			uniforms.lightView=context.shadow.lightView;
			uniforms.lightProjection=context.shadow.lightProjection;
			uniforms.shadowIntensity=context.shadow.shadowIntensity;
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