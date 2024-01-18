import Serializable from 'scene/Serializable';
import TargetScreen from 'rendering/camera/TargetScreen';
import Plane from 'scene/geometry/Plane';
import BoundingBox from 'scene/geometry/BoundingBox';
import BoundingSphere from 'scene/geometry/BoundingSphere';
import BoundingVolume from 'scene/geometry/BoundingVolume';
import Color from 'rendering/Color';
import PBRPipeline from './stages/PBRPipeline';
import RenderTarget from './RenderTarget';

/** Camera is used to render to render target.
	@param viewMatrix Camera view matrix {mat4}
	@param projectionMatrix Camera projection matrix {mat4}
	@param renderStage Render stage used by camera to render the geometry {RenderStage}
	@param target Render target that can be either TargetScreen or TargetTexture {RenderTarget}
	@param backgroundColor Clear color of background {Color}
	@param order Rendering index of this camera. Cameras are rendered from lowest to highest {int}
	@param layerMask Bitmask for setting layers rendered by this camera {int}
 */
class Camera extends Serializable {
	viewMatrix: any;
	projectionMatrix: any;
	viewInverseMatrix = mat4.create();
	projectionInverseMatrix = mat4.create();
	renderStage: PBRPipeline;
	target: RenderTarget;
	backgroundColor: any;
	clearMask: any;
	order: any;
	layerMask: any;
	frustum: any;
	stereo: any;
	stereoEyeDistance: any;
	near: number;
	far: number;
	_viewportSize: any;
	_viewportPosition: any;
	_originalViewMatrix: any;
	_eyeSeparation: any;
	_cacheQuat: any;
	_strafe: any;
	_translation: any;

	/** Constructor */
	constructor(viewMatrix, projectionMatrix) {
		super();
		this.viewMatrix = viewMatrix;
		this.projectionMatrix = projectionMatrix;
		mat4.invert(this.viewInverseMatrix, this.viewMatrix);
		mat4.invert(this.projectionInverseMatrix, this.projectionMatrix);
		this.renderStage = new PBRPipeline();
		this.target = new TargetScreen();
		this.backgroundColor = new Color(0.0, 0.0, 0.0, 0.0); ///< The background color used for clearing the color buffer (alpha 0.0 means that color buffer will not be cleared)
		this.clearMask = false;
		this.order = 0; ///< Cameras are rendered in succession from lowest to highest order
		this.layerMask = 0xFFFFFFFF; ///< Set bits for which layers are rendered with this camera
		this.frustum = false; // TODO: implement frustum

		var stereo = false;
		this.stereo = function (v) {
			if (v)
				stereo = true;
			if (v === false)
				stereo = false;
			return stereo;
		};

		var stereoEyeDistance = 2.0;
		this.stereoEyeDistance = function (v) {
			if (v)
				stereoEyeDistance = v;
			return stereoEyeDistance;
		};

		// Cache
		this._viewportSize = vec2.create();
		this._viewportPosition = vec2.create();
		this._originalViewMatrix = mat4.create();
		this._eyeSeparation = mat4.create();
		this._cacheQuat = quat.create();
		this._strafe = vec3.create();
		this._translation = vec3.create();
	}

	type(): any {
		return "Camera";
	}

	excluded(): any {
		return ["renderStage", "target"];
	}

	clearBuffers(context): any {
		context.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
		context.gl.clearDepth(1.0);
		context.gl.depthMask(true);

		if (this.clearMask === false) {
			context.gl.clear(context.gl.COLOR_BUFFER_BIT | context.gl.DEPTH_BUFFER_BIT);
		}
		else {
			context.gl.clear(this.clearMask);
		}
	}

	/** Starts rendering with camera setting up projection and view matrices */
	startRender(context): any {
		// Use projection matrix
		context.projection.push();
		context.projection.multiply(this.projectionMatrix);

		// Use view matrix
		context.modelview.push();
		context.modelview.multiply(this.viewMatrix);
	}

	/** Renders the contents of this camera using assigned render-stage */
	renderScene(context, scene, preRenderCallback, postRenderCallback): any {
		if (preRenderCallback)
			preRenderCallback(context, this);

		this.renderStage.render(context, scene, this);

		if (postRenderCallback)
			postRenderCallback(context, this);
	}

	/** Ends rendering with camera popping projection and view matrices */
	endRender(context): any {
		context.modelview.pop();
		context.projection.pop();
	}

	/** Main entrypoint for rendering the scene with this Camera */
	render(context, scene, preRenderCallback, postRenderCallback, layer: XRWebGLLayer, view: XRView) {
		const viewport = layer.getViewport(view);
		this.target.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
		this.clearBuffers(context);

		context.camera = this;

		mat4.invert(this.projectionInverseMatrix, this.projectionMatrix);

		// Update inverse view matrix
		mat4.invert(this.viewInverseMatrix, this.viewMatrix);

		this.startRender(context);
		this.renderScene(context, scene, preRenderCallback, postRenderCallback);
		this.endRender(context);

		context.camera = false;
	}

	/** Returns the current vertical field of view (in radians).
		Note that this function assumes that a perspective projection has been used.
		@return The current vertical field of view in radians {float} */
	getFieldOfView(): any {
		return 2.0*Math.atan(1.0/this.projectionMatrix[5]);
	}

	/** Returns camera direction (for perspective view).
		@param out Instance of {vec3} (optional)
		@return Camera direction. Instance of {vec3} */
	getDirection(out?): any {
		if (!out)
			out=vec3.create();
		out[0]=-this.viewMatrix[8];
		out[1]=-this.viewMatrix[9];
		out[2]=-this.viewMatrix[10];
		return out;
	}

	/** Returns camera up vector (for perspective view).
		@param out Instance of {vec3} (optional)
		@return Camera up vector. Instance of {vec3} */
	getUpVector(out?): any {
		if (!out)
			out=vec3.create();
		out[0]=this.viewMatrix[4];
		out[1]=this.viewMatrix[5];
		out[2]=this.viewMatrix[6];
		return out;
	}

	/** Returns camera strafe vector (for perspective view).
		@param out Instance of {vec3} (optional)
		@return Camera strafe vector. Instance of {vec3} */
	getStrafeVector(out?): any {
		if (!out)
			out=vec3.create();
		out[0]=this.viewMatrix[0];
		out[1]=this.viewMatrix[1];
		out[2]=this.viewMatrix[2];
		return out;
	}

	/** Returns camera world position.
		@param out Instance of {vec3} (optional)
		@return Camera world position. Instance of {vec3} */
	getPosition(out?): any {
		if (!out)
			out=vec3.create();
		mat4.translation(out, this.viewInverseMatrix);
		return out;
	}

	/** Sets camera view matrix to position camera at the given point
		@param position Instance of {vec3} */
	setPosition(position): any {
		var p = this.getPosition();
		vec3.sub(p, p, position); // inverted relative translation vector
		var m = mat4.fromTranslation(mat4.create(), p);
		mat4.mul(this.viewMatrix, this.viewMatrix, m);
	}

	/** Pans the camera on the current view plane so that
		the given point is at the center of the camera's view.
		@param point Instance of {vec3} */
	center(point): any {
		var dir = this.getDirection();
		var pos = this.getPosition();
		var plane = new Plane();
		plane.setByNormalAndPoint(dir, pos);
		var p = plane.projectToPlane(point);
		this.setPosition(p);
	}

	/** Fits a BoundingBox or a BoundingSphere to view.
		@param boundingVolume Instance of {BoundingSphere} or {BoundingBox} */
	fitToView(boundingVolume) {
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
}

globalThis.Camera = Camera;
export default Camera;
