var RendererComponent=Component.extend({
	init: function() {
		this._super();
		this.castShadows=true;
	},
	
	type: function() {
		return "RendererComponent";
	},
	
	instantiate: function() {
		var instance=this._super();
		instance.castShadows=this.castShadows;
		return instance;
	}
});