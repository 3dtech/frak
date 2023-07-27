import CameraComponent from 'scene/components/CameraComponent.js'

/** Camera component providing perspective projection */

class PerspectiveCamera extends CameraComponent {
	fov: any;
	aspect: any;
	near: any;
	far: any;

	constructor(fov?, aspect?, near?, far?) {
		if(!fov) fov=45.0;
		if(!near) near=0.3;
		if(!far) far=1000.0;
		if(!aspect) aspect=4/3;

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

		this.fov=fov;
		this.aspect=aspect;
		this.near=near;
		this.far=far;

		var lookAt=mat4.create();
		mat4.lookAt(lookAt, [0.0, 0.0, -100.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

		this.camera.viewMatrix = lookAt;
		mat4.invert(this.camera.viewInverseMatrix, lookAt);
		this.camera.projectionMatrix = this.calculatePerspective();

		this.camera.near = this.near;
		this.camera.far = this.far;
	}

	type(): any {
		return "PerspectiveCamera";
	}

	onStart(context, engine): any {
		if(!this.aspect) {
			this.setAspectRatio(context.canvas.width/context.canvas.height);
		}
		super.onStart(context, engine);
	}

	/** Sets the camera's near and far clipping planes. */
	setClipPlanes(near, far): any {
		this.near = near;
		this.far = far;
		this.camera.near = this.near;
		this.camera.far = this.far;
		this.camera.projectionMatrix = this.calculatePerspective();
	}

	/** Sets the camera aspect ration and updates the perspective projection matrix.
		@param aspect The new aspect radio (width/height). */
	setAspectRatio(aspect): any {
		this.aspect=aspect;
		this.camera.projectionMatrix=this.calculatePerspective();
	}

	/** Sets the camera vertical field of view (in degrees) */
	setVerticalFieldOfView(fov): any {
		this.fov=fov;
		this.camera.projectionMatrix=this.calculatePerspective();
	}

	/** Sets the camera horizontal field of view (in degrees) */
	setHorizontalFieldOfView(fov): any {
		fov = fov * (Math.PI*2.0)/360.0;
		var hpx = Math.tan(fov/2.0);
		var vpx = hpx / this.aspect;
		this.fov = Math.atan(vpx) * 2.0 * 180.0/Math.PI;
		this.camera.projectionMatrix=this.calculatePerspective();
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
		var perspective=mat4.create();
		var aspect=this.aspect;
		if(!aspect) aspect=1.0;
		mat4.perspective(perspective, this.fov*(Math.PI*2.0)/360.0, aspect, this.near, this.far);
		return perspective;
	}

}

globalThis.PerspectiveCamera = PerspectiveCamera;

export default PerspectiveCamera;
