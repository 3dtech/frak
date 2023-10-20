import Renderer from "../renderers/Renderer";
import Material from "../materials/Material";

/** Transparency sorting function */
function TransparencySort(a, b) {
	if (!a && !b)
		return 0;
	if (a && !b)
		return -1;
	if (!a && b)
		return 1;
	var d1 = vec3.squaredDistance(TransparencySort.cmpValue, a.globalBoundingSphere.center);
	var d2 = vec3.squaredDistance(TransparencySort.cmpValue, b.globalBoundingSphere.center);
	if (d1 > d2) return -1;
	if (d1 < d2) return 1;
	return 0;
}

TransparencySort.cmpValue = vec3.create();

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

	sortTransparentRenderers(filteredRenderers: Renderer[], eyePosition: Float32Array): Renderer[] {
		vec3.copy(TransparencySort.cmpValue, eyePosition);
		this.sortedTransparentRenderers.length = 0;
		this.transparentRenderers.start();
		let material = this.transparentRenderers.nextBatchMaterial(filteredRenderers);
		while (material) {
			let renderer = this.transparentRenderers.next(filteredRenderers);
			while (renderer) {
				this.sortedTransparentRenderers.push(renderer);
				renderer = this.transparentRenderers.next(filteredRenderers);
			}

			material = this.transparentRenderers.nextBatchMaterial(filteredRenderers);
		}

		this.sortedTransparentRenderers.sort(TransparencySort);

		return this.sortedTransparentRenderers;
	}
}

globalThis.RendererOrganizer = RendererOrganizer;
export default RendererOrganizer;
