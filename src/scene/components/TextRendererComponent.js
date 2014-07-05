/** TextRendererComponent is used to add text components to scene rendering spaces */
var TextRendererComponent=MeshRendererComponent.extend({
	type: function() {
		return "TextRendererComponent";
	},
	
	createRenderer: function(context, matrix, submesh, material) {
		return new FontRenderer(context, matrix, submesh, material);
	}
});