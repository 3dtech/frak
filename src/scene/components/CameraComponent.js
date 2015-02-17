/** Camera component */
var CameraComponent=Component.extend({
	init: function(viewMatrix, projectionMatrix) {
		if(!viewMatrix || !projectionMatrix) {
			throw "CameraComponent can be initialized only with given viewMatrix and projectionMatrix. Normally one should create OrthoCamera or PerspectiveCamera instead";
		}
		this._super();
		this.camera = new Camera(viewMatrix, projectionMatrix, new PostProcessRenderStage());
	},

	excluded: function() {
		return this._super().concat(["camera"]);
	},

	type: function() {
		return "CameraComponent";
	},

	/** Called when component is added to a node that is in the scene or
		if node is added to the scene
		@param node Parent {Node} */
	onAddScene: function(node) {
		node.scene.cameras.push(this.camera);
		node.scene.cameras.sort(function(a,b) { return a.order-b.order; });
		this.useCameraViewMatrix();
	},

	/** Called when component is removed from a node that is in the scene or
		if parent node is removed to the scene
		@param node Parent {Node} */
	onRemoveScene: function(node) {
		var cameras = node.scene.cameras;
		for (var i=0; i<cameras.length; i++) {
			if (cameras[i]==this.camera) {
				cameras.splice(i, 1);
				i--;
			}
		}
	},

	onStart: function(context, engine) {
		if (this.camera.target instanceof TargetScreen) {
			var pos = context.canvas.parent().position();
			this.camera.target.setPosition(pos.left, pos.top);
			this.camera.target.setSize(context.canvas.width(), context.canvas.height());
		}

		if (engine.options.renderer == 'forward') {
			if (engine.options.transparencyMode == 'blended' || engine.options.transparencyMode == 'stochastic') {
				this.camera.renderStage.addStage(new OITPostProcess());
			}

			if (engine.options.ssao === true) {
				this.camera.renderStage.addStage(new SSAOPostProcess());
			}
		}
		else if (engine.options.renderer == 'deferred') {
			delete this.camera.renderStage;
			this.camera.renderStage = new DeferredRenderStage();
		}

		if (engine.options.antialias === true) {
			this.camera.renderStage.addStage(new AntiAliasPostProcess());
		}

		this.camera.renderStage.start(context, engine, this.camera);
	},

	/** Set actual camera matrix
		@param absolute Absolute matrix used next frame. Instance of {mat4}. */
	onUpdateTransform: function(absolute) {
		if(!this.node.transform) return;
		mat4.invert(this.camera.viewMatrix, this.node.transform.absolute);
	},

	/** Sets camera transform to look at given target position
		@param target Instance of {vec3}
		@param up Up vector for camera [optional]. Instance of {vec3}. */
	lookAt: function(target, up) {
		if(!up) up=[0.0, 1.0, 0.0];

		// Set camera viewmatrix to look at given target
		mat4.lookAt(this.camera.viewMatrix, this.camera.getPosition(), target, up);
		this.useCameraViewMatrix();
	},

	/** Sets camera transform to position camera at the given point
		@param position Instance of {vec3} */
	setPosition: function(position) {
		this.camera.setPosition(position);
		this.useCameraViewMatrix();
	},

	/** Pans the camera on the current view plane so that
		the given point is at the center of the camera's view.
		@param point Instance of {vec3} */
	center: function(point) {
		this.camera.center(point);
		this.useCameraViewMatrix();
	},

	/** Fits a BoundingBox or a BoundingSphere to view.
		@param boundingVolume Instance of {BoundingBox} or {BoundingSphere}
	 */
	fitToView: function(boundingVolume) {
		this.camera.fitToView(boundingVolume);
		this.useCameraViewMatrix();
	},

	/** Fits node bounding-box (merged bounding box of all
		MeshComponent boundig-boxes) to view
		@param node Instance of {Node} */
	fitNodeToView: function(node) {
		var bounds = new BoundingBox();
		node.onEachChild(function(subnode) {
			if (subnode.getComponent(MeshComponent)) {
				var meshComponent = subnode.getComponent(MeshComponent);
				bounds.encapsulateBox(meshComponent.mesh.boundingBox.transform(subnode.transform.absolute));
			}
		});
		this.fitToView(bounds);
	},

	/** Transforms the screen position into a viewport position.
		@param point Instance of {vec2} in screen coordinates
		@return Instance of {vec2} in normalized viewport coordinates */
	screenPointToViewportPoint: function(point) {
		var p = vec2.create();
		var pos = vec2.create();
		if (this.camera.target instanceof TargetScreen)
			pos=this.camera.target.getPosition();
		var size = this.camera.target.getSize();
		if (Math.abs(size[0])<EPSILON || Math.abs(size[1])<EPSILON)
			return p;
		p[0]=(point[0]-pos[0])/size[0];
		p[1]=(point[1]-pos[1])/size[1];
		return p;
	},

	/** Transforms the screen position into a 3D position.
		The z parameter of the given point:
			0.0 - point on the near plane
			1.0 - point on the far plane
		@param point Instance of {vec3} (x,y in screen coordinates, z is the depth between near and far plane)
		@return Instance of {vec3} in camera view space */
	unprojectScreenPoint: function(point) {
		var size = this.node.scene.camera.target.getSize();
		var offset = vec2.create();
		var p = vec2.fromValues(point[0]-offset[0], size[1]-point[1]+offset[1]);
		if (Math.abs(size[0])<EPSILON || Math.abs(size[1])<EPSILON)
			return false;
		var pt = vec4.fromValues(
			2.0*((p[0])/size[0]) - 1.0,
			2.0*((p[1])/size[1]) - 1.0,
			2.0*point[2] - 1.0,
			1.0
		);
		var mat = mat4.mul(mat4.create(), this.camera.projectionMatrix, this.camera.viewMatrix);
		if (mat4.invert(mat, mat)) {
			vec4.transformMat4(pt, pt, mat);
			if (Math.abs(pt[3])<EPSILON)
				return false;
			pt[3]=1.0/pt[3];
			return vec3.fromValues(pt[0]*pt[3], pt[1]*pt[3], pt[2]*pt[3]);
		}
		return false;
	},

	/** Creates a {Ray} from the near plane to the far plane from a point on the screen.
		@param point Instance of {vec2}
		*/
	screenPointToRay: function(point) {
		var near = this.unprojectScreenPoint([point[0], point[1], 0.0]);
		var far = this.unprojectScreenPoint([point[0], point[1], 1.0]);
		if (near && far)
			return new Ray(near, far);
		return false;
	},

	/** Uses camera view matrix for absolute transform matrix and calculates relative transform, if parent node is available */
	useCameraViewMatrix: function() {
		if(!this.node.transform) return;
		// Construct new absolute position from inverse camera viewmatrix
		this.node.transform.absolute=mat4.invert(mat4.create(), this.camera.viewMatrix);

		// Calculate new relative transform matrix based on parent absolute and this node absolute matrix
		this.node.calculateRelativeFromAbsolute();
	}
});
