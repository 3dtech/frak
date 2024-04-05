import CameraComponent from './CameraComponent';
import type RenderingContext from '../../rendering/RenderingContext';
import type Scene from '../Scene';
import type { RenderCallback } from '../../rendering/camera/Camera';
import type Engine from '../../engine/Engine';

class LegacyImmersiveCamera extends CameraComponent {
	private readonly position = vec3.create();
	private readonly rotation = quat.create();
	private readonly up = vec3.fromValues(0, 1, 0);
	yOffset = 0.0;

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
	}
}

globalThis.LegacyImmersiveCamera = LegacyImmersiveCamera;
export default LegacyImmersiveCamera;
