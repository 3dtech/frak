import BoundingBox from 'scene/geometry/BoundingBox';
import BoundingSphere from 'scene/geometry/BoundingSphere';

type IndexType = WebGL2RenderingContext['UNSIGNED_SHORT'] | WebGL2RenderingContext['UNSIGNED_INT'];

/** Submesh object. Holds loaded faces, positions, tangents and bitangents.
	@param materialIndex Index of material that this submesh will refer to when attached to a mesh
	@param faces All available faces

*/
class Submesh {
	materialIndex: any;
	faces: any;
	positions: any;
	texCoords1D: any;
	texCoords2D: any;
	texCoords3D: any;
	texCoords4D: any;
	tangents: any;
	tangents4D: any;
	normals: any;
	bitangents: any;
	barycentric: any;
	colors = null;
	boundingBox: any;
	boundingSphere: any;
	edges: any;
	indexType: IndexType = WebGL2RenderingContext.UNSIGNED_SHORT;

	/** Constructor */
	constructor() {
		this.materialIndex=-1;
		this.faces=[];			// < Faces as triangle indices [i0, j0, k0, ..., in, jn, kn]
		this.positions=[];	// < Positions as [x0, y0, z0, ..., xn, yn, zn]
		this.texCoords1D=[];// < Texture coordinates as [x0, ..., xn]
		this.texCoords2D=[];// < Texture coordinates as [x0, y0, ..., xn, yn]
		this.texCoords3D=[];// < Texture coordinates as [x0, y0, z0, ..., xn, yn, zn]
		this.texCoords4D=[];// < Texture coordinates as [x0, y0, z0, w0, ..., xn, yn, zn, wn]
		this.tangents=false;// < Tangents as [x0, y0, z0, ..., xn, yn, zn]
		this.tangents4D=false;// < Tangents as [x0, y0, z0, w0, ..., xn, yn, zn, wn]
		this.normals=false;	// < Normals as [x0, y0, z0, ..., xn, yn, zn]
		this.bitangents=false;	// < Bitangents as [x0, y0, z0, ..., xn, yn, zn]
		this.barycentric=false;	// < Barycentric coordinates as [x0, y0, z0, ..., xn, yn, zn]
		this.boundingBox=new BoundingBox();
		this.boundingSphere=new BoundingSphere();
	}

	_calculateTangents4D(): any {
		if (!this.tangents) {
			return;
		}

		this.tangents4D = new Float32Array(this.positions.length / 3 * 4);

		for (var i = 0; i < this.tangents4D.length; i += 4) {
			this.tangents4D[i] = this.tangents[i];
			this.tangents4D[i+1] = this.tangents[i+1];
			this.tangents4D[i+2] = this.tangents[i+2];
			this.tangents4D[i+3] = 1;
		}
	}

