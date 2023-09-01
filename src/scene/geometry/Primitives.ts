import Node from "scene/Node";
import Mesh from "./Mesh";
import Submesh from "./Submesh";
import MeshComponent from "scene/components/MeshComponent";
import MeshRendererComponent from "scene/components/MeshRendererComponent";
import TextComponent from "scene/components/TextComponent";
import TextRendererComponent from "scene/components/TextRendererComponent";
import CanvasBoardComponent from "scene/components/CanvasBoardComponent";
import CanvasBoardRendererComponent from "scene/components/CanvasBoardRendererComponent";

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

	sphere: function(radius, slices, stacks, material) {
		if (radius<=0.0)
			throw "Primitives.sphere: invalid sphere radius";

		if (slices<2 || stacks<2)
			throw "Primitives.sphere: invalid sphere slices/stacks parameters (slices<2 or stacks<2)";

		var dtheta = 360.0/slices;
		var dphi = 180.0/stacks;

		var vertexcount = ((360/dtheta) * (180/dphi) * 4);
		var facecount = vertexcount / 2;

		var mesh = new Mesh();
		var submesh = new Submesh();
		submesh.positions = new Float32Array(vertexcount*3);
		submesh.normals = new Float32Array(vertexcount*3);
		submesh.texCoords2D = [new Float32Array(vertexcount*2)];

		var Deg2Rad = Math.PI/180.0;
		var n = 0;
		var index = 0;
		var a = vec3.create();
		var b = vec3.create();
		var c = vec3.create();
		var d = vec3.create();

		for (var phi = 0; phi < 180; phi += dphi) {
			for (var theta = 0; theta < 360; theta += dtheta) {
				// create faces
				submesh.faces.push(n+0, n+1, n+2);
				submesh.faces.push(n+2, n+3, n+0);

				// create vertices
				a[0] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.cos(Deg2Rad * (theta + dtheta));
				a[1] = radius * Math.cos((phi + dphi) * Deg2Rad);
				a[2] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.sin(Deg2Rad * (theta + dtheta));

				b[0] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.cos(theta * Deg2Rad);
				b[1] = radius * Math.cos((phi + dphi) * Deg2Rad);
				b[2] = radius * Math.sin((phi + dphi) * Deg2Rad) * Math.sin(theta * Deg2Rad);

				c[0] = radius * Math.sin(phi * Deg2Rad) * Math.cos(Deg2Rad * theta);
				c[1] = radius * Math.cos(phi * Deg2Rad);
				c[2] = radius * Math.sin(phi * Deg2Rad) * Math.sin(Deg2Rad * theta);

				d[0] = radius * Math.sin(phi * Deg2Rad) * Math.cos(Deg2Rad * (theta + dtheta));
				d[1] = radius * Math.cos(phi * Deg2Rad);
				d[2] = radius * Math.sin(phi * Deg2Rad) * Math.sin(Deg2Rad * (theta + dtheta));

				// Set vertices
				submesh.positions[3*(n+0) + 0] = a[0];
				submesh.positions[3*(n+0) + 1] = a[1];
				submesh.positions[3*(n+0) + 2] = a[2];

				submesh.positions[3*(n+1) + 0] = b[0];
				submesh.positions[3*(n+1) + 1] = b[1];
				submesh.positions[3*(n+1) + 2] = b[2];

				submesh.positions[3*(n+2) + 0] = c[0];
				submesh.positions[3*(n+2) + 1] = c[1];
				submesh.positions[3*(n+2) + 2] = c[2];

				submesh.positions[3*(n+3) + 0] = d[0];
				submesh.positions[3*(n+3) + 1] = d[1];
				submesh.positions[3*(n+3) + 2] = d[2];

				// Set normals
				vec3.normalize(a, a);
				vec3.normalize(b, b);
				vec3.normalize(c, c);
				vec3.normalize(d, d);

				submesh.normals[3*(n+0) + 0] = a[0];
				submesh.normals[3*(n+0) + 1] = a[1];
				submesh.normals[3*(n+0) + 2] = a[2];

				submesh.normals[3*(n+1) + 0] = b[0];
				submesh.normals[3*(n+1) + 1] = b[1];
				submesh.normals[3*(n+1) + 2] = b[2];

				submesh.normals[3*(n+2) + 0] = c[0];
				submesh.normals[3*(n+2) + 1] = c[1];
				submesh.normals[3*(n+2) + 2] = c[2];

				submesh.normals[3*(n+3) + 0] = d[0];
				submesh.normals[3*(n+3) + 1] = d[1];
				submesh.normals[3*(n+3) + 2] = d[2];


				// Set UV
				submesh.texCoords2D[0][2*(n+0) + 0] = (Deg2Rad * (theta + dtheta))/(Math.PI*2);
				submesh.texCoords2D[0][2*(n+0) + 1] = ((phi + dphi) * Deg2Rad)/Math.PI;

				submesh.texCoords2D[0][2*(n+1) + 0] = (theta * Deg2Rad)/(Math.PI*2);
				submesh.texCoords2D[0][2*(n+1) + 1] = ((phi + dphi) * Deg2Rad)/Math.PI;

				submesh.texCoords2D[0][2*(n+2) + 0] = (Deg2Rad * theta)/(Math.PI*2);
				submesh.texCoords2D[0][2*(n+2) + 1] = (phi * Deg2Rad)/Math.PI;

				submesh.texCoords2D[0][2*(n+3) + 0] = (Deg2Rad * (theta + dtheta))/(Math.PI*2);
				submesh.texCoords2D[0][2*(n+3) + 1] = (phi * Deg2Rad)/Math.PI;

				n+=4;
			}
		}

		submesh.calculateTangents();
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, material);

		var node = new Node('Sphere');
		node.addComponent(new MeshComponent(mesh));
		node.addComponent(new MeshRendererComponent());
		return node;
	},

	cone: function(radius, height, slices, material) {
		if (radius<=0.0)
			throw "Primitives.cone: invalid cone radius";
		if (height==0)
			throw "Primitives.cone: cannot create a cone with zero height";
		if (slices<2)
			throw "Primitives.cone: invalid slices (slices<2)";

		var dtheta = 360.0/slices;
		var upperCap = vec3.fromValues(0, height/2.0, 0);
		var lowerCap = vec3.fromValues(0, -height/2.0, 0);

		var vertexcount = (360/dtheta)*6;
		var facecount = (360/dtheta)*2;

		var mesh = new Mesh();
		var submesh = new Submesh();
		submesh.positions = new Float32Array(vertexcount*3);
		submesh.normals = new Float32Array(vertexcount*3);
		submesh.texCoords2D = [new Float32Array(vertexcount*2)];

		var Deg2Rad = Math.PI/180.0;

		// this is for computing smooth normals
		var P = vec3.fromValues(lowerCap[0], 0.5*height - (radius*radius + height*height) / height, lowerCap[2]);

		var vert = 0;
		var normal = vec3.create();
		for (var theta = 0; theta < 360; theta += dtheta) {
			// bottom triangle of the slice
			submesh.faces.push(vert+0, vert+1, vert+2);
			vec3.set(normal, 0, -1, 0);

			submesh.positions[3*vert + 0] = radius * Math.sin(theta* Deg2Rad);
			submesh.positions[3*vert + 1] = lowerCap[1];
			submesh.positions[3*vert + 2] = radius * Math.cos(theta * Deg2Rad);
			submesh.normals[3*vert + 0] = normal[0];
			submesh.normals[3*vert + 1] = normal[1];
			submesh.normals[3*vert + 2] = normal[2];
			submesh.texCoords2D[0][2*vert + 0] = theta/360.0;
			submesh.texCoords2D[0][2*vert + 1] = 1.0;
			vert++;

			submesh.positions[3*vert + 0] = radius * Math.sin((theta+dtheta) * Deg2Rad);
			submesh.positions[3*vert + 1] = lowerCap[1];
			submesh.positions[3*vert + 2] = radius*Math.cos((theta+dtheta) * Deg2Rad);
			submesh.normals[3*vert + 0] = normal[0];
			submesh.normals[3*vert + 1] = normal[1];
			submesh.normals[3*vert + 2] = normal[2];
			submesh.texCoords2D[0][2*vert + 0] = (theta+dtheta)/360.0;
			submesh.texCoords2D[0][2*vert + 1] = 1.0;
			vert++;

			submesh.positions[3*vert + 0] = lowerCap[0];
			submesh.positions[3*vert + 1] = lowerCap[1];
			submesh.positions[3*vert + 2] = lowerCap[2];
			submesh.normals[3*vert + 0] = normal[0];
			submesh.normals[3*vert + 1] = normal[1];
			submesh.normals[3*vert + 2] = normal[2];
			submesh.texCoords2D[0][2*vert + 0] = theta/360.0;
			submesh.texCoords2D[0][2*vert + 1] = 0.0;
			vert++;

			// the side of the slice
			submesh.faces.push(vert+0, vert+1, vert+2);
			var a = vec3.fromValues(radius * Math.sin(theta * Deg2Rad), lowerCap[1], radius * Math.cos(theta * Deg2Rad));
			var b = vec3.fromValues(radius * Math.sin((theta+dtheta) * Deg2Rad), lowerCap[1], radius * Math.cos((theta+dtheta) * Deg2Rad));
			var c = vec3.fromValues(upperCap[0], upperCap[1], upperCap[2]);

			vec3.sub(normal, a, P);
			vec3.normalize(normal, normal);
			submesh.positions[3*(vert+0) + 0] = a[0];
			submesh.positions[3*(vert+0) + 1] = a[1];
			submesh.positions[3*(vert+0) + 2] = a[2];
			submesh.normals[3*(vert+0) + 0] = normal[0];
			submesh.normals[3*(vert+0) + 1] = normal[1];
			submesh.normals[3*(vert+0) + 2] = normal[2];
			submesh.texCoords2D[0][2*(vert+0) + 0] = theta/360.0;
			submesh.texCoords2D[0][2*(vert+0) + 1] = 1.0;

			vec3.sub(normal, b, P);
			vec3.normalize(normal, normal);
			submesh.positions[3*(vert+1) + 0] = b[0];
			submesh.positions[3*(vert+1) + 1] = b[1];
			submesh.positions[3*(vert+1) + 2] = b[2];
			submesh.normals[3*(vert+1) + 0] = normal[0];
			submesh.normals[3*(vert+1) + 1] = normal[1];
			submesh.normals[3*(vert+1) + 2] = normal[2];
			submesh.texCoords2D[0][2*(vert+1) + 0] = (theta+dtheta)/360.0;
			submesh.texCoords2D[0][2*(vert+1) + 1] = 1.0;

			vec3.set(normal, 0, 1, 0);
			submesh.positions[3*(vert+2) + 0] = c[0];
			submesh.positions[3*(vert+2) + 1] = c[1];
			submesh.positions[3*(vert+2) + 2] = c[2];
			submesh.normals[3*(vert+2) + 0] = normal[0];
			submesh.normals[3*(vert+2) + 1] = normal[1];
			submesh.normals[3*(vert+2) + 2] = normal[2];
			submesh.texCoords2D[0][2*(vert+2) + 0] = theta/360.0;
			submesh.texCoords2D[0][2*(vert+2) + 1] = 0.0;

			vert+=3;
		}

		submesh.calculateTangents();
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, material);

		var node = new Node('Cone');
		node.addComponent(new MeshComponent(mesh));
		node.addComponent(new MeshRendererComponent());
		return node;
	},

	/** Generates a text object (planar mesh in XY-axis with the text texture)
		@param s {String} The initial text to display. Can be zero length.
		@param wrap {Boolean} Should it wrap text by the longest word
		@return {Node} that has the generated geometry attached to it */
	text: function(s, wrap) {
		var node = new Node('Text');
		node.addComponent(new TextComponent(s, wrap));
		node.addComponent(new TextRendererComponent());
		return node;
	},

	/** Generates a text object (planar mesh in XY-axis with the text texture)
		@param s {String} The initial text to display. Can be zero length.
		@param wrap {Boolean} Should it wrap text by the longest word
		@return {Node} that has the generated geometry attached to it */
	canvasBoard: function(width, height) {
		var node = new Node('Text');
		node.addComponent(new CanvasBoardComponent(width, height));
		node.addComponent(new CanvasBoardRendererComponent());
		return node;
	}
};

globalThis.Primitives = Primitives;
export default Primitives;
