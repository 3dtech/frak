import Component from 'scene/components/Component';

class RendererComponent extends Component {
	castShadows: any;
	receiveShadows: any;
	lightContribution: any;
	reflectivity: any;

	constructor() {
		super();
		this.castShadows = true;
		this.receiveShadows = true;
		this.lightContribution = 1.0;
		this.reflectivity = 0.0;
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
		return instance;
	}

	onContextRestored(context) {}
}

globalThis.RendererComponent = RendererComponent;
export default RendererComponent;
