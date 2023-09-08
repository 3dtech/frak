import Serializable from 'scene/Serializable';
import Node from 'scene/Node';
import DynamicSpace from 'rendering/spaces/DynamicSpace';
import MeshComponent from 'scene/components/MeshComponent';
import Light from 'scene/components/Light';
import Camera from 'rendering/camera/Camera';
import Engine from 'engine/Engine';

/** Scene keeps track of components and nodes, cameras etc */
class Scene extends Serializable {
	root: Node;
	dynamicSpace: DynamicSpace;
	camera: any;
	cameras: any;
	cameraComponent: any;
	lights: any;
	engine: Engine;
	starting: any;
	started: any;
	startingQueue: any;
	components: any;
	preRenderedComponents: any;
	postRenderedComponents: any;
	updatedComponents: any;
	processPreRenderList: any;
	processPostRenderList: any;

	constructor() {
		super();
		this.root = new Node(); ///< Root node of the scene
		this.root.scene = this;
		this.dynamicSpace = new DynamicSpace(); ///< Dynamic space where all the mesh renderers go
		this.cameras = []; ///< Scene cameras
		this.lights = [];
		this.starting = false; ///< If scene is being started, it is set to true
		this.started = false; ///< If scene has started, it's set to true
		this.startingQueue = []; ///< Starting queue where the components that are still starting can be pushed

		this.components = []; ///< List of all components
		this.preRenderedComponents = []; ///< List of components that have defined onPreRender method
		this.postRenderedComponents = []; ///< List of components that have defined onPostRender method
		this.updatedComponents = []; ///< List of components that have defined onPostRender method

		var scope = this;
		// Pre-render components
		this.processPreRenderList = function(context, camera) {
			for(var i = 0; i < scope.preRenderedComponents.length; ++i) {
				var component = scope.preRenderedComponents[i];
				if (component.node.layer & camera.layerMask) {
					context.modelview.push();
					context.modelview.multiply(component.node.transform.absolute);
					component.onPreRender(context, camera);
					context.modelview.pop();
				}
			}
		}

		// Post-render components
		this.processPostRenderList = function(context, camera) {
			for(var i = 0; i < scope.postRenderedComponents.length; ++i) {
				var component = scope.postRenderedComponents[i];
				if (component.node.layer & camera.layerMask) {
					context.modelview.push();
					context.modelview.multiply(component.node.transform.absolute);
					component.onPostRender(context, camera);
					context.modelview.pop();
				}
			}
		}
	}

	fields(): any {
		return ["root"];
	}

	/** Called to start the scene */
	start(context): any {
		if (this.started || this.starting)
			return;
		this.starting = true;

		var me = this;

		this.root.onEachChildComponent(function(component) {
			if (!component.enabled)
				return;
			if (component.started)
				return;
			component.onLoad(me.engine.assetsManager, me.engine);
		});

		var internalStart = function() {
			me.root.updateChildTransforms();

			me.root.onEachChildComponent(function(component) {
				if (!component.enabled)
					return;
				if (component.started)
					return;
				me.startingQueue.push(component);
			});

			var timer = null;
			timer = function() {
				var delay = 50.0;	// Delay 50 milliseconds
				var maximumTime = (new Date()).getTime() + delay;	// Store current time
				while((new Date()).getTime() < maximumTime) {
					if (me.startingQueue.length === 0) {
						me.started = true;
						me.starting = false;
						if (typeof me.engine.sceneStarted === "function"){
							me.engine.sceneStarted();
						}
						return;
					}
					var c = me.startingQueue.shift();
					if (c.started)
						continue;
					c.start(context, me.engine);
					c.started = true;
				}

				setTimeout(timer, 10);
			};
			timer();
		};

		internalStart();
	}

	/** Calls Component.onEnd(context,engine) for all components. */
	end(context, engine): any {
		if (!this.started)
			return;

		this.root.updateChildTransforms();

		this.root.onEachChildComponent(function(component) {
			if (!component.enabled)
				return;
			if (!component.started)
				return;
			component.onEnd(context, engine);
			component.started = false;
		});

		this.started = false;
	}

	/** Called to render all scene cameras. */
	render(context): any {
		if (!this.started)
			return; // Make sure we don't render before starting the scene
		var camera: Camera;

		for (var cameraIndex = 0; cameraIndex < this.cameras.length; ++cameraIndex) {
			camera = this.cameras[cameraIndex];
			camera.render(context, this, this.processPreRenderList, this.processPostRenderList);
		}
	}

	/** Called when updating */
	update(engine): any {
		if (!this.started)
			return; // Not started yet

		var passes = 1;	// Number of update passes

		// TODO: Store components with more than 1 update pass and call onUpdate for these separately
		for (var pass = 0; pass < passes; ++pass) {
			for (var i = 0; i < this.updatedComponents.length; ++i) {
				var component = this.updatedComponents[i];
				if (!component.enabled)
					continue;
				if (pass < component.updatePasses && component.started) {
					component.onUpdate(engine, pass);
				}
				if (passes < component.updatePasses)
					passes = component.updatePasses; // Update maximum passes count
			}
		}

		this.root.updateChildTransforms();
	}

	/** @return All materials used in the scene */
	getMaterials(): any {
		var result = [];

		this.root.onEachChildComponent(
			function(c) {
				if (c instanceof MeshComponent) {
					for (var i in c.mesh.materials)
						result.push(c.mesh.materials[i]);
				}
			}
		);

		return result;
	}

	broadcast(componentType, method, data) {
		data = data || null;

		// Optimization for Light type components
		if (componentType.prototype instanceof Light) {
			var c;
			for (var i=0; i<this.lights.length; i++) {
				c = this.lights[i];
				if (c instanceof componentType && method in c && typeof(c[method]) == 'function') {
					c[method](data);
				}
			}
			return;
		}

		// Generic component broadcast
		this.root.onEachChildComponent(function(c) {
			if (c instanceof componentType && method in c && typeof(c[method]) == 'function') {
				c[method](data);
			}
		});
	}
}

globalThis.Scene = Scene;
export default Scene;
