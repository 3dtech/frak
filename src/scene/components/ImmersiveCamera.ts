import CameraComponent from "./CameraComponent";
import RenderingContext from "../../rendering/RenderingContext";

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
}

globalThis.ImmersiveCamera = ImmersiveCamera;
export default ImmersiveCamera;
