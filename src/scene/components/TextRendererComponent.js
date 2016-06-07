/** TextRendererComponent is used to add text components to scene rendering spaces */
var TextRendererComponent=MeshRendererComponent.extend({
	type: function() {
		return "TextRendererComponent";
	},

	onContextRestored: function(context) {
		this._super(context);
		var textComponent = this.node.getComponent(TextComponent);
		if (textComponent)
			textComponent.updateText();
	}

});
