import CameraComponent from 'scene/components/CameraComponent';
import RenderingContext from "../../rendering/RenderingContext";
import Camera, { RenderCallback } from "../../rendering/camera/Camera";
import Scene from '../Scene';

/** Camera component providing perspective projection */
class PerspectiveCamera extends CameraComponent {
	aspect = 4 / 3;

	constructor(
		public fov = 45,
		public near = 0.3,
		public far = 1000,
	) {
		// View matrix is stored in column-major order as follows:
		// | vx ux -nx -ex |
		// | vy uy -ny -ey |
		// | vz uz -nz -ez |
		// |  0  0   0   1 |
		//
		// v - cross(u, n)
		// u - Up vector
		// n - Look direction vector
		// e - Eye position vector

		var lookAt=mat4.create();
		mat4.lookAt(lookAt, [0.0, 0.0, -100.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

		super(new Camera(lookAt, mat4.create()));

		this.camera.near = this.near;
		this.camera.far = this.far;
	}

	type(): any {
		return "PerspectiveCamera";
	}

	/** Sets the camera's near and far clipping planes. */
	setClipPlanes(near, far): any {
		this.near = near;
		this.far = far;
		this.camera.near = this.near;
		this.camera.far = this.far;
		this.calculatePerspective();
	}

	/** Sets the camera vertical field of view (in degrees) */
	setVerticalFieldOfView(fov): any {
		this.fov=fov;
		this.calculatePerspective();
	}

	/** Returns the current vertical field of view in degrees.
		@return The current vertical field of view in degrees {float} */
	getVerticalFieldOfView(): any {
		return this.camera.getFieldOfView()*180.0/Math.PI;
	}

	/** Returns the current horizontal field of view in degrees.
		@return The current vertical field of view in degrees {float} */
	getHorizontalFieldOfView(): any {
		var vpx = Math.tan(this.camera.getFieldOfView() * 0.5);
		var hpx = this.aspect * vpx;
		var fovx = Math.atan(hpx) * 2.0;
		return fovx * 180.0/Math.PI;
	}

	/** Calculates projection matrix based on fov, aspect ratio and near/far clipping planes */
	calculatePerspective() {
		mat4.perspective(this.camera.projectionMatrix, this.fov / 180 * Math.PI, this.aspect, this.near, this.far);
		mat4.invert(this.camera.projectionInverseMatrix, this.camera.projectionMatrix);
	}

	updateCamera(context: RenderingContext) {
		this.aspect = context.canvas.width / context.canvas.height;

		this.camera.target.frameBuffer = null;
		this.camera.target.set(0, 0, context.canvas.width, context.canvas.height);
		this.camera.target.resetViewport();

		this.calculatePerspective();
		mat4.invert(this.camera.viewInverseMatrix, this.camera.viewMatrix);
	}

	render(context: RenderingContext, scene: Scene, preRenderCallback: RenderCallback, postRenderCallback: RenderCallback) {
		this.updateCamera(context);
		super.render(context, scene, preRenderCallback, postRenderCallback);
	}
}

globalThis.PerspectiveCamera = PerspectiveCamera;
export default PerspectiveCamera;
