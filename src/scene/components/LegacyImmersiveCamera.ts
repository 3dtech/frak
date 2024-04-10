import CameraComponent from './CameraComponent';
import type RenderingContext from '../../rendering/RenderingContext';
import type Scene from '../Scene';
import type { RenderCallback } from '../../rendering/camera/Camera';
import type Engine from '../../engine/Engine';
import OrbitController from './OrbitController';
import PerspectiveCamera from './PerspectiveCamera';

interface Orientation {
	alpha: number;
	beta: number;
	gamma: number;
}

type OrientationEventName = 'deviceorientation' | 'deviceorientationabsolute';

function setQuat(quat: Float32Array, alpha: number, beta: number, gamma: number) {
	const degToRad = Math.PI / 180;
	const x = beta * degToRad;
	const y = alpha * degToRad;
	const z = -gamma * degToRad;

	const c1 = Math.cos(x / 2);
	const c2 = Math.cos(y / 2);
	const c3 = Math.cos(z / 2);

	const s1 = Math.sin(x / 2);
	const s2 = Math.sin(y / 2);
	const s3 = Math.sin(z / 2);

	quat[0] = (s1 * c2 * c3) + (c1 * s2 * s3);
	quat[1] = (c1 * s2 * c3) - (s1 * c2 * s3);
	quat[2] = (c1 * c2 * s3) - (s1 * s2 * c3);
	quat[3] = (c1 * c2 * c3) + (s1 * s2 * s3);
}

class LegacyImmersiveCamera extends CameraComponent {
	private aspect = 4 / 3;
	private deviceOrientation: Orientation = {
		alpha: 0,
		beta: 0,
		gamma: 0,
	};
	private readonly deviceRotation = quat.create();
	private readonly deviceRotationAdjust = quat.fromValues(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
	private far = 1000;
	private fov = 45;
	private near = 0.3;
	private orientationChangeEventName: OrientationEventName = 'deviceorientationabsolute';
	private readonly position = vec3.create();
	private readonly rotation = quat.create();
	private readonly up = vec3.fromValues(0, 1, 0);
	yOffset = 1.5;

	private calculatePerspective(context: RenderingContext) {
		this.aspect = context.canvas.width / context.canvas.height;
		mat4.perspective(
			this.camera.blockValues.projection,
			this.fov / 180 * Math.PI,
			this.aspect,
			this.near,
			this.far,
		);

		mat4.invert(this.camera.blockValues.projectionInverse, this.camera.blockValues.projection);
	}

	private updateFromOrientation(context: RenderingContext) {
		const {
			alpha,
			beta,
			gamma,
		} = this.deviceOrientation;

		setQuat(this.deviceRotation, alpha, beta, gamma);
		quat.mul(this.deviceRotation, this.deviceRotation, this.deviceRotationAdjust);

		const controller = this.node.getComponent(OrbitController);
		if (controller) {
			vec3.copy(this.position, controller.targetPosition);
			const yRotation = controller.rotation[1];

			quat.setAxisAngle(this.rotation, this.up, -yRotation);
		}

		this.position[1] += this.yOffset;

		quat.mul(this.rotation, this.rotation, this.deviceRotation);

		this.camera.target.frameBuffer = null;
		this.camera.target.set(0, 0, context.canvas.width, context.canvas.height);
		this.camera.target.resetViewport();

		this.calculatePerspective(context);

		mat4.fromRotationTranslation(this.camera.blockValues.viewInverse, this.rotation, this.position);
		mat4.invert(this.camera.blockValues.view, this.camera.blockValues.viewInverse);

		this.camera.blockValues.zNear[0] = this.camera.near;
		this.camera.blockValues.zFar[0] = this.camera.far;
		this.camera.getPosition(this.camera.blockValues.cameraPosition);

		this.camera.block.update(context);
	}

	/**
	 *
	 */
	onAddScene(node) {
		if (node.scene.legacyImmersiveCamera === this) {
			return;
		}

		super.onAddScene(node);
	}

	/**
	 *
	 */
	onRemoveScene(node) {
		if (node.scene.legacyImmersiveCamera === this) {
			return;
		}

		super.onRemoveScene(node);
	}

	/**
	 *
	 */
	onStart(context: RenderingContext, engine: Engine) {
		const canvas = context.canvas;

		this.camera.target.setSize(canvas.width, canvas.height);

		this.orientationChangeEventName =
			'ondeviceorientationabsolute' in window ?
				'deviceorientationabsolute' :
				'deviceorientation';

		window.addEventListener(
			this.orientationChangeEventName,
			event => {
				this.deviceOrientation = event;
			},
		);

		const perspectiveCamera = this.node.getComponent(PerspectiveCamera);
		if (perspectiveCamera) {
			this.fov = perspectiveCamera.fov;
			this.near = perspectiveCamera.near;
			this.far = perspectiveCamera.far;
		}

		super.onStart(context, engine);
	}

	/**
	 *
	 */
	override onUpdateTransform(absolute) {}

	/**
	 *
	 */
	render(
		context: RenderingContext,
		scene: Scene,
		preRenderCallback: RenderCallback,
		postRenderCallback: RenderCallback,
	) {
		if (!this.enabled) {
			return;
		}

		this.updateFromOrientation(context);
		super.render(context, scene, preRenderCallback, postRenderCallback);
	}
}

globalThis.LegacyImmersiveCamera = LegacyImmersiveCamera;
export default LegacyImmersiveCamera;
