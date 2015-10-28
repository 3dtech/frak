/**
 * Helper class for constructing the parser result.
 **/
var DataParserResult=FrakClass.extend({
	init: function() {
		this.data={
			'meshes': [],
			'materials': [],
			'hierarchy': false,
			'collision': false,
			'hierarchyNodesByID': {}
		};
	},

	getData: function() {
		return this.data;
	},

	linkReferences: function() {
		for (var i in this.data.meshes) {
			if (this.data.meshes[i].material!=-1 &&
				this.data.meshes[i].material in this.data.materials)
			this.data.meshes[i].material=this.data.materials[this.data.meshes[i].material];
		}
		if (this.data.hierarchy!==false) {
			var scope = this;
			var linkMeshesToGroups = function(group) {
				for (var i in group.meshes) {
					if (group.meshes[i]>=0 && group.meshes[i] in scope.data.meshes)
						group.meshes[i]=scope.data.meshes[group.meshes[i]];
				}
				for (var j in group.children) {
					linkMeshesToGroups(group.children[j]);
				}
			}
			linkMeshesToGroups(this.data.hierarchy);
		}
	},

	createGroup: function() {
		return {
			'name': "",
			'id': false,
			'parent': false,
			'children': [],
			'meshes': [],
			'position': {x:0.0, y:0.0, z:0.0},
			'rotation': {x:0.0, y:0.0, z:0.0, w:0.0},
			'scale': {x:0.0, y:0.0, z:0.0},
			'transform': false
		};
	},

	mapGroupID: function(group) {
		this.data.hierarchyNodesByID[group.id]=group;
	},

	setRoot: function(group) {
		this.data.hierarchy=group;
	},

	createMaterialTexture: function() {
		return {
			'path': false,
			'scale': {u:1.0, v:1.0, w:1.0}
		};
	},

	createMaterial: function() {
		return {
			'name': '',
			'color': {
				'ambient' : false,
				'diffuse' : false,
				'specular': false,
				'emissive': false
			},
			'twosided': false,
			'shininess': 0,
			'shininess_strength': 0,
			'shader': false,
			'textures': {
				'ambient': [],
				'diffuse': [],
				'specular':[],
				'emissive':[],
				'normal':[],
				'height':[],
				'shininess':[],
				'opacity':[],
				'displacement':[],
				'lightmap':[],
				'reflection':[]
			}
		};
	},

	addMaterial: function(material) {
		this.data.materials.push(material);
	},

	getMaterial: function(index) {
		if (index>=0 && index<this.data.materials.length)
			return this.data.materials[index];
		return false;
	},

	createMesh: function(numPoints) {
		var mesh={
			'index': -1,
			'material': -1,
			'indices': [],
			'vertices': []
		};
		for (var i=0; i<numPoints; i++)
			mesh.vertices.push(this.createVertex());
		return mesh;
	},

	createVertex: function() {
		return {
			'position': {x:0.0, y:0.0, z:0.0},
			'normal': {x:0.0, y:0.0, z:0.0},
			'texCoord': [],
			'tangent': {x:0.0, y:0.0, z:0.0},
			'bitangent': {x:0.0, y:0.0, z:0.0}
		};
	},

	addMesh: function(mesh) {
		this.data.meshes.push(mesh);
		mesh.index=this.data.meshes.length-1;
	},

	createCollisionTreeNode: function() {
		return {
			'parent': false,
			'children': [],
			'center': {x:0.0, y:0.0, z:0.0},
			'extents': {x:0.0, y:0.0, z:0.0},
			'faces': false
		};
	},

	addFaceList: function(collisionNode, nodeID, meshID, indices) {
		if (nodeID<0 || meshID<0 || indices.length==0)
			return false;
		if (collisionNode.faces===false)
			collisionNode.faces={};
		if (!(nodeID in collisionNode.faces))
			collisionNode.faces[nodeID]={};
		if (!(meshID in collisionNode.faces[nodeID]))
			collisionNode.faces[nodeID][meshID]=[];
		collisionNode.faces[nodeID][meshID]=collisionNode.faces[nodeID][meshID].concat(indices);
		return true;
	},

	setCollisionTreeRoot: function(node) {
		this.data.collision=node;
	}
});