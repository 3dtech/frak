import Scene from 'scene/Scene.js'
import Node from 'scene/Node.js'
import PerspectiveCamera from 'scene/components/PerspectiveCamera.js'
import DirectionalLight from 'scene/lights/DirectionalLight.js'
import Color from 'rendering/Color';

/** Default scene sets is a scene that has automatically created camera node. */

class DefaultScene extends Scene {
	cameraNode: any;
	cameraComponent: any;
	camera: any;
	lightNode: any;
	light: any;

	constructor() {
		super();

		// Create default camera node and add camera component to it
		this.root.name="Root";

		this.cameraNode=new Node("Camera");
		this.cameraComponent=this.cameraNode.addComponent(new PerspectiveCamera());
		this.cameraComponent.aspect=false; // Forces PerspectiveCamera to autodetect aspect ratio
		this.camera=this.cameraComponent.camera;	///< Main camera used for rendering scene. Beware! This is not camera component meaning that its view matrix gets overwritten by camera component each frame
		this.root.addNode(this.cameraNode);

		this.lightNode=new Node("Light");
		this.light=new DirectionalLight();
		this.light.color= new Color(1, 1, 1, 1);
		this.light.intensity = 1.0;
		this.light.setLightDirection(vec3.fromValues(0.9, 1.0, 0.9));
		this.lightNode.addComponent(this.light);
		this.root.addNode(this.lightNode);
	}

}

globalThis.DefaultScene = DefaultScene;

export default DefaultScene;
