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
			console.log("Failed to render buffer: ", this.buffer);
			console.log('material: ', this.material.name, this.material);
			console.log('positions: ', this.submesh.positions.length);
			console.log('normals: ', this.submesh.normals.length);
			console.log('texcoords: ', this.submesh.texCoords2D);
			console.log('faces: ', this.submesh.faces.length);
			console.log(e);
		}
		this.material.unbind(globalSamplers);
	}
});