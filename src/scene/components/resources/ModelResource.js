/** ModelResource component */
var ModelResource=Resource.extend({
	init: function() {
		this._super();
		this.descriptor=new ModelDescriptor();	// One of the descriptor types
		this.model=false;
	},
	
	type: function() {
		return "ModelResource";
	},
	
	excluded: function() {
		return this._super().concat(['model', 'engine']);
	},
	
	/** Starts loading the resource 
		@param callback Optional callback called after model has been loaded. Called with arguments (context, engine) */
	load: function(callback) {
		if(!this.descriptor.source) return;
		
		var me=this;
		this.model=this.engine.assetsManager.modelsManager.addDescriptor(this.descriptor);
		
		this.engine.assetsManager.load(function() {
			me.node.addNode(me.model);
			me.onLoaded();
			if(callback) callback(me.engine.context, me.engine);
		});
	},
	
	onStart: function(context, engine) {
		this.engine=engine;
		this.load();
	},
	
	/** Called when model has been loaded */
	onLoaded: function() {}
});