/** Scene-node class that keeps transformation, subnodes and components. */
var Node = EmptyNode.extend({
	/** Constructs new node */
	init: function(name) {
		this._super(name);
		this.name=name?name:"Node";
		this.transform=this.addComponent(new Transform());
	},

	excluded: function() {
		return this._super().concat(["transform"]);
	},

	type: function() {
		return "Node";
	},

	// --------- Methods ---------
	/** Calculates axis-aligned bounding-box of this node and all its subnodes */
	getBoundingBox: function(excludeInvisible) {
		var bb=new BoundingBox();
		this.onEachChildComponent(function(c) {
			if(c instanceof MeshRendererComponent) bb.encapsulateBox(c.getBoundingBox(excludeInvisible));
		});
		return bb;
	},

	/** Calculates bounding-sphere of this node and all its subnodes */
	getBoundingSphere: function(excludeInvisible) {
		var bb=new BoundingSphere();
		this.onEachChildComponent(function(c) {
			if(c instanceof MeshRendererComponent) bb.encapsulateSphere(c.getBoundingSphere(excludeInvisible));
		});
		return bb;
	},

	instantiate: function() {
		var instance=new Node(this.name+' (instance)');
		instance.removeComponentsByType(Transform);
		instance.layer=this.layer;
		instance.tags=this.tags.slice(0);
		for(var n in this.subnodes) {
			instance.addNode(this.subnodes[n].instantiate());
		}
		for(var c in this.components) {
			instance.addComponent(this.components[c].instantiate());
		}
		instance.transform=instance.getComponent(Transform);
		return instance;
	},


	/** Updates absolute transforms of all child-nodes */
	updateChildTransforms: function() {
		var index, c;
		var absolute = this.transform.absolute;
		var subnodes = this.subnodes;
		for (index=0; index<subnodes.length; index++) {
			var subnode=subnodes[index];
			if(!subnode.transform) continue;

			mat4.multiply(subnode.transform.absolute, absolute, subnode.transform.relative);
			subnode.updateChildTransforms();
		}

		for (c=0; c<this.components.length; c++) {
			this.components[c].onUpdateTransform(absolute);
		}
	},

	/** Sets absolute position of attached transform component
		@param position Absolute position as vec3 */
	setAbsolutePosition: function(position) {
		if(!this.parent || !this.parent.transform) {	// No parent given
			this.transform.calculateRelativeFromAbsolute();
			return;
		}
		// This one loses scale:
		mat4.fromRotationTranslationScale(this.transform.absolute, quat.fromMat4(quat.create(), this.transform.absolute), position, mat4.getScale(vec3.create(), this.transform.absolute));
		this.transform.calculateRelativeFromAbsolute(this.parent.transform.absolute);
	}
});

//@ sourceURL=Node.js