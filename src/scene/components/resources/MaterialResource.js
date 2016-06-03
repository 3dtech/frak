/** Resource component */
var MaterialResource=Resource.extend({
	init: function() {
		this._super();
		this.descriptor=new MaterialSourceDescriptor();	// One of the descriptor types
		this.material=false;
		this.engine=false;
	},
	
	excluded: function() {
		return this._super().concat(['material', 'engine']);
	},
	
	type: function() {
		return "MaterialResource";
	},
	
	/** Starts loading the resource 
		@param callback Optional callback called after texture has been loaded. Called with arguments (context, engine) */
	load: function(callback) {
		var me=this;
		this.texture=this.engine.assetsManager.materialSourcesManager.addDescriptor(this.descriptor);
		this.engine.assetsManager.load(function() { me.onLoaded(); if(callback) callback(me.engine.context, me.engine); });
	},
	
	onStart: function(context, engine) {
		this.engine=engine;
		this.load();
	},
	
	/** Called when texture has been loaded */
	onLoaded: function() {}
});