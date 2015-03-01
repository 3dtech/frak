/**
 * Ambient light (affects entire buffer)
 */
var AmbientLight = Light.extend({
	init: function(color) {
		this._super();
		this.color = color || new Color(0.2, 0.2, 0.2, 1.0);
		this.geometry = null;
		this.material = null;
	},

	type: function() {
		return "AmbientLight";
	},

	onStart: function(context, engine) {
		this._super();

		this.material = new Material(
			engine.assetsManager.addShaderSource("shaders/default/deferred_light_ambient"),
			{
				'lightColor': new UniformColor(this.color)
			},
			[]
		);

		var mesh = new Mesh();
		var submesh = new Submesh();
		submesh.positions = [
			-1, -1, 0,
			-1, 1, 0,
			1, 1, 0,
			1, -1, 0
		];
		submesh.normals = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		];
		submesh.texCoords2D = [[
			0.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0
		]];
		submesh.faces = [0, 1, 2, 0, 2, 3];
		submesh.recalculateBounds();
		mesh.addSubmesh(submesh, this.material);

		this.geometry = new Node("AmbientLightGeometry");
		this.geometry.addComponent(new MeshComponent(mesh));
		this.geometry.addComponent(new MeshRendererComponent()).disable();
		this.node.addNode(this.geometry);

		engine.assetsManager.load();
	},

	onUpdate: function() {
		vec4.set(this.material.uniforms.lightColor.value, this.color.r, this.color.g, this.color.b, this.color.a);
	},

	getGeometryRenderers: function() {
		return this.geometry.getComponent(MeshRendererComponent).meshRenderers;
	}
});