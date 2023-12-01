import Renderer from "../renderers/Renderer";
import Material from "../materials/Material";
import PBRPipeline from "./PBRPipeline";
import RenderingContext from "../RenderingContext";
import Shader from "../shaders/Shader";

class View {
	private batches: number[][][] = [];
	public count = 0;

	constructor(private filter: (renderer: Renderer) => boolean) {}

	batch(allRenderers: Renderer[], list: number[][][]) {
		this.batches = [];

		for (const shaderGroup of list) {
			const filteredShaderGroup: number[][] = [];
			for (const materialGroup of shaderGroup) {
				const filteredMaterialGroup: number[] = [];
				for (const i of materialGroup) {
					if (this.filter(allRenderers[i])) {
						filteredMaterialGroup.push(i);
						this.count++;
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
		shaderBind = (s: Shader) => {
			s.use();
		},
		materialBind = (m: Material, s: Shader) => {
			s.bindUniforms(m.uniforms);
			s.bindSamplers(m.samplers);
		},
		render = (r: Renderer, s: Shader) => {
			context.modelview.push();
			context.modelview.multiply(r.matrix);
			r.renderGeometry(context, s);
			context.modelview.pop();
		}
	) {
		for (const shaderGroup of this.batches) {
			let shader = null;
			for (const materialGroup of shaderGroup) {
				let material = null;
				for (const i of materialGroup) {
					const renderer = filteredRenderers[i];
					if (renderer) {
						if (!shader) {
							shader = context.selectShader(baseShader, renderer.material.definitions);
							shaderBind(shader);
						}

						if (!material) {
							material = renderer.material;
							materialBind(material, shader);
						}

						render(renderer, shader);
					}
				}
			}
		}
	}
}

class RendererOrganizer {
	private views: View[] = [];

	public opaqueRenderers = this.addView(new View(r => !r.transparent && !r.customShader && !r.unlit));
	public transparentRenderers = this.addView(new View(r => r.transparent && !r.customShader));
	public unlitRenderers = this.addView(new View(r => r.unlit && !r.transparent && !r.customShader));
	public customRenderers = this.addView(new View(r => r.customShader));

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