	/**
	 * Calculates tangent vectors for this submesh.
	 *
	 * Lengyel, Eric. "Computing Tangent Space Basis Vectors for an Arbitrary Mesh".
	 * Terathon Software 3D Graphics Library, 2001.
	 * http://www.terathon.com/code/tangent.html
	 */
	calculateTangents(): any {
		var tan1 = new Float32Array(this.positions.length);
		var tan2 = new Float32Array(this.positions.length);

		var uv = this.texCoords2D[0];
		var v1 = vec3.create();
		var v2 = vec3.create();
		var v3 = vec3.create();
		var w1 = vec2.create();
		var w2 = vec2.create();
		var w3 = vec2.create();
		var sdir = vec3.create();
		var tdir = vec3.create();

		for (var i=0; i<this.faces.length; i+=3) {
			var i1 = this.faces[i];
			var i2 = this.faces[i+1];
			var i3 = this.faces[i+2];

			vec3.set(v1, this.positions[i1*3], this.positions[(i1*3)+1], this.positions[(i1*3)+2]);
			vec3.set(v2, this.positions[i2*3], this.positions[(i2*3)+1], this.positions[(i2*3)+2]);
			vec3.set(v3, this.positions[i3*3], this.positions[(i3*3)+1], this.positions[(i3*3)+2]);

			vec2.set(w1, uv[i1*2], uv[(i1*2)+1]);
			vec2.set(w2, uv[i2*2], uv[(i2*2)+1]);
			vec2.set(w3, uv[i3*2], uv[(i3*2)+1]);

			var x1 = v2[0] - v1[0];
			var x2 = v3[0] - v1[0];
			var y1 = v2[1] - v1[1];
			var y2 = v3[1] - v1[1];
			var z1 = v2[2] - v1[2];
			var z2 = v3[2] - v1[2];

			var s1 = w2[0] - w1[0];
			var s2 = w3[0] - w1[0];
			var t1 = w2[1] - w1[1];
			var t2 = w3[1] - w1[1];

			var r = 1.0 / (s1 * t2 - s2 * t1);

			vec3.set(sdir, (t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
			vec3.set(tdir, (s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);

			tan1[(i1*3)+0] += sdir[0];
			tan1[(i1*3)+1] += sdir[1];
			tan1[(i1*3)+2] += sdir[2];
			tan1[(i2*3)+0] += sdir[0];
			tan1[(i2*3)+1] += sdir[1];
			tan1[(i2*3)+2] += sdir[2];
			tan1[(i3*3)+0] += sdir[0];
			tan1[(i3*3)+1] += sdir[1];
			tan1[(i3*3)+2] += sdir[2];

			tan2[(i1*3)+0] += tdir[0];
			tan2[(i1*3)+1] += tdir[1];
			tan2[(i1*3)+2] += tdir[2];
			tan2[(i2*3)+0] += tdir[0];
			tan2[(i2*3)+1] += tdir[1];
			tan2[(i2*3)+2] += tdir[2];
			tan2[(i3*3)+0] += tdir[0];
			tan2[(i3*3)+1] += tdir[1];
			tan2[(i3*3)+2] += tdir[2];
		}

		this.tangents = new Float32Array(this.positions.length);
		this.bitangents = new Float32Array(this.positions.length);

		var n = vec3.create();
		var t = vec3.create();
		var tan = vec3.create();
		var tmp = vec3.create();
		for (var i=0; i<this.normals.length; i+=3) {
			vec3.set(n, this.normals[i], this.normals[i+1], this.normals[i+2]);
			vec3.set(t, tan1[i], tan1[i+1], tan1[i+2]);

			// Gram-Schmidt orthogonalize
			vec3.scale(tan, n, vec3.dot(n, t));
			vec3.sub(tan, t, tan);
			vec3.normalize(tan, tan);
			this.tangents[i] = tan[0];
			this.tangents[i+1] = tan[1];
			this.tangents[i+2] = tan[2];

			vec3.set(tan, tan2[i], tan2[i+1], tan2[i+2]);
			vec3.cross(tmp, n, t);
			var w = vec3.dot(tmp, tan) < 0.0 ? -1.0 : 1.0;

			vec3.set(t, this.tangents[i], this.tangents[i+1], this.tangents[i+2]);
			vec3.cross(tan, n, t);
			vec3.scale(tan, tan, w);
			vec3.normalize(tan, tan);
			this.bitangents[i] = tan[0];
			this.bitangents[i+1] = tan[1];
			this.bitangents[i+2] = tan[2];
		}

		this._calculateTangents4D();
	}

	unweld() {
		this.updateIndexType();

		const newPositions = new Float32Array(this.faces.length * 3);
		const newNormals = this.normals ? new Float32Array(this.faces.length * 3) : null;
		const newTexCoords2D = this.texCoords2D.length ? new Float32Array(this.faces.length * 2) : null;
		const newTangents4D = this.tangents4D ? new Float32Array(this.faces.length * 4) : null;
		const newColors = this.colors ? new Float32Array(this.faces.length * 4) : null;

		const newFaces = this.indexType === WebGL2RenderingContext.UNSIGNED_SHORT ? new Uint16Array(this.faces.length) : new Uint32Array(this.faces.length);

		const l = this.faces.length;
		for (let i = 0; i < l; i++) {
			const key = this.faces[i];

			newPositions[i * 3] = this.positions[key * 3];
			newPositions[i * 3 + 1] = this.positions[key * 3 + 1];
			newPositions[i * 3 + 2] = this.positions[key * 3 + 2];

			if (newNormals) {
				newNormals[i * 3] = this.normals[key * 3];
				newNormals[i * 3 + 1] = this.normals[key * 3 + 1];
				newNormals[i * 3 + 2] = this.normals[key * 3 + 2];
			}

			if (newTexCoords2D) {
				newTexCoords2D[i * 2] = this.texCoords2D[0][key * 2];
				newTexCoords2D[i * 2 + 1] = this.texCoords2D[0][key * 2 + 1];
			}

			if (newTangents4D) {
				newTangents4D[i * 4] = this.tangents4D[key * 4];
				newTangents4D[i * 4 + 1] = this.tangents4D[key * 4 + 1];
				newTangents4D[i * 4 + 2] = this.tangents4D[key * 4 + 2];
				newTangents4D[i * 4 + 3] = this.tangents4D[key * 4 + 3];
			}

			if (newColors) {
				newColors[i * 4] = this.colors[key * 4];
				newColors[i * 4 + 1] = this.colors[key * 4 + 1];
				newColors[i * 4 + 2] = this.colors[key * 4 + 2];
				newColors[i * 4 + 3] = this.colors[key * 4 + 3];
			}

			newFaces[i] = i;
		}

		this.positions = newPositions;

		if (this.normals) {
			this.normals = newNormals;
		}

		if (this.texCoords2D.length) {
			this.texCoords2D[0] = newTexCoords2D;
		}

		if (this.tangents4D) {
			this.tangents4D = newTangents4D;
		}

		if (this.colors) {
			this.colors = newColors;
		}

		this.faces = newFaces;
	}

	updateIndexType() {
		this.indexType = this.faces.length < 65536 ? WebGL2RenderingContext.UNSIGNED_SHORT : WebGL2RenderingContext.UNSIGNED_INT;
	}

	/** Calculates barycentric coordinates. This may not be entirely correct if the mesh has shared vertices. */
	calculateBarycentric(): any {
		this.barycentric = new Float32Array(this.positions.length);

		for (var i=0; i<this.faces.length; i+=3) {
			var idx0 = this.faces[i];
			var idx1 = this.faces[i+1];
			var idx2 = this.faces[i+2];

			this.barycentric[(idx0*3)+0] = 1.0;
			this.barycentric[(idx0*3)+1] = 0.0;
			this.barycentric[(idx0*3)+2] = 0.0;

			this.barycentric[(idx1*3)+0] = 0.0;
			this.barycentric[(idx1*3)+1] = 1.0;
			this.barycentric[(idx1*3)+2] = 0.0;

			this.barycentric[(idx2*3)+0] = 0.0;
			this.barycentric[(idx2*3)+1] = 0.0;
			this.barycentric[(idx2*3)+2] = 1.0;
		}
	}

	/** Recalculates bounding volumes for this Submesh */
	recalculateBounds(): any {
		this.boundingBox=new BoundingBox();
		this.boundingSphere=new BoundingSphere();

		for(var i=0, l = this.positions.length; i < l; i+=3) {
			this.boundingBox.encapsulatePoint(vec3.fromValues(this.positions[i+0], this.positions[i+1], this.positions[i+2]));
			this.boundingSphere.encapsulatePoint(vec3.fromValues(this.positions[i+0], this.positions[i+1], this.positions[i+2]));
		}
	}

	/** Generates edges for the submesh */
	generateEdges() {
		var me=this;

		this.edges={};
		function insert(a, b) {
			if(!me.edges[me.faces[a]]) me.edges[a]={};
			me.edges[me.faces[a]][me.faces[b]]=true;
		}

		for(var i=0, l = this.faces.length; i<l; i+=3) {
			insert(i , i+1); insert(i+1, i);
			insert(i+1, i+2); insert(i+2, i+1);
			insert(i+2, i); insert(i , i+2);
		}
	}
}

globalThis.Submesh = Submesh;
export default Submesh;
