import Renderer from "../renderers/Renderer";
import Material from "../materials/Material";

class View {
	private currentBatchIndex = 0;
	private currentIndex = 0;

	constructor(private batches: number[][], private filter: (renderer: Renderer) => boolean) {}

	start() {
		this.currentBatchIndex = -1;
		this.currentIndex = -1;
	}

	/** Goes to next batch with an active renderer and returns the Material */
	nextBatchMaterial(activeRenderers: Renderer[]): Material {
		while (true) {
			this.currentBatchIndex++;
			if (this.currentBatchIndex >= this.batches.length) {
				return null;
			}

			this.currentIndex = -1;

			const batch = this.batches[this.currentBatchIndex];
			let renderer: Renderer;
			while (true) {
				this.currentIndex++;
				if (this.currentIndex >= batch.length) {
					break;	// Go to next batch
				}

				renderer = activeRenderers[batch[this.currentIndex]];
				if (!renderer) {
					continue;
				}

				if (this.filter(renderer)) {
					this.currentIndex--;	// So the [next] call doesn't skip this renderer
					return renderer.material;
				}
			}
		}
	}

	/** Returns the next renderer in the active batch */
	next(activeRenderers: Renderer[]): Renderer {
		// We expect this.currentBatchIndex to be < batches.length,
		// because we shouldn't call this if nextBatchMaterial returned null
		const batch = this.batches[this.currentBatchIndex];
		let renderer: Renderer;
		while (true) {
			this.currentIndex++;
			if (this.currentIndex >= batch.length) {
				return null;
			}

			renderer = activeRenderers[batch[this.currentIndex]];
			if (!renderer) {
				continue;
			}

			if (this.filter(renderer)) {
				return renderer;
			}
		}
	}
}

class RendererOrganizer {
	/** Maps Material ID to batch index */
	private batchIndices = new Map<number, number>();
	private batches: number[][] = [];

	public opaqueRenderers = new View(this.batches, renderer => !renderer.transparent && !renderer.customShader && !renderer.unlit);
	public transparentRenderers = new View(this.batches, renderer => renderer.transparent && !renderer.customShader && !renderer.unlit);

	public sortedTransparentRenderers: Renderer[] = [];

	/** Creates batches of indices into allRenderers grouped by material.
	 *  Call this when order or structure of allRenderers changes */
	batch(allRenderers: Renderer[]) {
		this.batchIndices.clear();
		this.batches.length = 0;

		for (let i = 0; i < allRenderers.length; i++) {
			const materialId = allRenderers[i].material.id;
			if (!this.batchIndices.has(materialId)) {
				this.batchIndices.set(materialId, this.batches.length);
				this.batches.push([]);
			}

			const batchIndex = this.batchIndices.get(materialId);
			this.batches[batchIndex].push(i);
		}
	}
}

globalThis.RendererOrganizer = RendererOrganizer;
export {RendererOrganizer as default, View};
