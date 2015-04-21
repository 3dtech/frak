/** Camera is used to render to render target.
	@param viewMatrix Camera view matrix {mat4}
	@param projectionMatrix Camera projection matrix {mat4}
	@param renderStage Render stage used by camera to render the geometry {RenderStage}
	@param target Render target that can be either TargetScreen or TargetTexture {RenderTarget}
	@param backgroundColor Clear color of background {Color}
	@param order Rendering index of this camera. Cameras are rendered from lowest to highest {int}
	@param layerMask Bitmask for setting layers rendered by this camera {int}
 */
var Camera=Serializable.extend({
	/** Constructor */
	init: function(viewMatrix, projectionMatrix, renderStage) {
		this.viewMatrix = viewMatrix;
		this.projectionMatrix = projectionMatrix;
		this.viewInverseMatrix = mat4.create();
		mat4.invert(this.viewInverseMatrix, this.viewMatrix);
		this.renderStage = renderStage;
		this.target = new TargetScreen();
		this.backgroundColor = new Color(0.0, 0.0, 0.0, 0.0); ///< The background color used for clearing the color buffer (alpha 0.0 means that color buffer will not be cleared)
		this.clearMask = false;
		this.order = 0; ///< Cameras are rendered in succession from lowest to highest order
		this.layerMask = 0xFFFFFFFF; ///< Set bits for which layers are rendered with this camera
		this.frustum = false; // TODO: implement frustum
	},

	type: function() {
		return "Camera";
	},

	excluded: function() {
		return ["renderStage", "target"];
	},

	/** Starts rendering with camera setting up projection and view matrices */
	startRender: function(context) {
		// Uses projection matrix
		context.projection.push();
		context.projection.multiply(this.projectionMatrix);

		// Use view matrix
		context.modelview.push();
		context.modelview.multiply(this.viewMatrix);

		mat4.invert(this.viewInverseMatrix, this.viewMatrix);

		context.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
		context.gl.clearDepth(1.0);
		context.gl.depthMask(true);

		if(this.clearMask===false) {
			context.gl.clear(context.gl.COLOR_BUFFER_BIT | context.gl.DEPTH_BUFFER_BIT);
		}
		else {
			context.gl.clear(this.clearMask);
		}
	},

	/** Ends rendering with camera popping projection and view matrices */
	endRender: function(context) {
		context.modelview.pop();
		context.projection.pop();
	},

	/** Renders the contents of this camera using assigned render-stage */
	render: function(context, scene) {
		// Render root render-stage assigned to this camera
		context.camera=this;
		this.renderStage.render(context, scene, this);
		context.camera=false;
	},

	/** Returns the current vertical field of view (in radians).
		Note that this function assumes that a perspective projection has been used.
		@return The current vertical field of view in radians {float} */
	getFieldOfView: function() {
		return 2.0*Math.atan(1.0/this.projectionMatrix[5]);
	},

	/** Returns camera direction.
		@param out Instance of {vec3} (optional)
		@return Camera direction. Instance of {vec3} */
	getDirection: function(out) {
		if (!out)
			out=vec3.create();
		out[0]=-this.viewMatrix[2];
		out[1]=-this.viewMatrix[6];
		out[2]=-this.viewMatrix[10];
		return out;
	},

	/** Returns camera world position.
		@param out Instance of {vec3} (optional)
		@return Camera world position. Instance of {vec3} */
	getPosition: function(out) {
		if (!out)
			out=vec3.create();
		mat4.translation(out, this.viewInverseMatrix);
		return out;
	},

	/** Sets camera view matrix to position camera at the given point
		@param position Instance of {vec3} */
	setPosition: function(position) {
		var p = this.getPosition();
		vec3.sub(p, p, position); // inverted relative translation vector
		var m = mat4.fromTranslation(mat4.create(), p);
		mat4.mul(this.viewMatrix, this.viewMatrix, m);
	},

	/** Pans the camera on the current view plane so that
		the given point is at the center of the camera's view.
		@param point Instance of {vec3} */
	center: function(point) {
		var dir = this.getDirection();
		var pos = this.getPosition();
		var plane = new Plane();
		plane.setByNormalAndPoint(dir, pos);
		var p = plane.projectToPlane(point);
		this.setPosition(p);
	},

	/** Fits a BoundingBox or a BoundingSphere to view.
		@param boundingVolume Instance of {BoundingSphere} or {BoundingBox} */
	fitToView: function(boundingVolume) {
		if (!(boundingVolume instanceof BoundingVolume) || !boundingVolume.center)
			return;

		this.center(boundingVolume.center);
		if (boundingVolume.isPoint())
			return;

		var size = 0.0;
		if (boundingVolume instanceof BoundingSphere) {
			size = boundingVolume.radius*2.0;
		}
		else if (boundingVolume instanceof BoundingBox) {
			// Note: An alternative solution that would result in a tighter fit would be
			// to project the AABB vertices onto the camera plane and find the width/height
			// of the bounging rectangle for the projected vertices.
			size = boundingVolume.getOuterSphereRadius()*2.0;
		}

		var distance = size / Math.sin(this.getFieldOfView()/2.0) - size;
		var dir = this.getDirection();
		var pos = vec3.create();
		vec3.scale(dir, dir, -distance);
		vec3.add(pos, boundingVolume.center, dir);
		this.setPosition(pos);
	}
});