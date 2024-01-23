import Component from 'scene/components/Component';
import Camera from 'rendering/camera/Camera';
import BoundingBox from 'scene/geometry/BoundingBox';
import MeshComponent from 'scene/components/MeshComponent';
import Ray from 'scene/geometry/Ray';
import AntiAliasPostProcess from 'rendering/camera/AntiAliasPostProcess';
import RenderingContext from "../../rendering/RenderingContext";

/** Camera component */
class CameraComponent extends Component {
	camera: Camera;
	session?: XRSession;

	constructor(viewMatrix, projectionMatrix) {
		if(!viewMatrix || !projectionMatrix) {
			throw "CameraComponent can be initialized only with given viewMatrix and projectionMatrix. Normally one should create OrthoCamera or PerspectiveCamera instead";
		}
		super();
		this.camera = new Camera(viewMatrix, projectionMatrix);
	}

	excluded(): any {
		return super.excluded().concat(["camera"]);
	}

	type(): any {
		return "CameraComponent";
	}

	/** Called when component is added to a node that is in the scene or
		if node is added to the scene
		@param node Parent {Node} */
	onAddScene(node): any {
		if (node.scene.cameraComponent === this) {
			return;	// We get rendered anyway
		}

		node.scene.cameras.push(this);
		node.scene.cameras.sort(function(a,b) { return a.camera.order-b.camera.order; });
		this.useCameraViewMatrix();
	}

	/** Called when component is removed from a node that is in the scene or
		if parent node is removed to the scene
		@param node Parent {Node} */
	onRemoveScene(node): any {
		if (node.scene.cameraComponent === this) {
			return;
		}

		var cameras = node.scene.cameras;
		for (var i=0; i<cameras.length; i++) {
			if (cameras[i]==this) {
				cameras.splice(i, 1);
				i--;
			}
		}
	}

	onStart(context, engine): any {
		this.initRenderStage(context, engine);
	}

	/** Set actual camera matrix
		@param absolute Absolute matrix used next frame. Instance of {mat4}. */
	onUpdateTransform(absolute): any {
		if(!this.node.transform) return;
		mat4.invert(this.camera.viewMatrix, this.node.transform.absolute);
	}

	/** Sets camera transform to look at given target position
		@param target Instance of {vec3}
		@param up Up vector for camera [optional]. Instance of {vec3}. */
	lookAt(target, up): any {
		if(!up) up=[0.0, 1.0, 0.0];

		// Set camera viewmatrix to look at given target
		mat4.lookAt(this.camera.viewMatrix, this.camera.getPosition(), target, up);
		this.useCameraViewMatrix();
	}

	/** Sets camera transform to position camera at the given point
		@param position Instance of {vec3} */
	setPosition(position): any {
		this.camera.setPosition(position);
		this.useCameraViewMatrix();
	}

	/** Pans the camera on the current view plane so that
		the given point is at the center of the camera's view.
		@param point Instance of {vec3} */
	center(point): any {
		this.camera.center(point);
		this.useCameraViewMatrix();
	}

	/** Fits a BoundingBox or a BoundingSphere to view.
		@param boundingVolume Instance of {BoundingBox} or {BoundingSphere}
	 */
	fitToView(boundingVolume): any {
		this.camera.fitToView(boundingVolume);
		this.useCameraViewMatrix();
	}

	/** Fits node bounding-box (merged bounding box of all
		MeshComponent boundig-boxes) to view
		@param node Instance of {Node} */
	fitNodeToView(node): any {
		var bounds = new BoundingBox();
		node.onEachChild(function(subnode) {
			if (subnode.getComponent(MeshComponent)) {
				var meshComponent = subnode.getComponent(MeshComponent);
				bounds.encapsulateBox(meshComponent.mesh.boundingBox.transform(subnode.transform.absolute));
			}
		});
		this.fitToView(bounds);
	}

