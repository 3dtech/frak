/** Attributes required by the shader for executing. These are mostly used to generate
	missing tangents, bitangents or barycentric coordinates as required by shader. */
var ShaderRequirements=FrakClass.extend({
	/** Constructor */
	init: function() {
		this.barycentric=false;
		this.bitangents=false;
		this.tangents=false;
		this.transparent=false;
		this.texCoords2D=true;
	},
	
	/** Applies shader requirements on render-buffer */
	apply: function(renderBuffer) {
		if(this.barycentric && !renderBuffer.buffers['barycentric']) renderBuffer.generateBarycentric();
		if(this.texCoords2D && !renderBuffer.buffers['texcoord2d0']) renderBuffer.generateTexCoords();
	}
});