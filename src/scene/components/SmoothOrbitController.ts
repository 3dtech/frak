import type Engine from 'engine/Engine';
import OrbitController from 'scene/components/OrbitController';

/** Provides restricted flight mode that is used for orbiting. */
class SmoothOrbitController extends OrbitController {
	currentDistance: any;
	currentRotation: any;
	enableRotatingX: any;
	enableRotatingY: any;
	speed: any;

	/**
	 *
	 */
	constructor() {
		super();

		this.speed = 5.0;

		this.currentRotation = vec2.create();
		this.currentDistance = this.distance;
		this.enableRotatingX = true;
		this.enableRotatingY = true;
	}

	/**
	 *
	 */
	excluded(): any {
		return super.excluded().concat(['currentRotation', 'currentDistance', 'tmpRotation']);
	}

	// Events
	/** Called on each scene update */
	onUpdate(engine: Engine) {
		if (this.target.isNull()) {
			return; // No target, no orbit!
		}

		let dt = engine.fps.getDelta() / 1000.0 * this.speed;

		dt = Math.min(dt, 1.0);

		if (this.enableRotatingX) {
			this.currentRotation[0] = lerp(this.currentRotation[0], this.rotation[0], dt);
		}

		if (this.enableRotatingY) {
			this.currentRotation[1] = lerp(this.currentRotation[1], this.rotation[1], dt);
		}

		this.currentRotation[0] = Math.min(Math.max(this.currentRotation[0], this.minimumPitch), this.maximumPitch);

		this.currentDistance = lerp(this.currentDistance, this.distance, dt);

		// Calculate desired position
		quat.identity(this.tmpRotation);
		quat.rotateY(this.tmpRotation, this.tmpRotation, this.currentRotation[1]);
		quat.rotateX(this.tmpRotation, this.tmpRotation, this.currentRotation[0]);
		vec3.set(this.direction, 0.0, 0.0, 1.0);
		vec3.transformQuat(this.direction, this.direction, this.tmpRotation);
		vec3.scale(this.direction, this.direction, this.currentDistance);

		mat4.translation(this.targetPosition, this.target.value.absolute);
		vec3.add(this.cameraPosition, this.targetPosition, this.direction);
		vec3.add(this.targetPosition, this.targetPosition, this.pan);
		vec3.add(this.cameraPosition, this.cameraPosition, this.pan);

		// Look at target from calculated position
		mat4.lookAt(this.lookat, this.cameraPosition, this.targetPosition, [0, 1, 0]);
		mat4.invert(this.node.transform.absolute, this.lookat);

		this.node.calculateRelativeFromAbsolute();

		if (this.doZoomIn) {
			this.zoomIn();
		}

		if (this.doZoomOut) {
			this.zoomOut();
		}
	}

	/**
	 *
	 */
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	type(): any {
		return 'SmoothOrbitController';
	}
}

globalThis.SmoothOrbitController = SmoothOrbitController;
export default SmoothOrbitController;