	/** Transforms the screen position into a viewport position.
		@param point Instance of {vec2} in screen coordinates
		@return Instance of {vec2} in normalized viewport coordinates */
	screenPointToViewportPoint(point): any {
		var p = vec2.create();
		var pos = this.camera.target.getPosition();
		var size = this.camera.target.getSize();
		if (Math.abs(size[0])<EPSILON || Math.abs(size[1])<EPSILON)
			return p;
		p[0]=(point[0]-pos[0])/size[0];
		p[1]=(point[1]-pos[1])/size[1];
		return p;
	}

	/** Transforms the screen position into a 3D position.
		The z parameter of the given point:
			0.0 - point on the near plane
			1.0 - point on the far plane
		@param point Instance of {vec3} (x,y in screen coordinates, z is the depth between near and far plane)
		@return Instance of {vec3} in camera view space */
	unprojectScreenPoint(point): any {
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
	}

	/** Creates a {Ray} from the near plane to the far plane from a point on the screen.
		@param point Instance of {vec2}
		*/
	screenPointToRay(point): any {
		var near = this.unprojectScreenPoint([point[0], point[1], 0.0]);
		var far = this.unprojectScreenPoint([point[0], point[1], 1.0]);
		if (near && far)
			return new Ray(near, far);
		return false;
	}

	worldToScreenPoint(point, out): any {
		if (!out)
			out = vec2.create();
		var size = this.camera.target.getSize();
		var viewProj = mat4.mul(mat4.create(), this.camera.projectionMatrix, this.camera.viewMatrix);
		var projected = vec4.fromValues(point[0], point[1], point[2], 1.0);
		vec4.transformMat4(projected, projected, viewProj);
		projected[0] /= projected[3];
		projected[1] /= projected[3];
		projected[2] /= projected[3];
		out[0] = Math.round( ((projected[0] + 1.0) / 2.0) * size[0] );
		out[1] = Math.round( ((1.0 - projected[1]) / 2.0) * size[1] );
		return out;
	}

	/** Uses camera view matrix for absolute transform matrix and calculates relative transform, if parent node is available */
	useCameraViewMatrix(): any {
		if(!this.node.transform) return;
		// Construct new absolute position from inverse camera viewmatrix
		this.node.transform.absolute=mat4.invert(mat4.create(), this.camera.viewMatrix);

		// Calculate new relative transform matrix based on parent absolute and this node absolute matrix
		this.node.calculateRelativeFromAbsolute();
	}

	initRenderStage(context, engine): any {
		if (engine.scene.camera === this.camera) {
			var canvas = context.canvas;
			this.camera.target.setSize(canvas.width, canvas.height);
		}

		/* if (engine.options.renderer == 'forward') {
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
			this.camera.renderStage.addStage(new OITPostProcess());
		} */

		if (engine.options.antialias === true) {
			this.camera.renderStage.addStage(new AntiAliasPostProcess());
		}

		this.camera.renderStage.start(context, engine, this.camera);
	}

	updateFromXR(context: RenderingContext, frame: XRFrame, view: XRView) {
		const layer = frame.session.renderState.baseLayer;
		const viewport = layer.getViewport(view);
		if (viewport.width === 0 || viewport.height === 0) {
			return false;	// Needed when rendering only one eye of a stereo view to not spam console with errors
		}

		this.camera.projectionMatrix = view.projectionMatrix;
		this.camera.target.frameBuffer = layer.framebuffer;
		this.camera.target.set(viewport.x, viewport.y, viewport.width, viewport.height);
		this.camera.target.resetViewport();

		mat4.invert(this.camera.projectionInverseMatrix, this.camera.projectionMatrix);
		mat4.invert(this.camera.viewInverseMatrix, this.camera.viewMatrix);

		return true;
	}

	onContextRestored(context) {
		this.initRenderStage(context, context.engine);
	}
}

globalThis.CameraComponent = CameraComponent;
export default CameraComponent;
