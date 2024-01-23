import CameraComponent from 'scene/components/CameraComponent';
import RenderingContext from "../../rendering/RenderingContext";

/** Camera component providing perspective projection */
class PerspectiveCamera extends CameraComponent {
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

		super(mat4.create(), mat4.create());

		var lookAt=mat4.create();
		mat4.lookAt(lookAt, [0.0, 0.0, -100.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

		this.camera.viewMatrix = lookAt;
		mat4.invert(this.camera.viewInverseMatrix, lookAt);

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

	/** Calculates projection matrix based on fov, aspect ratio and near/far clipping planes */
	async calculatePerspective() {
		await this.session?.updateRenderState({
			depthFar: this.far,
			depthNear: this.near,
			inlineVerticalFieldOfView: this.fov / 180 * Math.PI,
		});
	}

	updateFromXR(context: RenderingContext, frame: XRFrame, view: XRView): boolean {
		if (context.engine.immersiveSession) {
			return false;
		}

		return super.updateFromXR(context, frame, view);
	}
}

globalThis.PerspectiveCamera = PerspectiveCamera;
export default PerspectiveCamera;
