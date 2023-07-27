import Component from 'scene/components/Component.js'

/** Resource component */

class Resource extends Component {
	descriptor: any;
	
	constructor() {
		super();
		this.descriptor=false;	// One of the descriptor types
	}
	
	excluded(): any {
		return super.excluded().concat(["resource"]);
	}
	
	type() {
		return "ResourceComponent";
	}

}

globalThis.Resource = Resource;

export default Resource;