/** Submesh object. Holds loaded faces, positions, tangents and bitangents. 
	@param materialIndex Index of material that this submesh will refer to when attached to a mesh
	@param faces All available faces 

*/
var Submesh=Class.extend({
	/** Constructor */
	init: function() {
		this.materialIndex=-1;
		this.faces=[];			//< Faces as triangle indices [i0, j0, k0, ..., in, jn, kn]
		this.positions=[];	//< Positions as [x0, y0, z0, ..., xn, yn, zn]
		this.texCoords1D=[];//< Texture coordinates as [x0, ..., xn]
		this.texCoords2D=[];//< Texture coordinates as [x0, y0, ..., xn, yn]
		this.texCoords3D=[];//< Texture coordinates as [x0, y0, z0, ..., xn, yn, zn]
		this.tangents=false;//< Tangents as [x0, y0, z0, ..., xn, yn, zn]
		this.normals=false;	//< Normals as [x0, y0, z0, ..., xn, yn, zn]
		this.bitangents=false;	//< Bitangents as [x0, y0, z0, ..., xn, yn, zn]
		this.barycentric=false;	//< Barycentric coordinates as [x0, y0, z0, ..., xn, yn, zn]
		this.boundingBox=new BoundingBox();
		this.boundingSphere=new BoundingSphere();
	},

	/** Recalculates bounding volumes for this Submesh */
	recalculateBounds: function() {
		this.boundingBox=new BoundingBox();
		this.boundingSphere=new BoundingSphere();
		for(var i=0, l = this.positions.length; i < l; i+=3) {
			this.boundingBox.encapsulatePoint(vec3.fromValues(this.positions[i+0], this.positions[i+1], this.positions[i+2]));
			this.boundingSphere.encapsulatePoint(vec3.fromValues(this.positions[i+0], this.positions[i+1], this.positions[i+2]));
		}
	},

	/** Generates edges for the submesh */
	generateEdges: function() {
		var me=this;
		this.edges={};
		function insert(a, b) {
			if(!me.edges[me.faces[a]]) me.edges[a]={};
			me.edges[me.faces[a]][me.faces[b]]=true;
		}
		for(var i=0, l = this.faces.length; i<l; i+=3) {
			insert(i  , i+1); insert(i+1, i);
			insert(i+1, i+2); insert(i+2, i+1);
			insert(i+2, i);   insert(i  , i+2);
		}
	}
});