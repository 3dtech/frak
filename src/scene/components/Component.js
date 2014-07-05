var Component=Serializable.extend({
	/** Constructor. NOTE! When overriding the constructor of Component ALWAYS call this._super() to 
		call parent constructor, because otherwise for example onStart/onEnd methods won't work as 
		expected and other functionality may be broken. */
	init: function() {
		this._super();
		this.updatePasses=1;		// Number of passes the onUpdate method is called. If onUpdate does nothing, set this to 0 to avoid unnecessary call to onUpdate
		this.started=false;
		this.node=false;
		this.enable();
	},
	
	excluded: function() {
		return ["started", "node"];
	},
	
	// Getters
	getScene: function() {
		return this.node.scene;
	},
	
	// Methods
	/** Call to enable the component */
	enable: function() {
		if(!this.enabled) this.onEnable();
		this.enabled=true;
	},
	
	/** Call to disable the component */
	disable: function() {
		if(this.enabled) this.onDisable();
		this.enabled=false;
	},
	
	/** Creates a new instance of the component */
	instantiate: function() {
		var instance=this.clone();
		return instance;
	},
	
	// Events
	/** Called when component is added to a node 
		@param node New parent node */
	onAdd: function(node) {},
	
	/** Called when component is removed from a node 
		@param node Old parent node */
	onRemove: function(node) {},
	
	/** Called when component is added to a node that is in the scene or 
		if node is added to the scene
		@param node Parent node */
	onAddScene: function(node) {},
	
	/** Called when component is removed from a node that is in the scene or 
		if parent node is removed to the scene
		@param node Parent node */
	onRemoveScene: function(node) {},
	
	/** Called when component is enabled and it was previously disabled */
	onEnable: function() {},
	
	/** Called when component is disabled and it was previously enabled */
	onDisable: function() {},
	
	/** Called on node immediately after engine has been started or when 
		node is added to the scene after engine has been started.
		
		IMPORTANT NOTE!
		There is no guarantee that onStart methods of components are called in any particular order.
		In particular, onStart methods of components newly added to the scene may sometimes be called before
		onStart methods of components already in the scene. 
		
		@param context Rendering context
		@param engine Starting engine */
	onStart: function(context, engine) {},
	
	/** Calls onStart method. NB! This is intended as final method and called by FRAK internal functions! */
	start: function(context, engine) {
		this.onStart(context, engine);
	},
	
	/** Called on node before onStart is called and before assets manager
		has finished loading.
		@param assetsManager Assets manager that can be used to preload resources
		@param engine Starting engine */
	onLoad: function(assetsManager, engine) {},
	
	/** Called on node immediately before engine is stopped or 
		when engine has been started and node is removed from the scene
		@param context Rendering context 
		@param engine Stopping engine */
	onEnd: function(context, engine) {},
	
	/** Called before rendering scene with camera
		@param context Rendering context 
		@param camera Camera that will be rendered */
	onPreRender: function(context, camera) { },
	
	/** Called after rendering scene with camera
		@param context Rendering context 
		@param camera Camera that was rendered */
	onPostRender: function(context, camera) { },
	
	/** Called when transform absolute is updated */
	onUpdateTransform: function(absolute) { },
	
	/** Called when Engine requires update
		@param engine Instance of Engine
		@param pass Update pass */
	onUpdate: function(engine, pass) { }
});