/** Spatially indexed mesh collider component for large meshes with unchanging geometry */
var LargeMeshCollider=Collider.extend({
	/** Constructor
		@param mesh Instance of {Mesh} [optional] */
	init: function(mesh) {
		this._super();
		this.tree = false;
		this.meshes = [];
		this.damaged = false;

		// internal cache
		this.invMat = mat4.create();

		// if (mesh) {
		// 	for (var i in mesh.submeshes)
		// 		this.meshes.push(mesh.submeshes[i]);
		// 	this.createRootNode(mesh.boundingBox);
		// 	this.processMeshes();
		// }
	},

	type: function() {
		return "LargeMeshCollider";
	},

	excluded: function() {
		return this._super().concat(["tree", "meshes"]); // TODO: make the collision tree serializable
	},

	isComplete: function() {
		return (this.tree!==false && this.meshes.length==0);
	},

	onAdd: function(node) {
		this._super();

		if (this.damaged) {
			// Remap the nodes in the collision tree to nodes in this sub-tree
			var root = this.node;
			function findSubnodeWithCollisionID(id) {
				var needle = null;
				root.onEachChild(function (subnode) {
					if (subnode.localCollisionID === id) {
						needle = subnode;
						return true;
					}
				});
				return needle;
			}

			for (var i in this.tree.nodes) {
				var id = this.tree.nodes[i].localCollisionID;
				if (id < 0)
					continue;
				this.tree.nodes[i] = findSubnodeWithCollisionID(id);
			}

			this.damaged = false;
		}

		// if (this.tree===false)
		// 	this.rebuild();
	},

	clone: function() {
		var lmc = new LargeMeshCollider();
		if (this.tree) {
			lmc.tree = this.tree.clone();
			lmc.damaged = true;
		}
		return lmc;
	},

	// rebuild: function() {
	// 	this.meshes.length=0;

	// 	var bounds = new BoundingBox();
	// 	var scope=this;
	// 	this.node.onEachComponent(function(component) {
	// 		if (component instanceof MeshComponent) {
	// 			bounds.encapsulateBox(component.mesh.boundingBox);
	// 			for(var i in component.mesh.submeshes)
	// 				scope.meshes.push(component.mesh.submeshes[i]);
	// 		}
	// 	});
	// 	this.createRootNode(bounds);
	// 	this.processMeshes();
	// },

	// processMeshes: function() {
	// 	if (this.tree && this.meshes.length>0) {
	// 		var mesh = this.meshes.pop();
	// 		this.tree.addSubmesh(mesh);
	// 		if (this.meshes.length==0) {
	// 			this.tree.optimize();
	// 		} else {
	// 			setTimeout(FrakCallback(this, this.processMeshes), 100);
	// 		}
	// 	}
	// },

	// createRootNode: function(bounds) {
	// 	var size = Math.ceil(Math.max(bounds.size[0], bounds.size[1], bounds.size[2]));
	// 	this.tree = new CollisionOctreeNode(bounds.center, size);
	// },

	/** Tests if ray collides with this collider
		@param ray Instance of Ray in world space
		@param result Instance of RayTestResult (optional)
		@param collideInvisible If true, invisible colliders are evaluated as well (optional)
		@return True if ray intersects this collider */
	rayTest: function(ray, result, collideInvisible) {
		if (!this.enabled || !this.isComplete())
			return false;

		var localRay = ray.clone();
		mat4.invert(this.invMat, this.node.transform.absolute);
		localRay.transform(this.invMat);
		var collision=this.tree.getNearestRayCollision(localRay, ray);
		if (collision.t==Infinity || collision.t==-Infinity)
			return false;
		if (result && collision) {
			var p = localRay.getPointOnRay(collision.t);
			vec3.transformMat4(p, p, this.node.transform.absolute);
			result.hits.push({
				'point': p,
				'collider': this,
				'submesh': collision.submesh,
				'node': collision.node,
				'normal': collision.normal
			});
		}
		return (collision!==false);
	}
});
