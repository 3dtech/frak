import CameraComponent from "./CameraComponent";
import RenderingContext from "../../rendering/RenderingContext";
import Scene from '../Scene';
import OrbitController from './OrbitController';
import { RenderCallback } from '../../rendering/camera/Camera';

class ImmersiveCamera extends CameraComponent {
	private rotation = quat.create();
	private position = vec3.create();
	private up = vec3.fromValues(0, 1, 0);
	yOffset = 0.0;

	onAddScene(node) {}
	onRemoveScene(node) {}
	onStart(context, engine) {}
	onUpdateTransform(absolute) {}

	updateFromXR(context: RenderingContext, frame: XRFrame, view: XRView): boolean {
		if (!context.engine.immersiveSession) {
			return false;
		}

		const layer = frame.session.renderState.baseLayer;
		const viewport = layer.getViewport(view);
		if (viewport.width === 0 || viewport.height === 0) {
			return false;	// Needed when rendering only one eye of a stereo view to not spam console with errors
		}

		this.camera.projectionMatrix = view.projectionMatrix;
		this.camera.viewMatrix = view.transform.inverse.matrix;
		this.camera.target.frameBuffer = layer.framebuffer;
		this.camera.target.set(viewport.x, viewport.y, viewport.width, viewport.height);
		this.camera.target.resetViewport();

		mat4.invert(this.camera.projectionInverseMatrix, this.camera.projectionMatrix);
		mat4.invert(this.camera.viewInverseMatrix, this.camera.viewMatrix);

		return true;
	}

	render(context: RenderingContext, scene: Scene, preRenderCallback: RenderCallback, postRenderCallback: RenderCallback) {
		let space = scene.engine.immersiveRefSpace;
		const controller = this.node.getComponent(OrbitController);
		if (controller) {
			const p = controller.targetPosition;
			const yRotation = controller.rotation[1];
			quat.setAxisAngle(this.rotation, this.up, -yRotation);
			vec3.transformQuat(this.position, p, this.rotation);
			space = space.getOffsetReferenceSpace(new XRRigidTransform({
				x: -this.position[0],
				y: -this.position[1] - this.yOffset,
				z: -this.position[2],
				w: 1,
			}, {
				x: this.rotation[0],
				y: this.rotation[1],
				z: this.rotation[2],
				w: this.rotation[3],
			}));
		}

		const pose = scene.xrFrame.getViewerPose(space);
		for (const view of pose.views) {
			if (this.updateFromXR(context, scene.xrFrame, view)) {
				super.render(context, scene, preRenderCallback, postRenderCallback);
			}
		}
	}
}

globalThis.ImmersiveCamera = ImmersiveCamera;
export default ImmersiveCamera;
