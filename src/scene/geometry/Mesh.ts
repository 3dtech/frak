import BoundingBox from 'scene/geometry/BoundingBox';
import BoundingSphere from 'scene/geometry/BoundingSphere';

class Mesh {
	submeshes: any;
	materials: any;
	boundingBox: any;
	boundingSphere: any;

	constructor() {
		this.submeshes=[];
		this.materials=[];
		this.boundingBox = new BoundingBox();
		this.boundingSphere = new BoundingSphere();
	}

	/** Adds new submesh optionally with a new material
		@param submesh Submesh to be added {Submesh}
		@param material Material that the submesh will use {Material} [optional] */
	addSubmesh(submesh, material): any {
		this.boundingBox.encapsulateBox(submesh.boundingBox);
		this.boundingSphere.encapsulateSphere(submesh.boundingSphere);
		this.submeshes.push(submesh);

		if(material) {
			this.materials.push(material);
			submesh.materialIndex = this.materials.length-1;
		}
	}

	getMaterial(index): any {
		if (index>=0 && index<this.materials.length)
			return this.materials[index];
		return false;
	}

	/** Sets the given material at index. Throws exception on invalid index. */
	setMaterial(index, material): any {
		if (index<0 || index>=this.materials.length)
			throw "Material.setMaterial: index out of bounds.";
		this.materials[index] = material;
	}

	/** Appends the given material to the end of the materials list and returns the index of the material. */
	addMaterial(material): any {
		this.materials.push(material);
		return this.materials.length-1;
	}

	getPolycount(): any {
		var c=0;
		for (var i in this.submeshes)
			c+=this.submeshes[i].faces.length/3;
		return c;
	}

	empty() {
		return (this.submeshes.length===0);
	}
}

globalThis.Mesh = Mesh;
export default Mesh;
