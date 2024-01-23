import CameraComponent from "./CameraComponent";
import RenderingContext from "../../rendering/RenderingContext";

class ImmersiveCamera extends CameraComponent {
	onAddScene(node) {}
	onRemoveScene(node) {}
	onStart(context, engine) {}
	onUpdateTransform(absolute) {}

	updateFromXR(context: RenderingContext, frame: XRFrame, view: XRView): boolean {
		if (!context.engine.immersiveSession || !super.updateFromXR(context, frame, view)) {
			return false;
		}

		this.camera.viewMatrix = view.transform.inverse.matrix;
		mat4.invert(this.camera.viewInverseMatrix, this.camera.viewMatrix);

		return true;
	}
}

globalThis.ImmersiveCamera = ImmersiveCamera;
export default ImmersiveCamera;
