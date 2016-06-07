var CollisionOctreeNode=FrakClass.extend({
	/** Constructor
		@param center The center of the node. Instance of {vec3}
		@param size The size of the node. {number}
		@param parent Parent node */
	init: function(center, size, parent) {
		this.parent=false;
		this.depth=0;
		this.subnodes=false;
		this.bounds=false;

		if (parent) {
			this.parent=parent;
			this.root=parent.root;
			this.depth=parent.depth+1;
		} else {
			this.maxDepth = 3;
			this.root = this;
			this.nodes = {}; // Nodes mapped by ID
			this.submeshes = {}; // Submeshes mapped by ID

			// Ugly, but makes quite a difference
			this.cache = [
				vec3.create(),
				vec3.create(),
				vec3.create(),
				vec3.create(),
				vec3.create()
			];
		}

		this.faces=false;
		this.setSize(center, size);
	},

	clone: function(parent) {
		var copy = new CollisionOctreeNode(this.bounds.center, this.bounds.size[0], parent ? parent : false);
		copy.depth = this.depth;

		if (this.nodes) {
			copy.nodes = {};
			for (var nodeID in this.nodes)
				copy.nodes[nodeID] = this.nodes[nodeID];
		}

		if (this.submeshes) {
			copy.submeshes = {};
			for (var meshID in this.submeshes)
				copy.submeshes[meshID] = this.submeshes[meshID];
		}

		copy.faces = this.faces; // XXX: saves memory, but might cause problems with shared data
		// if (this.faces) {
		// 	copy.faces = {};
		// 	for (var nodeID in this.faces) {
		// 		if (!(nodeID in copy.faces))
		// 			copy.faces[nodeID] = {};
		// 		for (var meshID in this.faces[nodeID]) {
		// 			if (!(meshID in copy.faces[nodeID]))
		// 				copy.faces[nodeID][meshID] = [];
		// 			copy.faces[nodeID][meshID] = this.faces[nodeID][meshID];
		// 		}
		// 	}
		// }

		if (this.subnodes) {
			copy.subnodes = [];
			for (var i=0; i<this.subnodes.length; i++) {
				copy.subnodes.push(this.subnodes[i].clone(copy));
			}
		}

		return copy;
	},

	getNodeID: function() {
		var id = "/";
		var subnodeIndex = "root";
		if (this.parent) {
			id = this.parent.getNodeID();
			for (var subnode in this.parent.subnodes) {
				if (this.parent.subnodes[subnode] === this) {
					subnodeIndex = subnode;
					break;
				}
			}
		}
		return '{0}{1}/'.format(id, subnodeIndex);
	},

	setSize: function(center, size) {
		this.bounds = new BoundingBox(center, [size, size, size]);
	},

	isLeaf: function() {
		return (this.subnodes===false);
	},

	hasGeometry: function() {
		return (this.faces!==false);
	},

	subdivide: function() {
		this.subnodes = [];
		var size = this.bounds.size[0]*0.5;
		var extent = size*0.5;
		var c = vec3.create();
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent,  extent,  extent]), size, this)); // RTB
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [-extent,  extent,  extent]), size, this)); // LTB
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent, -extent,  extent]), size, this)); // RBB
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [-extent, -extent,  extent]), size, this)); // LBB
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent,  extent, -extent]), size, this)); // RTF
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [-extent,  extent, -extent]), size, this)); // LTF
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [ extent, -extent, -extent]), size, this)); // RBF
		this.subnodes.push(new CollisionOctreeNode(vec3.add(c, this.bounds.center, [-extent, -extent, -extent]), size, this)); // LBF
	},

	optimize: function() {
		// Remove useless subdivisions
		if (!this.isLeaf()) {
			for (var i in this.subnodes)
				this.subnodes[i].optimize();

			var empty=0;
			for (var i in this.subnodes) {
				if (!this.subnodes[i].hasGeometry() && this.subnodes[i].isLeaf())
					empty++;
			}
			if (empty==8) {
				delete this.subnodes;
				this.subnodes=false;
			}
		}
	},

	// insert: function(i0, i1, i2, meshIndex) {
	// 	if (this.depth==this.root.maxDepth) {
	// 		this.addFace(i0, i1, i2, meshIndex);
	// 		return true;
	// 	}
	// 	if (this.isLeaf())
	// 		this.subdivide();
	// 	var nodes = [];
	// 	for (var i in this.subnodes) {
	// 		if (this.subnodes[i].bounds.intersectsTriangle(this.root.cache[0], this.root.cache[1], this.root.cache[2]))
	// 			nodes.push(this.subnodes[i]);
	// 	}
	// 	if (nodes.length==8) { // insert to this node, because subdividing any further would be useless
	// 		this.addFace(i0, i1, i2, meshIndex);
	// 		return true;
	// 	}
	// 	var success=false;
	// 	for (var i=0; i<nodes.length; i++) {
	// 		if (nodes[i].insert(i0, i1, i2, meshIndex))
	// 			success=true;
	// 	}
	// 	return success;
	// },

	// addFace: function(i0, i1, i2, meshIndex) {
	// 	if (!this.faces)
	// 		this.faces={};
	// 	if (!(meshIndex in this.faces))
	// 		this.faces[meshIndex]=[];
	// 	this.faces[meshIndex].push(i0, i1, i2);
	// 	// console.log("inserting at depth = "+this.depth);
	// },

	// addSubmesh: function(submesh) {
	// 	var meshIndex = this.root.submeshes.indexOf(submesh);
	// 	if (meshIndex == -1) {
	// 		this.root.submeshes.push(submesh);
	// 		meshIndex = this.root.submeshes.length-1;
	// 	}
	// 	var faces = submesh.faces;
	// 	for (var i=0; i<faces.length; i+=3) {
	// 		this.root.cache[0][0]=submesh.positions[faces[i]*3];
	// 		this.root.cache[0][1]=submesh.positions[faces[i]*3+1];
	// 		this.root.cache[0][2]=submesh.positions[faces[i]*3+2];
	// 		this.root.cache[1][0]=submesh.positions[faces[i+1]*3];
	// 		this.root.cache[1][1]=submesh.positions[faces[i+1]*3+1];
	// 		this.root.cache[1][2]=submesh.positions[faces[i+1]*3+2];
	// 		this.root.cache[2][0]=submesh.positions[faces[i+2]*3];
	// 		this.root.cache[2][1]=submesh.positions[faces[i+2]*3+1];
	// 		this.root.cache[2][2]=submesh.positions[faces[i+2]*3+2];
	// 		if (!this.insert(faces[i], faces[i+1], faces[i+2], meshIndex)) {
	// 			return false;
	// 		}
	// 	}
	// 	return true;
	// },

	/** Performs a ray intersection test on this node's bounding box and returns
		the position on the ray or false if the ray does not intersect this node.
		@param ray Instance of {Ray}
		@return position on the given ray (a {number} in the range [0,1]) */
	rayIntersectBounds: function(ray) {
		var dir = ray.getDirection(this.root.cache[0]);
		var tmin = this.root.cache[1];
		var tmax = this.root.cache[2];
		dir[0] = 1.0 / dir[0];
		dir[1] = 1.0 / dir[1];
		dir[2] = 1.0 / dir[2];
		tmin[0] = (this.bounds.min[0]-ray.origin[0])*dir[0];
		tmax[0] = (this.bounds.max[0]-ray.origin[0])*dir[0];
		tmin[1] = (this.bounds.min[1]-ray.origin[1])*dir[1];
		tmax[1] = (this.bounds.max[1]-ray.origin[1])*dir[1];
		tmin[2] = (this.bounds.min[2]-ray.origin[2])*dir[2];
		tmax[2] = (this.bounds.max[2]-ray.origin[2])*dir[2];

		var t0 = Math.max(Math.min(tmin[0], tmax[0]), Math.min(tmin[1], tmax[1]), Math.min(tmin[2], tmax[2]));
		var t1 = Math.min(Math.max(tmin[0], tmax[0]), Math.max(tmin[1], tmax[1]), Math.max(tmin[2], tmax[2]));

		if (t1<0.0 || t0>t1)
			return false;
		if (ray.infinite)
			return t0;

		// This handles rays that start and/or end inside the AABB
		if (t0*t0 > vec3.sqrDist(ray.origin, ray.destination)) {
			if ((ray.origin[0]<this.bounds.min[0] || ray.origin[1]<this.bounds.min[1] || ray.origin[2]<this.bounds.min[2] ||
				ray.origin[0]>this.bounds.max[0] || ray.origin[1]>this.bounds.max[1] || ray.origin[2]>this.bounds.max[2]) &&
				(ray.destination[0]<this.bounds.min[0] || ray.destination[1]<this.bounds.min[1] || ray.destination[2]<this.bounds.min[2] ||
				ray.destination[0]>this.bounds.max[0] || ray.destination[1]>this.bounds.max[1] || ray.destination[2]>this.bounds.max[2]))
				return false;
		}
		return t0;
	},

	rayIntersectGeometry: function(worldRay) {
		if (!this.hasGeometry())
			return false;
		var result = {'submesh': false, 'node': false, 't': Infinity, 'normal': vec3.create()};
		var a=this.root.cache[0];
		var b=this.root.cache[1];
		var c=this.root.cache[2];
		var inv = mat4.create();

		for (var nodeIndex in this.faces) {
			var localRay = worldRay.clone();
			if (!mat4.isIdentity(this.root.nodes[nodeIndex].transform.absolute)) {
				mat4.invert(inv, this.root.nodes[nodeIndex].transform.absolute);
				localRay.transform(inv);
			}
			for (var meshIndex in this.faces[nodeIndex]) {
				var faces = this.faces[nodeIndex][meshIndex];
				var positions = this.root.submeshes[meshIndex].positions;
				for (var i=0; i<faces.length; i+=3) {
					a[0]=positions[faces[i]*3];
					a[1]=positions[faces[i]*3+1];
					a[2]=positions[faces[i]*3+2];
					b[0]=positions[faces[i+1]*3];
					b[1]=positions[faces[i+1]*3+1];
					b[2]=positions[faces[i+1]*3+2];
					c[0]=positions[faces[i+2]*3];
					c[1]=positions[faces[i+2]*3+1];
					c[2]=positions[faces[i+2]*3+2];
					var t=localRay.intersectTriangleDistanceOnly(a, b, c);
					if (t!==false) {
						if (t<result.t) {
							result.t=t;
							result.submesh=this.root.submeshes[meshIndex];
							result.node=this.root.nodes[nodeIndex];
							vec3.cross(result.normal, vec3.subtract(this.root.cache[3], b, a), vec3.subtract(this.root.cache[4], c, a));
							vec3.normalize(result.normal, result.normal);
						}
					}
				}
			}
		}
		return result;
	},

	/** Returns a list of nodes intersected by the given ray that have geometry.
		The list is ordered from nearest to furthest based on the nearest intersection point with the ray.
		The list will contain objects in the form of {t: <numerical distance on the ray>, node: {OctreeNode} reference}
		@param ray Instance of {Ray}
		@param list A reference to an {Array} where the intersected nodes will be stored. */
	getNodesWithGeometry: function(ray, list) {
		var t = this.rayIntersectBounds(ray);
		if (t!==false) {
			if (this.hasGeometry()) {
				var i=0;
				for (; i<list.length; i++) {
					if (list[i].t>t)
						break;
				}
				list.splice(i, 0, {'t': t, 'octreeNode': this});
			}
			if (!this.isLeaf()) {
				for (var i in this.subnodes)
					this.subnodes[i].getNodesWithGeometry(ray, list);
			}
		}
	},

	/** Returns the ray intersection result nearest to the ray's origin.
		@param ray Instance of {Ray}
		*/
	getNearestRayCollision: function(localRay, worldRay) {
		var nodes=[];
		this.getNodesWithGeometry(localRay, nodes);
		var result={'t': Infinity, 'octreeNode': false, 'submesh': false, 'node': false, 'normal': false};
		for (var i=0; i<nodes.length; i++) {
			// Early out for nodes on the same level
			if (result.octreeNode!==false && nodes[i].depth==result.octreeNode.depth && nodes[i].t>result.t) {
				continue;
			}
			var collision=nodes[i].octreeNode.rayIntersectGeometry(worldRay);
			if (collision.t<result.t) {
				result.t=collision.t;
				result.submesh=collision.submesh;
				result.octreeNode=nodes[i].octreeNode;
				result.node=collision.node;
				result.normal=collision.normal;
			}
		}
		return result;
	}
});
