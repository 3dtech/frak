import Serializable from 'scene/Serializable';
import Node from 'scene/Node';
import DynamicSpace from 'rendering/spaces/DynamicSpace';
import MeshComponent from 'scene/components/MeshComponent';
import Light from 'scene/components/Light';
import Camera, { RenderCallback } from 'rendering/camera/Camera';
import Engine from 'engine/Engine';
import Color from 'rendering/Color';
import PerspectiveCamera from './components/PerspectiveCamera';
import DirectionalLight from './lights/DirectionalLight';
import RendererOrganizer from '../rendering/camera/RendererOrganizer';
import CameraComponent from './components/CameraComponent';
import AmbientLight from './lights/AmbientLight';
import ImageBasedLight from './lights/ImageBasedLight';
import RenderingContext from '../rendering/RenderingContext';
import ImmersiveCamera from './components/ImmersiveCamera';
import Material from '../rendering/materials/Material';

/** Scene keeps track of components and nodes, cameras etc */
class Scene extends Serializable {
	root = new Node();
	dynamicSpace = new DynamicSpace();
	organizer = new RendererOrganizer();
	rendererDamage = -1;
	camera: Camera;
	cameras: CameraComponent[] = [];
	cameraComponent: CameraComponent;
	defaultCamera: PerspectiveCamera;
	immersiveCamera: ImmersiveCamera;
	lights: Light[] = [];
	ambientLights: AmbientLight[] = [];
	directionalLights: DirectionalLight[] = [];
	imageBasedLights: ImageBasedLight[] = [];
	pointLights: any = []; // TODO
	/** If scene is being started, it is set to true */
	starting = false;
	/** If scene has started, it's set to true */
	started = false;
	startingQueue: any;
	components: any;
	preRenderedComponents: any;
	postRenderedComponents: any;
	updatedComponents: any;
	processPreRenderList: RenderCallback;
	processPostRenderList: RenderCallback;
	cameraNode: Node;
	lightNode: any;
	light: any;
	xrFrame?: XRFrame;

	constructor(public engine: Engine) {
		super();
		this.root.scene = this;
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

		// Create default camera node and add camera component to it
		this.root.name="Root";

		this.cameraNode=new Node("Camera");
		this.defaultCamera=this.cameraNode.addComponent(new PerspectiveCamera());
		this.camera=this.defaultCamera.camera;	///< Main camera used for rendering scene. Beware! This is not camera component meaning that its view matrix gets overwritten by camera component each frame
		this.cameraComponent = this.defaultCamera;
		this.immersiveCamera = this.cameraNode.addComponent(new ImmersiveCamera(new Camera(mat4.create(), mat4.create())));
		this.root.addNode(this.cameraNode);

		this.lightNode=new Node("Light");
		this.light=new DirectionalLight();
		this.light.color= new Color(1, 1, 1, 1);
		this.light.intensity = 1.0;
		this.light.setLightDirection(vec3.fromValues(0.9, 1.0, 0.9));
		this.lightNode.addComponent(this.light);
		this.root.addNode(this.lightNode);
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

			var timer = function() {
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

	initCameras(context: RenderingContext, program: WebGLProgram) {
		for (const camera of this.cameras) {
			camera.init(context, program);
		}

		this.defaultCamera.init(context, program);
		this.immersiveCamera.init(context, program);
	}

	/** Called to render the scene. */
	render(context: RenderingContext, camera: CameraComponent, frame?: XRFrame) {
		if (!this.started) {
			return;
		}

		// Batch renderers if the space has changed
		if (this.dynamicSpace.damaged !== this.rendererDamage) {
			this.rendererDamage = this.dynamicSpace.damaged;
			this.organizer.batch(this.dynamicSpace.renderers);
		}

		// Render other cameras
		let c: CameraComponent;
		for (let cameraIndex = 0; cameraIndex < this.cameras.length; ++cameraIndex) {
			c = this.cameras[cameraIndex];
			c.render(context, this, this.processPreRenderList, this.processPostRenderList);
		}

		this.xrFrame = frame;
		camera.render(context, this, this.processPreRenderList, this.processPostRenderList);
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
		var result: Material[] = [];

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
