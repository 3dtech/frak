import CameraComponent from 'scene/components/CameraComponent';
import type RenderingContext from '../../rendering/RenderingContext';
import type { RenderCallback } from '../../rendering/camera/Camera';
import Camera from '../../rendering/camera/Camera';
import type Scene from '../Scene';

/** Camera component providing perspective projection */
class PerspectiveCamera extends CameraComponent {
	aspect = 4 / 3;

	/**
	 *
	 */
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

		let lookAt = mat4.create();

		mat4.lookAt(lookAt, [0.0, 0.0, -100.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

		super(new Camera(lookAt, mat4.create()));

		this.camera.near = this.near;
		this.camera.far = this.far;
	}

	/**
	 *
	 */
	type(): any {
		return 'PerspectiveCamera';
	}

	/**
	 *
	 */
	onAddScene(node): any {
		this.useCameraViewMatrix();

		if (node.scene.cameraComponent === this) {
			return;
		}

		super.onAddScene(node);
	}

	/**
	 *
	 */
	onRemoveScene(node): any {
		if (node.scene.cameraComponent === this) {
			return;
		}

		super.onRemoveScene(node);
	}

	/** Sets the camera's near and far clipping planes. */
	override setClipPlanes(near: number, far: number) {
		this.near = near;
		this.far = far;
		this.camera.near = this.near;
		this.camera.far = this.far;
		this.calculatePerspective();
	}

	/** Sets the camera vertical field of view (in degrees) */
	setVerticalFieldOfView(fov): any {
		this.fov = fov;
		this.calculatePerspective();
	}

	/** Returns the current vertical field of view in degrees.
		@return The current vertical field of view in degrees {float} */
	getVerticalFieldOfView(): any {
		return this.camera.getFieldOfView() * 180.0 / Math.PI;
	}

	/** Returns the current horizontal field of view in degrees.
		@return The current vertical field of view in degrees {float} */
	getHorizontalFieldOfView(): any {
		let vpx = Math.tan(this.camera.getFieldOfView() * 0.5);
		let hpx = this.aspect * vpx;
		let fovx = Math.atan(hpx) * 2.0;

		return fovx * 180.0 / Math.PI;
	}

	/** Calculates projection matrix based on fov, aspect ratio and near/far clipping planes */
	calculatePerspective() {
		mat4.perspective(this.camera.blockValues.projection, this.fov / 180 * Math.PI, this.aspect, this.near, this.far);
		mat4.invert(this.camera.blockValues.projectionInverse, this.camera.blockValues.projection);
	}

	/**
	 *
	 */
	updateCamera(context: RenderingContext) {
		this.aspect = context.canvas.width / context.canvas.height;

		const target = this.camera.target;

		target.frameBuffer = null;
		target.set(0, 0, context.canvas.width * context.renderScale, context.canvas.height * context.renderScale);

		// target.resetViewport();
		target.setViewport(0, 0, context.canvas.width, context.canvas.height);

		this.calculatePerspective();

		mat4.invert(this.camera.blockValues.viewInverse, this.camera.blockValues.view);

		this.camera.blockValues.zNear[0] = this.camera.near;
		this.camera.blockValues.zFar[0] = this.camera.far;
		this.camera.getPosition(this.camera.blockValues.cameraPosition);

		this.camera.block.update(context);
	}

	/**
	 *
	 */
	render(context: RenderingContext, scene: Scene, preRenderCallback: RenderCallback, postRenderCallback: RenderCallback) {
		if (!this.enabled) {
			return;
		}

		this.updateCamera(context);
		super.render(context, scene, preRenderCallback, postRenderCallback);
	}
}

globalThis.PerspectiveCamera = PerspectiveCamera;
export default PerspectiveCamera;
