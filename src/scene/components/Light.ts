import Component from 'scene/components/Component';
import Color from 'rendering/Color';
import Material from "../../rendering/materials/Material";

/** Base class for all lights */
class Light extends Component {
	color: any;
	intensity: any;
	shadowCasting: any;
	shadowMask: any;
	damaged: any;
	material: Material;

	constructor() {
		super();
		this.color = new Color(1.0, 1.0, 1.0, 1.0);
		this.intensity = 1.0;
		this.shadowCasting = false;
		this.shadowMask = 0xFFFFFFFF;
		this.damaged = true;
	}

	type(): any {
		return "Light";
	}

	onAddScene(node): any {
		node.scene.lights.push(this);
	}

	onRemoveScene(node): any {
		var lights = node.scene.lights;
		for (var i=0; i<lights.length; i++) {
			if (lights[i]==this) {
				lights.splice(i, 1);
				i--;
			}
		}
	}

	isPositional(): any {
		return false;
	}

	onContextRestored(context): any {}

	damage(): any {
		this.damaged = true;
	}

	undamage() {
		this.damaged = false;
	}
}

globalThis.Light = Light;
export default Light;
