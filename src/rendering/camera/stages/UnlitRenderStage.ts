import type RenderingContext from "rendering/RenderingContext";
import type Engine from "engine/Engine";
import type Scene from "scene/Scene";
import type Camera from "../Camera";
import type Shader from "rendering/shaders/Shader";
import type Renderer from "rendering/renderers/Renderer";
import PBRRenderStage from "./PBRRenderStage";

class UnlitRenderStage extends PBRRenderStage {
	shader: Shader;

	onStart(context: RenderingContext, engine: Engine, camera: any) {
		this.shader = engine.assetsManager.addShader(
			"shaders/mesh.vert",
			"shaders/unlit.frag",
			[],
		);
	}

	onPreRender(context: RenderingContext, scene: Scene, camera: Camera) {
		super.onPreRender(context, scene, camera);

		const gl = context.gl;

		gl.enable(gl.DEPTH_TEST);
		gl.depthMask(true);
		gl.disable(gl.STENCIL_TEST);

		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	}

	onPostRender(context: RenderingContext, scene: Scene, camera: Camera) {
		const gl = context.gl;

		const filteredRenderers = this.parent.filteredRenderers.filter(r => r && (camera.stencilMask & r.material.stencilLayer) && r.material.properties.type === "Unlit");

		function sort(a: Renderer, b: Renderer) {
			const aCenter = a.globalBoundingSphere.center;
			const bCenter = b.globalBoundingSphere.center;
			const cameraPosition = camera.blockValues.cameraPosition;

			const aDist = vec3.squaredDistance(aCenter, cameraPosition);
			const bDist = vec3.squaredDistance(bCenter, cameraPosition);

			return bDist - aDist;
		}

		filteredRenderers.sort(sort);

		let lastHash: number = null;
		let shader: Shader = null;
		for (const renderer of filteredRenderers) {
			const material = renderer.material;
			if (lastHash !== material.definitions.hash) {
				shader = context.selectShader(this.shader, material.definitions);
				shader.use();
				lastHash = material.definitions.hash;
			}

			shader.bindUniforms(material.uniforms);
			shader.bindSamplers(material.samplers);

			renderer.renderGeometry(context, shader);
		}

		gl.disable(gl.BLEND);
		gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);

		super.onPostRender(context, scene, camera);
	}
}

globalThis.UnlitRenderStage = UnlitRenderStage;
export default UnlitRenderStage;
