import CameraComponent from "./CameraComponent";
import RenderingContext from "../../rendering/RenderingContext";
import Scene from '../Scene';
import OrbitController from './OrbitController';
import { RenderCallback } from '../../rendering/camera/Camera';

class ImmersiveCamera extends CameraComponent {
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
		const controllerTarget = this.node.getComponent(OrbitController)?.targetPosition;
		if (controllerTarget) {
			space = space.getOffsetReferenceSpace(new XRRigidTransform({
				x: -controllerTarget[0],
				y: -controllerTarget[1] - this.yOffset,
				z: -controllerTarget[2],
				w: 1
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
