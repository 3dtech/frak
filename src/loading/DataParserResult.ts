

/**
 * Helper class for constructing the parser result.
 **/

class DataParserResult {
	data: any;
	
	constructor() {
		this.data={
			'meshes': [],
			'materials': [],
			'hierarchy': false,
			'collision': false,
			'hierarchyNodesByID': {}
		};
	}

	getData(): any {
		return this.data;
	}

	linkReferences(): any {
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
	}

	createGroup(): any {
		return {
			'name': "",
			'id': false,
			'parent': false,
			'children': [],
			'meshes': [],
			'position': {x:0.0, y:0.0, z:0.0}
			'rotation': {x:0.0, y:0.0, z:0.0, w:0.0},
			'scale': {x:0.0, y:0.0, z:0.0},
			'transform': false
		};
	},

	mapGroupID(group): any {
		this.data.hierarchyNodesByID[group.id]=group;
	}

	setRoot(group): any {
		this.data.hierarchy=group;
	}

	createMaterialTexture(): any {
		return {
			'path': false,
			'scale': {u:1.0, v:1.0, w:1.0}
		};
	}

	createMaterial(): any {
		return {
			'name': '',
			'color': {
				'ambient' : false,
				'diffuse' : false,
				'specular': false,
				'emissive': false
			}
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

	addMaterial(material): any {
		this.data.materials.push(material);
	}

	getMaterial(index): any {
		if (index>=0 && index<this.data.materials.length)
			return this.data.materials[index];
		return false;
	}

	createMesh(numPoints): any {
		var mesh={
			'index': -1,
			'material': -1,
			'indices': [],
			'vertices': []
		};
		for (var i=0; i<numPoints; i++)
			mesh.vertices.push(this.createVertex());
		return mesh;
	}

	createVertex(): any {
		return {
			'position': {x:0.0, y:0.0, z:0.0}
			'normal': {x:0.0, y:0.0, z:0.0},
			'texCoord': [],
			'tangent': {x:0.0, y:0.0, z:0.0},
			'bitangent': {x:0.0, y:0.0, z:0.0}
		};
	},

	addMesh(mesh): any {
		this.data.meshes.push(mesh);
		mesh.index=this.data.meshes.length-1;
	}

	createCollisionTreeNode(): any {
		return {
			'parent': false,
			'children': [],
			'center': {x:0.0, y:0.0, z:0.0}
			'extents': {x:0.0, y:0.0, z:0.0},
			'faces': false
		};
	},

	addFaceList(collisionNode, nodeID, meshID, indices): any {
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
	}

	setCollisionTreeRoot(node) {
		this.data.collision=node;
	}

}

globalThis.DataParserResult = DataParserResult;

export default DataParserResult;