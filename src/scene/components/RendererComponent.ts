import Component from 'scene/components/Component';
import Engine from "../../engine/Engine";

class RendererComponent extends Component {
	castShadows: boolean;
	receiveShadows: any;
	lightContribution: any;
	reflectivity: any;
	private previousCastShadows: boolean;

	constructor() {
		super();
		this.castShadows = true;
		this.receiveShadows = true;
		this.lightContribution = 1.0;
		this.reflectivity = 0.0;
		this.previousCastShadows = true;
	}

	type(): any {
		return "RendererComponent";
	}

	onEnable() {
		this.getScene()?.dynamicSpace.damage();
	}

	onDisable() {
		this.getScene()?.dynamicSpace.damage();
	}

	instantiate(): any {
		var instance = super.instantiate();
		instance.setCastShadows(this.castShadows);
		instance.receiveShadows = this.receiveShadows;
		instance.lightContribution = this.lightContribution;
		instance.reflectivity = this.reflectivity;
		return instance;
	}

	setCastShadows(castShadows: boolean) {
		this.castShadows = castShadows;
		this.previousCastShadows = castShadows;
		this.getScene()?.dynamicSpace.damage();
	}

	onUpdate(engine: Engine) {
		// Backwards compatibility
		if (this.castShadows !== this.previousCastShadows) {
			this.previousCastShadows = this.castShadows;
			this.getScene()?.dynamicSpace.damage();
		}
	}

	onContextRestored(context) {}
}

globalThis.RendererComponent = RendererComponent;
export default RendererComponent;
