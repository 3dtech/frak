import { FrakCallback } from 'FRAK';
import DataParserResult from 'loading/DataParserResult.js'

/**
 * 3DTech DATA format parser
 **/

class DataParser {
	VERSION: any;
	view: any;
	onComplete: any;
	onProgress: any;
	onError: any;
	userdata: any;
	result: any;
	errors: any;
	stack: any;
	linkReferences: any;
	flipX: any;
	warnOnUnknownChunks: any;
	isFunction: any;

	/**
	 * Constructor
	 * @param data - The binary data of the model file
	 * @param cbOnComplete - Callback that will be called when parsing has finished successfully
	 * @param cbOnError - Callback that will be called if the parser encounters an error and aborts the parsing process
	 * @param cbOnProgress - Callback that will be called periodically to notify the external application of the parsing progress
	 * @param userdata - Userdata that will be passed to all callbacks in the last argument
	 */
	constructor(data, cbOnComplete, cbOnError, cbOnProgress, userdata?) {
		this.VERSION = 1;
		this.view=new jDataView(data);
		this.onComplete=cbOnComplete;
		this.onProgress=cbOnProgress;
		this.onError=cbOnError;
		this.userdata=userdata;
		this.result=new DataParserResult();
		this.errors=[];
		this.stack=[];
		this.linkReferences=true;
		this.flipX=false;
		this.warnOnUnknownChunks=true;

		this.isFunction = function(f) {
			return typeof(f) === 'function';
		};
	}

	parse(): any {
		this.push(false, this.parseHeader);
		while(!this.completed()) {
			if (!this.step()) {
				if (this.isFunction(this.onError))
					this.onError(this.errors, this.userdata);
				return false;
			}
		}
		if (this.linkReferences)
			this.result.linkReferences();
		if (this.isFunction(this.onComplete))
			this.onComplete(this.result.getData(), this.userdata);
		return true;
	}

	error(msg): any {
		this.errors.push(msg);
		return false;
	}

	errorExpect(bytes, parameter): any {
		return this.error('Expected at least '+bytes+' byte'+(bytes>1?'s':'')+' for "'+parameter+'"');
	}

	completed(): any {
		if (this.view.tell()==this.view.byteLength)
			return true;
		return false;
	}

	step(): any {
		var call = this.getCurrentCall();
		if (call) {
			var ret=call(this.getCurrentNode());
			if (this.isFunction(this.onProgress))
				this.onProgress((this.view.tell()/this.view.byteLength)*100, this.userdata);
			return ret;
		}
		return false;
	}

	push(node, call): any {
		this.stack.push({'node':node, 'call': FrakCallback(this, call)});
	}

	pop(): any {
		this.stack.pop();
	}

	getCurrentNode(): any {
		if (this.stack.length>0)
			return this.stack[this.stack.length-1].node;
		return false;
	}

	getCurrentCall(): any {
		if (this.stack.length>0)
			return this.stack[this.stack.length-1].call;
		return false;
	}

	hasDataFor(numBytes): any {
		if (this.view.byteLength<this.view.tell()+numBytes)
			return false;
		return true;
	}

	hasDataForNode(node): any {
		if (this.view.byteLength<node.position+node.length+8)
			return false;
		return true;
	}

	getUint32(): any {
		return this.view.getUint32(this.view.tell(), true);
	}

	getFloat32(): any {
		return this.view.getFloat32(this.view.tell(), true);
	}

	getMatrix4x4(): any {
		var mat = [];
		for (var i=0; i<4; i++) {
			mat.push([
				this.getFloat32(),
				this.getFloat32(),
				this.getFloat32(),
				this.getFloat32()
			]);
		}
		return mat;
	}

	getColor(): any {
		return {
			'r': this.view.getFloat32(this.view.tell(), true),
			'g': this.view.getFloat32(this.view.tell(), true),
			'b': this.view.getFloat32(this.view.tell(), true),
			'a': this.view.getFloat32(this.view.tell(), true)
		};
	}

	parseHeader(): any {
		if (!this.view)	return this.error('No data to parse');
		if (!this.parseSignature())	return false;
		var rootNode = this.parseNodeHeader();
		if (rootNode===false) return false;
		if (rootNode.id!==DataParserTypes.NODE_ROOT)
			return this.error('Root node type is incorrect');
		this.push(rootNode, this.parseRoot);
		return true;
	}

