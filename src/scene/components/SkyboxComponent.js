var SkyboxComponent = Component.extend({
	init: function() {
		this._super();
	},
	
	setup: function(assetsManager, engine, images) {
		this.meshNode = new Node("Skybox");
		
		var center=[0.0, 0.0, 0.0];
		var extents=[1.0, 1.0, 1.0];
		
		var mesh = new Mesh();

		var normal = vec3.create();
		var v1 = vec3.create();
		var v2 = vec3.create();
		
		function createSide(a, b, c, d, material) {
			var submesh = new Submesh();
			submesh.positions=[];
			submesh.normals=[];
			submesh.texCoords2D=[[]];
			
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
			
			submesh.recalculateBounds();
			mesh.addSubmesh(submesh, material);
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

		createSide(points[3], points[2], points[1], points[0], new Material(assetsManager.addShaderSource("diffuse"),
																			{ "diffuse": new UniformColor(new Color()) },
																			[ new Sampler("diffuse0", assetsManager.texturesManager.addDescriptor(images[0])) ])); // front
		createSide(points[6], points[7], points[4], points[5], new Material(assetsManager.addShaderSource("diffuse"),
																			{ "diffuse": new UniformColor(new Color()) },
																			[ new Sampler("diffuse0", assetsManager.texturesManager.addDescriptor(images[1])) ])); // back
		createSide(points[7], points[3], points[0], points[4], new Material(assetsManager.addShaderSource("diffuse"),
																			{ "diffuse": new UniformColor(new Color()) },
																			[ new Sampler("diffuse0", assetsManager.texturesManager.addDescriptor(images[2])) ])); // left
		createSide(points[2], points[6], points[5], points[1], new Material(assetsManager.addShaderSource("diffuse"),
																			{ "diffuse": new UniformColor(new Color()) },
																			[ new Sampler("diffuse0", assetsManager.texturesManager.addDescriptor(images[3])) ])); // right
		createSide(points[0], points[1], points[5], points[4], new Material(assetsManager.addShaderSource("diffuse"),
																			{ "diffuse": new UniformColor(new Color()) },
																			[ new Sampler("diffuse0", assetsManager.texturesManager.addDescriptor(images[4])) ])); // bottom
		createSide(points[7], points[6], points[2], points[3], new Material(assetsManager.addShaderSource("diffuse"),
																			{ "diffuse": new UniformColor(new Color()) },
																			[ new Sampler("diffuse0", assetsManager.texturesManager.addDescriptor(images[5])) ])); // top
		
		this.meshNode.addComponent(new MeshComponent(mesh));
		var meshRenderer = this.meshNode.addComponent(new MeshRendererComponent());
		this.node.addNode(this.meshNode);
		meshRenderer.castShadows=false;
		meshRenderer.disable();
		meshRenderer.addRenderers(engine.context, engine);
	},
	
	type: function() {
		return "SkyboxComponent";
	}
});