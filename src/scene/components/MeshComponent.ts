import Component from 'scene/components/Component.js'

/** MeshComponent is used to keep mesh that can be accessed by rendering or collider components */

class MeshComponent extends Component {
	mesh: any;
	
	constructor(mesh) {
		this.mesh=mesh;
		super();
	}
	
	type(): any {
		return "MeshComponent";
	}
	
	instantiate() {
		var c=this._super();
		c.mesh=this.mesh;
		return c;
	}

}

globalThis.MeshComponent = MeshComponent;

export default MeshComponent;