	parseSignature(): any {
		if (!this.hasDataFor(12))
			return this.error('Not enough data for 3DTech DATA format header');
		var sig=this.view.getString(10);
		if (sig!='3DTECHDATA')
			return this.error('The data is not in 3DTech DATA format');
		var version=this.view.getInt16(this.view.tell(), true);
		if (version!=this.VERSION)
			return this.error('Incompatible version');
		if (!this.hasDataFor(8))
			return this.error('Could not find root node');
		return true;
	}

	parseNodeHeader(): any {
		if (!this.hasDataFor(8))
			return this.error('Not enough data for parsing node header');
		var position = this.view.tell();
		var id = this.getUint32();
		var length = this.getUint32();
		return new DataParserNode(id, length, position);
	}

	/** Assumes that the reading pointer is right past the node header. */
	skipNode(node): any {
		if (this.warnOnUnknownChunks)
			console.warn('DataParser: skipping node ', DataParserTypes.getName(node.id));
		this.view.seek(this.view.tell()+node.length);
	}

	/** Parses a single material */
	parseMaterial(materialNode): any {
		var material = this.result.createMaterial();
		while (this.view.tell()<materialNode.end()) {
			var param = this.parseNodeHeader();
			switch (param.id) {
				case DataParserTypes.NODE_STRING:
					material.name=this.view.getString(param.length);
					break;
				case DataParserTypes.NODE_SHADER_NAME:
					material.shader=this.view.getString(param.length);
					break;
				case DataParserTypes.NODE_COLOR_AMBIENT:
					if (param.length!=16) return this.error('Ambient color corrupted');
					material.color.ambient=this.getColor();
					break;
				case DataParserTypes.NODE_COLOR_DIFFUSE:
					if (param.length!=16) return this.error('Diffuse color corrupted');
					material.color.diffuse=this.getColor();
					break;
				case DataParserTypes.NODE_COLOR_SPECULAR:
					if (param.length!=16) return this.error('Specular color corrupted');
					material.color.specular=this.getColor();
					break;
				case DataParserTypes.NODE_COLOR_EMISSIVE:
					if (param.length!=16) return this.error('Emissive color corrupted');
					material.color.emissive=this.getColor();
					break;
				case DataParserTypes.NODE_TWOSIDED:
					if (param.length<1) return this.errorExpect(1, 'material.twosided');
					var twosided = this.view.getChar();
					material.twosided=(twosided==0xFF?true:false);
					break;
				case DataParserTypes.NODE_SHININESS:
					if (param.length<4) return this.errorExpect(4, 'material.shininess');
					material.shininess=this.getFloat32();
					break;
				case DataParserTypes.NODE_SHININESS_STRENGTH:
					if (param.length<4) return this.errorExpect(4, 'material.shininess_strength');
					material.shininess_strength=this.getFloat32();
					break;
				case DataParserTypes.NODE_TEXTURES_AMBIENT:
					this.parseMaterialTextures(param, material.textures.ambient);
					break;
				case DataParserTypes.NODE_TEXTURES_DIFFUSE:
					this.parseMaterialTextures(param, material.textures.diffuse);
					break;
				case DataParserTypes.NODE_TEXTURES_SPECULAR:
					this.parseMaterialTextures(param, material.textures.specular);
					break;
				case DataParserTypes.NODE_TEXTURES_EMISSIVE:
					this.parseMaterialTextures(param, material.textures.emissive);
					break;
				case DataParserTypes.NODE_TEXTURES_NORMALS:
					this.parseMaterialTextures(param, material.textures.normal);
					break;
				case DataParserTypes.NODE_TEXTURES_HEIGHT:
					this.parseMaterialTextures(param, material.textures.height);
					break;
				case DataParserTypes.NODE_TEXTURES_SHININESS:
					this.parseMaterialTextures(param, material.textures.shininess);
					break;
				case DataParserTypes.NODE_TEXTURES_OPACITY:
					this.parseMaterialTextures(param, material.textures.opacity);
					break;
				case DataParserTypes.NODE_TEXTURES_DISPLACEMENT:
					this.parseMaterialTextures(param, material.textures.displacement);
					break;
				case DataParserTypes.NODE_TEXTURES_LIGHTMAP:
					this.parseMaterialTextures(param, material.textures.lightmap);
					break;
				case DataParserTypes.NODE_TEXTURES_REFLECTION:
					this.parseMaterialTextures(param, material.textures.reflection);
					break;
				default:
					this.skipNode(param);
					break;
			}
		}
		this.result.addMaterial(material);
		return true;
	}

