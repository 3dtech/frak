import EmptyNode from 'scene/EmptyNode';
import Transform from 'scene/components/Transform';
import BoundingBox from 'scene/geometry/BoundingBox';
import MeshRendererComponent from 'scene/components/MeshRendererComponent';
import BoundingSphere from 'scene/geometry/BoundingSphere';

/** Scene-node class that keeps transformation, subnodes and components. */
class Node extends EmptyNode {
	isInstanced: boolean;
	localCollisionID: any;

	/** Constructs new node */
	constructor(name?) {
		super(name);
		this.name=name?name:"Node";
		this.transform=this.addComponent(new Transform());
		this.localCollisionID = -1; // This is used to map nodes in the model sub-graph
	}

	excluded(): any {
		return super.excluded().concat(["transform"]);
	}

	type(): any {
		return "Node";
	}

	// --------- Methods ---------
	/** Calculates axis-aligned bounding-box of this node and all its subnodes */
	getBoundingBox(excludeInvisible): any {
		var bb = new BoundingBox();
		this.onEachChildComponent(function (c) {
			if (c instanceof MeshRendererComponent) bb.encapsulateBox(c.getBoundingBox(excludeInvisible));
		});
		return bb;
	}

	/** Calculates bounding-sphere of this node and all its subnodes */
	getBoundingSphere(excludeInvisible): any {
		var bb = new BoundingSphere();
		this.onEachChildComponent(function (c) {
			if (c instanceof MeshRendererComponent) bb.encapsulateSphere(c.getBoundingSphere(excludeInvisible));
		});
		return bb;
	}

	instantiate(): any {
		var instance = new Node(this.name);
		instance.isInstanced = true;
		instance.localCollisionID = this.localCollisionID;
		instance.removeComponentsByType(Transform);
		instance.layer = this.layer;
		instance.tags = this.tags.slice(0);
		for (var i=0; i<this.subnodes.length; i++) {
			instance.addNode(this.subnodes[i].instantiate());
		}
		for (var c=0; c<this.components.length; c++) {
			instance.addComponent(this.components[c].instantiate());
		}
		instance.transform = instance.getComponent(Transform);
		return instance;
	}


	/** Updates absolute transforms of all child-nodes */
	updateChildTransforms(): any {
		var index, c, l1, l2, subnode;
		var absolute = this.transform.absolute;
		var subnodes = this.subnodes;
		for (index = 0, l1 = subnodes.length; index < l1; index++) {
			subnode = subnodes[index];
			if(!subnode.transform) continue;

			mat4.multiply(subnode.transform.absolute, absolute, subnode.transform.relative);
			subnode.updateChildTransforms();
		}

		for (c = 0, l2 = this.components.length; c < l2; c++) {
			this.components[c].onUpdateTransform(absolute);
		}
	}

	/** Sets absolute position of attached transform component
		@param position Absolute position as vec3 */
	setAbsolutePosition(position) {
		if(!this.parent || !this.parent.transform) {	// No parent given
			this.transform.calculateRelativeFromAbsolute();
			return;
		}
		// This one loses scale:
		mat4.fromRotationTranslationScale(this.transform.absolute, quat.fromMat4(quat.create(), this.transform.absolute), position, mat4.getScale(vec3.create(), this.transform.absolute));
		this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute);
	}
}

(globalThis as any).Node = Node;
export default Node;
