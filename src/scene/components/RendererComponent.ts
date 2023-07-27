import Component from 'scene/components/Component.js'


class RendererComponent extends Component {
	castShadows: any;
	receiveShadows: any;
	lightContribution: any;
	reflectivity: any;
	customShader: any;
	
	constructor() {
		super();
		this.castShadows = true;
		this.receiveShadows = true;
		this.lightContribution = 1.0;
		this.reflectivity = 0.0;
		this.customShader = false;
	}

	type(): any {
		return "RendererComponent";
	}

	instantiate(): any {
		var instance = super.instantiate();
		instance.castShadows = this.castShadows;
		instance.receiveShadows = this.receiveShadows;
		instance.lightContribution = this.lightContribution;
		instance.reflectivity = this.reflectivity;
		instance.customShader = this.customShader;
		return instance;
	}

	onContextRestored(context) {}

}

globalThis.RendererComponent = RendererComponent;

export default RendererComponent;