	/** Parses material textures */
	parseMaterialTextures(texturesNode, list): any {
		while (this.view.tell()<texturesNode.end()) {
			var textureNode = this.parseNodeHeader();
			if (textureNode.id==DataParserTypes.NODE_TEXTURE) {
				var texture = this.result.createMaterialTexture();
				while (this.view.tell()<textureNode.end()) {
					var node = this.parseNodeHeader();
					switch(node.id) {
						case DataParserTypes.NODE_STRING:
							texture.path=this.view.getString(node.length);
							break;
						case DataParserTypes.NODE_TEXTURE_SCALE:
							if (node.length!=12) return this.error('Texture scale is corrupted');
							texture.scale.u=this.getFloat32();
							texture.scale.v=this.getFloat32();
							texture.scale.w=this.getFloat32();
							break;
						default:
							this.skipNode(node);
							break;
					}
				}
				if (texture.path!==false)
					list.push(texture);
			} else {
				this.skipNode(textureNode);
			}
		}
		return true;
	}

	/** Parses the materials section of the data */
	parseMaterials(materialsNode): any {
		if (!this.hasDataForNode(materialsNode)) {
			return this.error("Not enough data for node '"+DataParserTypes.getName(materialsNode.id)+"'");
		}

		while (this.view.tell()<materialsNode.end()) {
			var node = this.parseNodeHeader();
			if (node.id==DataParserTypes.NODE_MATERIAL) {
				this.parseMaterial(node);
			} else {
				this.skipNode(node);
			}
		}
		this.pop();
		return true;
	}

	/** Parses the geometry section of the data */
	parseGeometry(geometryNode): any {
		if (!this.hasDataForNode(geometryNode))
			return this.error("Not enough data for node '"+DataParserTypes.getName(geometryNode.id)+"'");
		if (this.view.tell()>=geometryNode.end()) {
			this.pop();
			return true;
		}

		var meshNode = this.parseNodeHeader();
		if (meshNode.id==DataParserTypes.NODE_MESH) {
			if (!this.hasDataForNode(meshNode))
				return this.error("Not enough data for node '"+DataParserTypes.getName(meshNode.id)+"'");
			this.push(meshNode, this.parseMesh);
		}
		else this.skipNode(meshNode);
		return true;
	}

	/** Parses mesh nodes */
	parseMesh(meshNode): any {
		var numPoints = this.getUint32();
		var mesh = this.result.createMesh(numPoints);
		var texCoordSetIndex = 0;
		var noScale = [1.0, 1.0, 1.0];
		var flipScale = [1.0, 1.0, 1.0];
		if (this.flipX) flipScale[0]=-1.0;

		while (this.view.tell()<meshNode.end()) {
			var node = this.parseNodeHeader();
			if (!this.hasDataForNode(node))
				return this.error("Not enough data for node '"+DataParserTypes.getName(node.id)+"'");
			switch (node.id) {
				case DataParserTypes.NODE_MATERIAL_REFERENCE:
					if (node.length<4) return this.errorExpect(4, 'mesh.material_reference');
					mesh.material=this.getUint32();
					break;
				case DataParserTypes.NODE_VERTICES:
					if (!this.parseVertices(node, numPoints, mesh.vertices, 'position', flipScale))
						return false;
					break;
				case DataParserTypes.NODE_NORMALS:
					if (!this.parseVertices(node, numPoints, mesh.vertices, 'normal', noScale))
						return false;
					break;
				case DataParserTypes.NODE_TANGENTS:
					if (!this.parseVertices(node, numPoints, mesh.vertices, 'tangent', noScale))
						return false;
					break;
				case DataParserTypes.NODE_BITANGENTS:
					if (!this.parseVertices(node, numPoints, mesh.vertices, 'bitangent', noScale))
						return false;
					break;
				case DataParserTypes.NODE_TEXTURE_COORDINATES:
					if (node.length<4) return this.errorExpect(4, 'mesh texture coordinates component count');
					var numComponents = this.getUint32();
					if (numComponents==0 || numComponents>3)
						return this.error('Unsupported number of texture coordinate components: '+numComponents);
					if (node.length-4!=numComponents*numPoints*4)
						return this.error('Texture coordinate set '+texCoordSetIndex+' is corrupted');
					var labels = ['x', 'y', 'z'];
					for (var i=0; i<numPoints; i++) {
						var texCoord = {};
						for (var j=0; j<numComponents; j++) {
							texCoord[labels[j]]=this.getFloat32();
						}
						mesh.vertices[i].texCoord.push(texCoord);
					}
					texCoordSetIndex++;
					break;
				case DataParserTypes.NODE_FACES:
					if (!this.parseFaces(node, mesh.indices))
						return false;
					break;
				default:
					this.skipNode(node);
			}
		}
		this.result.addMesh(mesh);
		this.pop();
		return true;
	}

