import Serializable from 'scene/Serializable.js'
import Camera from 'rendering/camera/Camera.js'
import Engine from 'engine/Engine.js'


class Component extends Serializable {
	updatePasses: any;
	started: any;
	node: any;
	enabled: any;
	
	/** Constructor. NOTE! When overriding the constructor of Component ALWAYS call this._super() to
		call parent constructor, because otherwise for example onStart/onEnd methods won't work as
		expected and other functionality may be broken. */
	constructor() {
		super();
		this.updatePasses=1;		// Number of passes the onUpdate method is called. If onUpdate does nothing, set this to 0 to avoid unnecessary call to onUpdate
		this.started=false;
		this.node=false;
		this.enable();
	}

	excluded(): any {
		return ["started", "node"];
	}

	// Getters
	getScene(): any {
		return this.node.scene;
	}

	// Methods
	/** Call to enable the component */
	enable(): any {
		if(!this.enabled && this.started) this.onEnable();
		this.enabled=true;
	}

	/** Call to disable the component */
	disable(): any {
		if(this.enabled && this.started) this.onDisable();
		this.enabled=false;
	}

	/** Creates a new instance of the component */
	instantiate(): any {
		var instance=this.clone();
		return instance;
	}

	// Events
	/** Called when component is added to a node
		@param node New parent node */
	onAdd(node): any {}

	/** Called when component is removed from a node
		@param node Old parent node */
	onRemove(node): any {}

	/** Called when component is added to a node that is in the scene or
		if node is added to the scene
		@param node Parent node */
	onAddScene(node): any {}

	/** Called when component is removed from a node that is in the scene or
		if parent node is removed to the scene
		@param node Parent node */
	onRemoveScene(node): any {}

	/** Called when component is enabled and it was previously disabled */
	onEnable(): any {}

	/** Called when component is disabled and it was previously enabled */
	onDisable(): any {}

	/** Called on node immediately after engine has been started or when
		node is added to the scene after engine has been started.

		IMPORTANT NOTE!
		There is no guarantee that onStart methods of components are called in any particular order.
		In particular, onStart methods of components newly added to the scene may sometimes be called before
		onStart methods of components already in the scene.

		@param context Rendering context
		@param engine Starting engine */
	onStart(context, engine): any {}

	/** Called on node immediately after Component children have started

	@param context Rendering context
	@param engine Starting engine */
	onAfterStart(context, engine): any {}

	/** Calls onStart method. NB! This is intended as final method and called by FRAK internal functions! */
	start(context, engine): any {
		this.onStart(context, engine);
	}

	/** Called on node before onStart is called and before assets manager
		has finished loading.
		@param assetsManager Assets manager that can be used to preload resources
		@param engine Starting engine */
	onLoad(assetsManager, engine): any {}

	/** Called on node immediately before engine is stopped or
		when engine has been started and node is removed from the scene
		@param context Rendering context
		@param engine Stopping engine */
	onEnd(context, engine): any {}

	/** Called before rendering scene with camera
		@param context Rendering context
		@param camera Camera that will be rendered */
	onPreRender(context, camera): any { }

	/** Called after rendering scene with camera
		@param context Rendering context
		@param camera Camera that was rendered */
	onPostRender(context, camera): any { }

	/** Called when transform absolute is updated */
	onUpdateTransform(absolute): any { }

	/** Called when Engine requires update
		@param engine Instance of Engine
		@param pass Update pass */
	onUpdate(engine, pass) { }

}

globalThis.Component = Component;

export default Component;