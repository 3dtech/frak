/** Predefined primiteve generators */
var Primitives = {

	/** Generates a planar mesh in XY-axis plane
		@param width {number} Width of the plane
		@param height {number} Height of the plane
		@param material {Material} of the plane
		@return {Node} that has the generated geometry attached to it */
	plane: function(width, height, material) {
		var mesh=new Mesh();
		var submesh=new Submesh();
		submesh.positions=[
			-0.5*width,-0.5*height, 0.0,
			-0.5*width, 0.5*height, 0.0,
			 0.5*width, 0.5*height, 0.0,
			 0.5*width,-0.5*height, 0.0
		];
		submesh.normals=[
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		];
		submesh.texCoords2D=[[
			0.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0
		]];
		submesh.faces=[0, 1, 2, 0, 2, 3];
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, material);
		var plane = new Node("Plane");
		plane.addComponent(new MeshComponent(mesh));
		plane.addComponent(new MeshRendererComponent());
		return plane;
	},

	/** Generates a box mesh
		@param center Instance of {vec3}. Center of the box.
		@param extents Instance of {vec3}. The extents of the box.
		@param material {Material} of the box
		@return {Node} that has the generated geometry attached to it */
	box: function(center, extents, material) {
		var mesh=new Mesh();
		var submesh=new Submesh();
		submesh.positions=[];
		submesh.normals=[];
		submesh.texCoords2D=[[]];

		var normal = vec3.create();
		var v1 = vec3.create();
		var v2 = vec3.create();

		function createSide(a, b, c, d) {
			vec3.sub(v1, b, a);
			vec3.sub(v2, d, a);
			vec3.cross(normal, v1, v2);
			vec3.negate(normal, normal);
			vec3.normalize(normal, normal);

			var offset = submesh.positions.length/3;

			submesh.positions.push(a[0], a[1], a[2]);
			submesh.normals.push(normal[0], normal[1], normal[2]);
			submesh.texCoords2D[0].push(0, 1);

			submesh.positions.push(b[0], b[1], b[2]);
			submesh.normals.push(normal[0], normal[1], normal[2]);
			submesh.texCoords2D[0].push(1, 1);

			submesh.positions.push(c[0], c[1], c[2]);
			submesh.normals.push(normal[0], normal[1], normal[2]);
			submesh.texCoords2D[0].push(1, 0);

			submesh.positions.push(d[0], d[1], d[2]);
			submesh.normals.push(normal[0], normal[1], normal[2]);
			submesh.texCoords2D[0].push(0, 0);

			submesh.faces.push(offset+0, offset+3, offset+2);
			submesh.faces.push(offset+2, offset+1, offset+0);
		}

		var points = [
			vec3.fromValues(center[0]-extents[0], center[1]-extents[1], center[2]-extents[2]),
			vec3.fromValues(center[0]+extents[0], center[1]-extents[1], center[2]-extents[2]),
			vec3.fromValues(center[0]+extents[0], center[1]+extents[1], center[2]-extents[2]),
			vec3.fromValues(center[0]-extents[0], center[1]+extents[1], center[2]-extents[2]),
			vec3.fromValues(center[0]-extents[0], center[1]-extents[1], center[2]+extents[2]),
			vec3.fromValues(center[0]+extents[0], center[1]-extents[1], center[2]+extents[2]),
			vec3.fromValues(center[0]+extents[0], center[1]+extents[1], center[2]+extents[2]),
			vec3.fromValues(center[0]-extents[0], center[1]+extents[1], center[2]+extents[2])
		];

		createSide(points[0], points[1], points[2], points[3]); // front
		createSide(points[5], points[4], points[7], points[6]); // back
		createSide(points[4], points[0], points[3], points[7]); // left
		createSide(points[1], points[5], points[6], points[2]); // right
		createSide(points[4], points[5], points[1], points[0]); // bottom
		createSide(points[3], points[2], points[6], points[7]); // top

		submesh.calculateTangents();
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, material);
		var box = new Node("Box");
		box.addComponent(new MeshComponent(mesh));
		box.addComponent(new MeshRendererComponent());
		return box;
	},

	/** Generates a text object (planar mesh in XY-axis with the text texture)
		@param s {String} The initial text to display. Can be zero length.
		@return {Node} that has the generated geometry attached to it */
	text: function(s) {
		var node = new Node('Text');
		node.addComponent(new TextComponent(s));
		node.addComponent(new TextRendererComponent());
		return node;
	}
};