import Serializable from 'scene/Serializable';
import Plane from 'scene/geometry/Plane';
import BoundingBox from 'scene/geometry/BoundingBox';
import BoundingSphere from 'scene/geometry/BoundingSphere';
import BoundingVolume from 'scene/geometry/BoundingVolume';
import Color from 'rendering/Color';
import PBRPipeline from './stages/PBRPipeline';
import RenderTarget from './RenderTarget';
import RenderingContext from '../RenderingContext';
import Scene from '../../scene/Scene';
import UniformBlock from '../shaders/UniformBlock';

type RenderCallback = (context: RenderingContext, camera: Camera) => void;
type CameraBlock = {
	projection: Float32Array;
	projectionInverse: Float32Array;
	view: Float32Array;
	viewInverse: Float32Array;
	zNear: Float32Array;
	zFar: Float32Array;
	cameraPosition: Float32Array;
};

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
	renderStage: PBRPipeline;
	target: RenderTarget;
	backgroundColor: any;
	clearMask: any;
	order: any;
	layerMask = 0xFFFFFFFF;
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
	stencilMask = 0xFFFFFFFF;	// Not GL stencilMask, but used for hiding objects for immersive mode
	block: UniformBlock;
	blockValues: CameraBlock = {
		projection: mat4.create(),
		projectionInverse: mat4.create(),
		view: mat4.create(),
		viewInverse: mat4.create(),
		zNear: new Float32Array(1),
		zFar: new Float32Array(1),
		cameraPosition: vec3.create(),
	};

	/** Constructor */
	constructor(viewMatrix, projectionMatrix) {
		super();
		this.blockValues.view = viewMatrix;
		this.blockValues.projection = projectionMatrix;
		mat4.invert(this.blockValues.viewInverse, this.blockValues.view);
		mat4.invert(this.blockValues.projectionInverse, this.blockValues.projection);
		this.renderStage = new PBRPipeline();
		this.target = new RenderTarget();
		this.backgroundColor = new Color(0.0, 0.0, 0.0, 0.0); ///< The background color used for clearing the color buffer (alpha 0.0 means that color buffer will not be cleared)
		this.clearMask = false;
		this.order = 0; ///< Cameras are rendered in succession from lowest to highest order
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
	startRender(context: RenderingContext): any {
		// Use projection matrix
		context.projection.push();
		context.projection.multiply(this.blockValues.projection);

		// Use view matrix
		context.modelview.push();
		context.modelview.multiply(this.blockValues.view);
	}

	/** Renders the contents of this camera using assigned render-stage */
	renderScene(context: RenderingContext, scene: Scene, preRenderCallback: RenderCallback, postRenderCallback: RenderCallback): any {
		if (preRenderCallback)
			preRenderCallback(context, this);

		this.renderStage.render(context, scene, this);

		if (postRenderCallback)
			postRenderCallback(context, this);
	}

	/** Ends rendering with camera popping projection and view matrices */
	endRender(context: RenderingContext): any {
		context.modelview.pop();
		context.projection.pop();
	}

	/** Main entrypoint for rendering the scene with this Camera */
	render(context: RenderingContext, scene: Scene, preRenderCallback: RenderCallback, postRenderCallback: RenderCallback) {
		context.camera = this;

		this.startRender(context);
		this.renderScene(context, scene, preRenderCallback, postRenderCallback);
		this.endRender(context);

		context.camera = false;
	}

	/** Returns the current vertical field of view (in radians).
		Note that this function assumes that a perspective projection has been used.
		@return The current vertical field of view in radians {float} */
	getFieldOfView(): any {
		return 2.0*Math.atan(1.0/this.blockValues.projection[5]);
	}

	/** Returns camera direction (for perspective view).
		@param out Instance of {vec3} (optional)
		@return Camera direction. Instance of {vec3} */
	getDirection(out?): any {
		if (!out)
			out=vec3.create();
		out[0]=-this.blockValues.view[8];
		out[1]=-this.blockValues.view[9];
		out[2]=-this.blockValues.view[10];
		return out;
	}

	/** Returns camera up vector (for perspective view).
		@param out Instance of {vec3} (optional)
		@return Camera up vector. Instance of {vec3} */
	getUpVector(out?): any {
		if (!out)
			out=vec3.create();
		out[0]=this.blockValues.view[4];
		out[1]=this.blockValues.view[5];
		out[2]=this.blockValues.view[6];
		return out;
	}

	/** Returns camera strafe vector (for perspective view).
		@param out Instance of {vec3} (optional)
		@return Camera strafe vector. Instance of {vec3} */
	getStrafeVector(out?): any {
		if (!out)
			out=vec3.create();
		out[0]=this.blockValues.view[0];
		out[1]=this.blockValues.view[1];
		out[2]=this.blockValues.view[2];
		return out;
	}

	/** Returns camera world position.
		@param out Instance of {vec3} (optional)
		@return Camera world position. Instance of {vec3} */
	getPosition(out?): any {
		if (!out)
			out=vec3.create();
		mat4.translation(out, this.blockValues.viewInverse);
		return out;
	}

	/** Sets camera view matrix to position camera at the given point
		@param position Instance of {vec3} */
	setPosition(position): any {
		var p = this.getPosition();
		vec3.sub(p, p, position); // inverted relative translation vector
		var m = mat4.fromTranslation(mat4.create(), p);
		mat4.mul(this.blockValues.view, this.blockValues.view, m);
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

	replaceViewProjection(context: RenderingContext, projection: any, view: any) {
		const gl = context.gl;
		this.block.bindBuffer(context);
		this.block.updateIndividual(context, 'projection', projection);
		this.block.updateIndividual(context, 'view', view);
		this.block.unbindBuffer(context);
	}

	restoreViewProjection(context: RenderingContext) {
		const gl = context.gl;
		this.block.bindBuffer(context);
		this.block.updateIndividual(context, 'projection', this.blockValues.projection);
		this.block.updateIndividual(context, 'view', this.blockValues.view);
		this.block.unbindBuffer(context);
	}
}

globalThis.Camera = Camera;
export { Camera as default, RenderCallback };