	/** Parses vertices components */
	parseVertices(node, count, buffer, component, staticScale): any {
		if (node.length!=count*12)
			return this.error('Node '+DataParserTypes.getName(node.id)+' is corrupted');
		for (var i=0; i<count; i++) {
			buffer[i][component].x=staticScale[0]*this.getFloat32();
			buffer[i][component].y=staticScale[1]*this.getFloat32();
			buffer[i][component].z=staticScale[2]*this.getFloat32();
		}
		return true;
	}

	/** Parses face indices nodes */
	parseFaces(facesNode, buffer): any {
		if (facesNode.length<4) return this.errorExpect(4, 'faces.num_triangles');
		var numTriangles = this.getUint32();
		if (facesNode.length-4!=numTriangles*12)
			return this.error('Faces list is corrupted');
		for (var i=0; i<numTriangles; i++) {
			buffer.push(this.getUint32());
			buffer.push(this.getUint32());
			buffer.push(this.getUint32());
		}
		return true;
	}

	/** Parses the scene hierarchy section of the data */
	parseScene(sceneNode): any {
		if (!this.hasDataForNode(sceneNode))
			return this.error("Not enough data for node '"+DataParserTypes.getName(sceneNode.id)+"'");
		while (this.view.tell()<sceneNode.end()) {
			var node = this.parseNodeHeader();
			if (node.id==DataParserTypes.NODE_GROUP) {
				if (!this.parseGroup(node, false))
					return false;
			}
			else this.skipNode(node);
		}
		this.pop();
		return true;
	}

	/** Parses group nodes */
	parseGroup(groupNode, parent): any {
		if (!this.hasDataForNode(groupNode))
			return this.error("Not enough data for node '"+DataParserTypes.getName(groupNode.id)+"'");
		var group = this.result.createGroup();
		if (parent===false)
			this.result.setRoot(group);
		else {
			parent.children.push(group);
			group.parent=parent;
		}
		while (this.view.tell()<groupNode.end()) {
			var node = this.parseNodeHeader();
			if (!this.hasDataForNode(node))
				return this.error("Not enough data for node '"+DataParserTypes.getName(node.id)+"'");
			switch (node.id) {
				case DataParserTypes.NODE_GROUP_ID:
					if (node.length<4) return this.error('Group ID is corrupted');
					group.id=this.getUint32();
					this.result.mapGroupID(group);
					break;
				case DataParserTypes.NODE_STRING:
					group.name=this.view.getString(node.length);
					break;
				case DataParserTypes.NODE_TRANSFORM_POSITION:
					if (node.length!=12) return this.error('Group position is corrupted');
					group.position.x=this.getFloat32();
					group.position.y=this.getFloat32();
					group.position.z=this.getFloat32();
					break;
				case DataParserTypes.NODE_TRANSFORM_ROTATION:
					if (node.length!=16) return this.error('Group rotation is corrupted');
					group.rotation.x=this.getFloat32();
					group.rotation.y=this.getFloat32();
					group.rotation.z=this.getFloat32();
					group.rotation.w=this.getFloat32();
					break;
				case DataParserTypes.NODE_TRANSFORM_SCALE:
					if (node.length!=12) return this.error('Group scale is corrupted');
					group.scale.x=this.getFloat32();
					group.scale.y=this.getFloat32();
					group.scale.z=this.getFloat32();
					break;
				case DataParserTypes.NODE_MATRIX4X4:
					if (node.length!=64) return this.error('Group transformation matrix is corrupted');
					group.transform=this.getMatrix4x4();
					break;
				case DataParserTypes.NODE_MESH_REFERENCE:
					if (node.length<4) return this.error('Group mesh reference is corrupted');
					group.meshes.push(this.getUint32());
					break;
				case DataParserTypes.NODE_GROUP:
					this.parseGroup(node, group);
					break;
				default:
					this.skipNode(node);
			}
		}
		return true;
	}

