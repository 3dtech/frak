var RendererComponent=Component.extend({
	init: function() {
		this._super();
		this.castShadows = true;
		this.receiveShadows = true;
		this.lightContribution = 1.0;
	},

	type: function() {
		return "RendererComponent";
	},

	instantiate: function() {
		var instance=this._super();
		instance.castShadows = this.castShadows;
		instance.receiveShadows = this.receiveShadows;
		instance.lightContribution = this.lightContribution;
		return instance;
	}
});