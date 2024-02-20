import Renderer from 'rendering/renderers/Renderer';
import LinesRenderBufferInstanced from 'rendering/buffers/LinesRenderBufferInstanced';

/**
 * Line renderer
 */

class LineRenderer extends Renderer {
	buffer: any;
	instanced: any;
	count: any;
	_cache: any;

	constructor(context, matrix, material) {
		super(matrix);
		this.material = material;

		this.buffer = new LinesRenderBufferInstanced(context);
		this.instanced = true;

		this.customShader = true;

		this.count = 0;
	}

	/** Renders mesh geometry with material */
	onRender(context): any {
		this.buffer.render(this.material.shader, this.count);
	}

	/** Renders only mesh geometry without material switches with given shader */
	onRenderGeometry(context, shader) {
		this._cache = this.getDefaultUniforms(context, this._cache);
		shader.bindUniforms(this._cache);
		this.buffer.render(shader, this.count);
	}

}

globalThis.LineRenderer = LineRenderer;

export default LineRenderer;