	/** Parses the (optional) collision tree hierarchy */
	parseCollision(collisionNode): any {
		if (!this.hasDataForNode(collisionNode))
			return this.error("Not enough data for node '"+DataParserTypes.getName(collisionNode.id)+"'");
		while (this.view.tell()<collisionNode.end()) {
			var node = this.parseNodeHeader();
			if (node.id==DataParserTypes.NODE_COLLISION_NODE) {
				if (!this.parseCollisionNode(node, false))
					return false;
			}
			else this.skipNode(node);
		}
		this.pop();
		return true;
	}

	/** Parses an individual collision tree node */
	parseCollisionNode(node, parent): any {
		if (!this.hasDataForNode(node))
			return this.error("Not enough data for node '"+DataParserTypes.getName(node.id)+"'");
		var collisionTreeNode = this.result.createCollisionTreeNode();
		if (parent===false)
			this.result.setCollisionTreeRoot(collisionTreeNode);
		else {
			parent.children.push(collisionTreeNode);
			collisionTreeNode.parent=parent;
		}
		while (this.view.tell()<node.end()) {
			var child = this.parseNodeHeader();
			if (!this.hasDataForNode(child))
				return this.error("Not enough data for node '"+DataParserTypes.getName(child.id)+"'");
			switch (child.id) {
				case DataParserTypes.NODE_COLLISION_AABB_CENTER:
					if (child.length!=12) return this.error('Collision node center is corrupted');
					collisionTreeNode.center.x=this.getFloat32();
					collisionTreeNode.center.y=this.getFloat32();
					collisionTreeNode.center.z=this.getFloat32();
					break;
				case DataParserTypes.NODE_COLLISION_AABB_EXTENTS:
					if (child.length!=12) return this.error('Collision node extents are corrupted');
					collisionTreeNode.extents.x=this.getFloat32();
					collisionTreeNode.extents.y=this.getFloat32();
					collisionTreeNode.extents.z=this.getFloat32();
					break;
				case DataParserTypes.NODE_COLLISION_NODE:
					this.parseCollisionNode(child, collisionTreeNode);
					break;
				case DataParserTypes.NODE_COLLISION_FACE_LIST:
					this.parseCollisionFaceList(child, collisionTreeNode);
					break;
				default:
					this.skipNode(child);
			}
		}
		return true;
	}

	parseCollisionFaceList(node, collisionTreeNode): any {
		if (!this.hasDataForNode(node))
			return this.error("Not enough data for node '"+DataParserTypes.getName(node.id)+"'");

		var nodeID=-1;
		var meshID=-1;
		var indices=[];

		while (this.view.tell()<node.end()) {
			var child = this.parseNodeHeader();
			if (!this.hasDataForNode(child))
				return this.error("Not enough data for node '"+DataParserTypes.getName(child.id)+"'");
			switch (child.id) {
				case DataParserTypes.NODE_FACE_LIST_NODE_ID:
					if (child.length!=4) return this.error('Face list node ID is corrupted');
					nodeID=this.getUint32();
					break;
				case DataParserTypes.NODE_FACE_LIST_MESH_REFERENCE:
					if (child.length!=4) return this.error('Face list mesh ID is corrupted');
					meshID=this.getUint32();
					break;
				case DataParserTypes.NODE_FACE_LIST_INDICES:
					while (this.view.tell()<child.end())
						indices.push(this.getUint32());
					break;
				default:
					this.skipNode(child);
			}
		}
		return this.result.addFaceList(collisionTreeNode, nodeID, meshID, indices);
	}

	parseRoot(root) {
		if (!this.hasDataForNode(root))
			return this.error("Not enough data for node '"+DataParserTypes.getName(root.id)+"'");
		if (this.view.tell()>=root.end()) return true;
		var node = this.parseNodeHeader();
		switch (node.id) {
			case DataParserTypes.NODE_MATERIALS:
				this.push(node, this.parseMaterials);
				break;
			case DataParserTypes.NODE_GEOMETRY:
				this.push(node, this.parseGeometry);
				break;
			case DataParserTypes.NODE_SCENE:
				this.push(node, this.parseScene);
				break;
			case DataParserTypes.NODE_COLLISION:
				this.push(node, this.parseCollision);
				break;
			default:
				this.skipNode(node);
				break;
		}
		return true;
	}

}

globalThis.DataParser = DataParser;

export default DataParser;
