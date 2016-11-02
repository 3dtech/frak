/**
 * Line renderer
 */
var LineRenderer = Renderer.extend({
	init: function(context, matrix, material) {
		this._super(matrix);
		this.material = material;
		this.buffer = new LinesRenderBuffer(context);
	},

	/** Renders mesh geometry with material */
	onRender: function(context) {
		this.buffer.render(this.material.shader);
	},

	/** Renders only mesh geometry without material switches with given shader */
	onRenderGeometry: function(context, shader) {
		if (!this._cache) {
			this._cache = this.getDefaultUniforms(context);
		}
		else {
			this.getDefaultUniforms(context, this._cache);
		}
		shader.bindUniforms(this._cache);
		this.buffer.render(shader);
	}
});
