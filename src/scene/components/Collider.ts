import Component from 'scene/components/Component';

/**
 * Base collider class
 */
class Collider extends Component {
	constructor() {
		super();
	}

	type(): any {
		return "Collider";
	}

	onStart(context, engine): any {
		this.getScene().dynamicSpace.addCollider(this);
	}

	onEnd(context, engine): any {
		this.getScene().dynamicSpace.removeCollider(this);
	}

	/** Tests if ray collides with this collider
		@param ray Instance of Ray in world space
		@param result Instance of RayTestResult (optional)
		@param collideInvisible If true, invisible colliders are evaluated as well (optional)
		@return True if ray intersects this collider */
	rayTest(ray, result, collideInvisible) {
		return false;
	}
}

globalThis.Collider = Collider;
export default Collider;
