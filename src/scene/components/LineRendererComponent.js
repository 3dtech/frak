/**
 * Can be used to render lines in 3D space.
 * The lines are all rendered with the same color per LineRendererComponent.
 */
var LineRendererComponent = RendererComponent.extend({
	init: function(color) {
		this._super();

		this.lightContribution = 0.0; // By default we do not want lighting to affect lines
		this.receiveShadows = false; // By default we do not want lines to receive shadows
		this.castShadows = false; // By default we do not want lines to cast shadows

		if (color instanceof Color)
			this.color = new UniformColor(color);
		else
			this.color = new UniformColor(new Color(0.5, 0.5, 0.5, 1.0));

		this.renderer = null;
		this.damaged = true;

		this.material = new Material(null, { 'diffuse': this.color }, []);
		this.overlay = false; ///< If set to true the lines are rendered in onPostRender instead of the usual pipeline

		this.faces = [];
		this.vertices = [];
	},

	type: function() {
		return "LineRendererComponent";
	},

	excluded: function() {
		return this._super().concat(["damaged", "renderer", "material"]);
	},

	onStart: function(context, engine) {
		// this.material.shader = engine.assetsManager.addShaderSource('diffuse');
		this.material.shader = engine.assetsManager.addShaderSource('transparent');
		this.material.samplers = [
			new Sampler('diffuse0', engine.WhiteTexture)
		];

		if (!this.renderer)
			this.renderer = new LineRenderer(context, this.node.transform.absolute, this.material);

		this.getScene().dynamicSpace.addRenderer(this.renderer);
	},

	onEnd: function(context) {
		if (this.renderer)
			this.getScene().dynamicSpace.removeRenderer(this.renderer);
		delete this.renderer;
		this.renderer = null;
	},

	onUpdate: function(context, engine) {
		if (this.damaged) {
			this.rebuild(context);
		}
	},

	onUpdateTransform: function(absolute) {
		if (this.renderer) {
			this.renderer.layer = this.node.layer;
			this.renderer.castShadows = this.castShadows;
			this.renderer.receiveShadows = this.receiveShadows;
			this.renderer.lightContribution = this.lightContribution;
			this.renderer.setMatrix(absolute);
		}
	},

	onEnable: function() {
		if (this.renderer)
			this.renderer.visible = true;
	},

	onDisable: function() {
		if (this.renderer)
			this.renderer.visible = false;
	},

	onPostRender: function(context, camera) {
		if (!this.overlay || !this.renderer)
			return;

		context.projection.push();
		context.modelview.push();

		context.projection.load(camera.projectionMatrix);
		context.modelview.load(camera.viewMatrix);
		context.modelview.multiply(this.node.transform.absolute);

		this.material.bind();
		this.renderer.renderGeometry(context, this.material.shader);
		this.material.unbind();

		context.projection.pop();
		context.modelview.pop();
	},

	rebuild: function(context) {
		// In case we wish to build our geometry before the scene is started
		if (!this.renderer) {
			this.renderer = new LineRenderer(context, this.node.transform.absolute, this.material);
		}

		this.renderer.buffer.updateFaces(this.faces);

		if (this.renderer.buffer.has('position')) {
			this.renderer.buffer.update('position', this.vertices);
		}
		else {
			this.renderer.buffer.add('position', this.vertices, 3);
		}

		this.damaged = false;
	},

	/** Clears the current vertices/faces buffers. */
	clear: function(context) {
		this.faces = [];
		this.vertices = [];
		this.damaged = true;
	},

	/** Adds new line to line renderer
		@param a Start point of line
		@param b End point of line
		@return An object that can be passed to updateLine for updating the position of line later*/
	addLine: function(a, b) {
		var base = this.vertices.length/3;
		var line={"vertexOffset": base};
		this.vertices.push(a[0], a[1], a[2], b[0], b[1], b[2]);
		this.faces.push(base, base+1);
		return line;
	},

	/** Updates line in line renderer. Lines can only be updated after the LineRenderer
		has started.
		@param line A line object previously returned from addLine method */
	updateLine: function(line, a, b) {
		// if(!this.buffer || !this.buffer.buffers.position) return; 	// Can't update buffers, because these don't exist yet
		var setWithOffset=function(buffer, offset, vertex) {
			buffer[offset*3+0]=vertex[0];
			buffer[offset*3+1]=vertex[1];
			buffer[offset*3+2]=vertex[2];
		};

		// Set new line values directly in rendering buffer
		//setWithOffset(this.buffer.bufferValues.position, line.vertexOffset+0, a);
		//setWithOffset(this.buffer.bufferValues.position, line.vertexOffset+1, b);

		// Set values in the cached vertices for updated values to be preserved, if more lines are called later
		setWithOffset(this.vertices, line.vertexOffset+0, a);
		setWithOffset(this.vertices, line.vertexOffset+1, b);

		this.damaged = true;
	},

	/** Adds a triangle (lines AB, BC, CA). */
	addTriangle: function(a, b, c) {
		this.addLine(a, b);
		this.addLine(b, c);
		this.addLine(c, a);

		this.damaged = true;
	},

	/** Adds a box based on bounding-box
		@param box An instance of BoundingBox */
	addBox: function(box) {
		if (!(box instanceof BoundingBox)) throw "LineRendererComponent.addBox expects box to be of type BoundingBox";
		this.addLine(box.min, [box.min[0], box.min[1], box.max[2]]);
		this.addLine(box.min, [box.min[0], box.max[1], box.min[2]]);
		this.addLine(box.min, [box.max[0], box.min[1], box.min[2]]);
		this.addLine(box.max, [box.max[0], box.min[1], box.max[2]]);
		this.addLine(box.max, [box.max[0], box.max[1], box.min[2]]);
		this.addLine(box.max, [box.min[0], box.max[1], box.max[2]]);
		this.addLine([box.min[0], box.max[1], box.min[2]], [box.min[0], box.max[1], box.max[2]]);
		this.addLine([box.min[0], box.max[1], box.max[2]], [box.min[0], box.min[1], box.max[2]]);
		this.addLine([box.min[0], box.min[1], box.max[2]], [box.max[0], box.min[1], box.max[2]]);
		this.addLine([box.max[0], box.min[1], box.max[2]], [box.max[0], box.min[1], box.min[2]]);
		this.addLine([box.max[0], box.min[1], box.min[2]], [box.max[0], box.max[1], box.min[2]]);
		this.addLine([box.max[0], box.max[1], box.min[2]], [box.min[0], box.max[1], box.min[2]]);

		this.damaged = true;
	},

	/** Creates a grid
		@param center The center of grid as vec3
		@param count Count of cells in the grid as vec2
		@param scale Scale of grid cells as vec2 [default: [1, 1]] */
	addGrid: function(center, count, scale) {
		var half=[count[0]/2.0, count[1]/2.0];
		if(!scale) scale=[1, 1];
		for(var i=-half[0]; i<=half[0]; i++) {
			this.addLine([i*scale[0]+center[0], center[1], -half[1]*scale[1]+center[2]],
			             [i*scale[0]+center[0], center[1],  half[1]*scale[1]+center[2]]);
		}
		for(i=-half[1]; i<=half[1]; i++) {
			this.addLine([-half[0]*scale[0]+center[0], center[1], i*scale[1]+center[2]],
			             [half[0]*scale[0]+center[0], center[1], i*scale[1]+center[2]]);
		}

		this.damaged = true;
	}
});