var Mesh=Class.extend({
	init: function() {
		this.submeshes=[];
		this.materials=[];
		this.boundingBox=new BoundingBox();
		this.boundingSphere=new BoundingSphere();
	},
	
	/** Adds new submesh optionally with a new material
		@param submesh Submesh to be added {Submesh}
		@param material Material that the submesh will use {Material} [optional] */
	addSubmesh: function(submesh, material) {
		this.boundingBox.encapsulateBox(submesh.boundingBox);
		this.boundingSphere.encapsulateSphere(submesh.boundingSphere);
		this.submeshes.push(submesh);
		
		if(material) {
			this.materials.push(material);
			submesh.materialIndex = this.materials.length-1;
		}
	},

	getMaterial: function(index) {
		if (index>=0 && index<this.materials.length)
			return this.materials[index];
		return false;
	},
	
	getPolycount: function() {
		var c=0;
		for (var i in this.submeshes)
			c+=this.submeshes[i].faces.length/3;
		return c;
	},
	
	empty: function() {
		return (this.submeshes.length===0);
	}
});