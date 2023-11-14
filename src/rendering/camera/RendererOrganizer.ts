import Renderer from "../renderers/Renderer";
import Material from "../materials/Material";
import PBRPipeline from "./PBRPipeline";
import RenderingContext from "../RenderingContext";
import Shader from "../shaders/Shader";

class View {
	private batches: number[][][] = [];

	constructor(private filter: (renderer: Renderer) => boolean) {}

	/** Goes to next batch with an active renderer and returns the Material */
	/*nextBatchMaterial(activeRenderers: Renderer[]): Material {
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
	}*/

	/** Returns the next renderer in the active batch */
	/*next(activeRenderers: Renderer[]): Renderer {
		// We expect this.currentBatchIndex to be < batches.length,
		// because we shouldn't call this if nextBatchMaterial returned null
		/!*const batch = this.batches[this.currentBatchIndex];
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
		}*!/
	}*/

	batch(allRenderers: Renderer[], list: number[][][]) {
		this.batches = [];

		for (const shaderGroup of list) {
			const filteredShaderGroup: number[][] = [];
			for (const materialGroup of shaderGroup) {
				const filteredMaterialGroup: number[] = [];
				for (const i of materialGroup) {
					if (this.filter(allRenderers[i])) {
						filteredMaterialGroup.push(i);
					}
				}

				if (filteredMaterialGroup.length > 0) {
					filteredShaderGroup.push(filteredMaterialGroup);
				}
			}

			if (filteredShaderGroup.length > 0) {
				this.batches.push(filteredShaderGroup);
			}
		}
	}

	run(
		context: RenderingContext,
		baseShader: Shader,
		filteredRenderers: Renderer[],
		pipeline: PBRPipeline,
		perShaderFunction = (r: Renderer, s: Shader) => {
			s.use();
		},
		perMaterialFunction = (r: Renderer, s: Shader) => {
			s.bindUniforms(r.material.uniforms);
			s.bindSamplers(r.material.samplers);
		},
		perRendererFunction  = (r: Renderer, s: Shader) => {
			context.modelview.push();
			context.modelview.multiply(r.matrix);
			r.renderGeometry(context, s);
			context.modelview.pop();
		}
	) {
		// TODO
	}
}

class RendererOrganizer {
	private views: View[] = [];

	public opaqueRenderers = this.addView(new View(renderer => !renderer.transparent && !renderer.customShader && !renderer.unlit));
	public transparentRenderers = this.addView(new View(renderer => renderer.transparent && !renderer.customShader && !renderer.unlit));

	addView(view: View): View {
		this.views.push(view);
		return view;
	}

	private updateViews(allRenderers: Renderer[], list: number[][][]) {
		for (const view of this.views) {
			view.batch(allRenderers, list);
		}
	}

	/** Updates Views to group renderers by shader and material.
	 *  Call this when order or structure of allRenderers changes */
	batch(allRenderers: Renderer[]) {
		// TODO: Material hash instead of id
		const shaderIndices = new Map<number, number>();	// Definitions hash -> materials
		const materialIndices = new Map<number, number>();	// Material id -> index

		const list: number[][][] = [];	// Indices grouped by material, then shader

		for (let i = 0; i < allRenderers.length; i++) {
			const material = allRenderers[i].material;

			if (!shaderIndices.has(material.definitions.hash)) {
				shaderIndices.set(material.definitions.hash, list.length);
				list.push([]);
			}
			const shaderIndex = shaderIndices.get(material.definitions.hash);

			if (!materialIndices.has(material.id)) {
				materialIndices.set(material.id, list[shaderIndex].length);
				list[shaderIndex].push([]);
			}
			const materialIndex = materialIndices.get(material.id);

			list[shaderIndex][materialIndex].push(i);
		}

		this.updateViews(allRenderers, list);
	}
}

globalThis.RendererOrganizer = RendererOrganizer;
export {RendererOrganizer as default, View};
