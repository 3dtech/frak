import Component from 'scene/components/Component';

/** MeshComponent is used to keep mesh that can be accessed by rendering or collider components */
class MeshComponent extends Component {
	mesh: any;

	constructor(mesh) {
		super();
		this.mesh=mesh;
	}

	type(): any {
		return "MeshComponent";
	}

	instantiate() {
		var c=super.instantiate();
		c.mesh=this.mesh;
		return c;
	}
}

globalThis.MeshComponent = MeshComponent;
export default MeshComponent;
