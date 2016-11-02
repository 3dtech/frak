/** Text component is used to render text at given node */
var CanvasBoardComponent = MeshComponent.extend({
	/** Constructor
		@param text Default text to display */
	init: function(width, height) {
		this._super(new Mesh());
		this.width = width;
		this.height = height ? height : width;
		this.context = false;
		this.material = false;
		this.texture = false;
		this.canvasContext = false;
		this.canvas = false;
		this.sampler = new Sampler('diffuse0', null);
	},

	excluded: function() {
		return this._super().concat(["material", "texture", "sampler", "context"]);
	},

	type: function() {
		return "CanvasBoardComponent";
	},

	createContext: function() {
		if (!this.context)
			return;

		var rendererComponent = this.node.getComponent(CanvasBoardRendererComponent);
		if (!rendererComponent)
			return;

		this.canvas = document.createElement("canvas");
		this.canvasContext = this.canvas.getContext("2d");

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.canvasContext.fillStyle = "white";

		this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

		var width = 1;
		var height = 1;

		var submesh = this.mesh.submeshes[0];
		submesh.positions[0] = -0.5*width;
		submesh.positions[1] = -0.5*height;
		submesh.positions[3] = -0.5*width;
		submesh.positions[4] =  0.5*height;
		submesh.positions[6] =  0.5*width;
		submesh.positions[7] =  0.5*height;
		submesh.positions[9] =  0.5*width;
		submesh.positions[10]= -0.5*height;
		submesh.recalculateBounds();

		this.texture.setImage(this.context, this.canvas);

		if (rendererComponent.meshRenderers.length>0) {
			var renderer = rendererComponent.meshRenderers[0];
			renderer.buffer.update('position', submesh.positions);
		}
	},

	updateImage: function(){
		this.texture.setImage(this.context, this.canvas);
	},

	onStart: function(context, engine) {
		this.context = context;
		this.material = new Material(
			engine.assetsManager.addShaderSource("transparent"),
			{
				"diffuse": new UniformColor({r:1.0, g:1.0, b:1.0, a:1.0})
			},
			[ this.sampler ]
		);
		this.material.shader.requirements.transparent = true;
		this.material.name = 'CanvasBoardMaterial';
		this.texture = new Texture(context);
		this.texture.mipmapped = true;
		this.texture.clampToEdge = true;

		this.sampler.texture = this.texture;

		var submesh = new Submesh();
		submesh.positions = new Float32Array(12);
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
		this.mesh.addSubmesh(submesh, this.material);

		this.createContext();
	},

	getCanvasContext: function(){
		return this.canvasContext;
	}
});