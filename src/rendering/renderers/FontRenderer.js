/** Renders font dynamically. The transform value may change between calls to onRender. */
var FontRenderer=SubmeshRenderer.extend({
	init: function(context, matrix, submesh, material) {
		this._super(context, matrix, submesh, material);
		this.fontData=false;
	},

	/** Renders mesh geometry with material */
	onRender: function(context) {
		var globalSamplers = this.getGlobalSamplers(context);
		var uniforms=this.getDefaultUniforms(context);
		uniforms['page']=this.submesh.page;
		this.material.bind(uniforms, this.material.samplers);
		try {
			this.buffer.render(this.material.shader);
		}
		catch(e) {
			if(this.failed) return;
			this.failed=true;
			console.warn("Failed to render buffer: ", this.buffer);
			console.warn('material: ', this.material.name, this.material);
			console.warn('positions: ', this.submesh.positions.length);
			console.warn('normals: ', this.submesh.normals.length);
			console.warn('texcoords: ', this.submesh.texCoords2D);
			console.warn('faces: ', this.submesh.faces.length);
			console.warn(e);
		}
		this.material.unbind(globalSamplers);
	}
});