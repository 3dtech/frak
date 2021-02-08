/**
 * Can be used to render lines in 3D space.
 * The lines are all rendered with the same color per LineRendererComponent.
 */
var LineRendererComponent = RendererComponent.extend({
	init: function(color, width) {
		this._super();

		this.lightContribution = 0.0; // By default we do not want lighting to affect lines
		this.receiveShadows = false; // By default we do not want lines to receive shadows
		this.castShadows = false; // By default we do not want lines to cast shadows

		if (color instanceof Color) {
			this.color = new UniformColor(color);
			this.defaultColor = color;
		} else {
			this.color = new UniformColor(new Color(0.5, 0.5, 0.5, 1.0));
			this.defaultColor = new Color();
		}

		this.defaultWidth = width || 1;
		this.maxWidth = this.defaultWidth;
		this.roundCapPoints = 2;

		this.renderer = null;
		this.damaged = true;

		this.material = new Material(null, {
			viewport: new UniformVec2(),
		}, []);
		this.overlay = false; ///< If set to true the lines are rendered in onPostRender instead of the usual pipeline

		this.lines = [];
	},

	type: function() {
		return "LineRendererComponent";
	},

	excluded: function() {
		return this._super().concat(["damaged", "renderer", "material"]);
	},

	onStart: function(context, engine) {
		this.material.shader = engine.assetsManager.addShaderSource('lines');
		this.material.samplers = [];
		vec2.copy(this.material.uniforms.viewport.value, engine.scene.camera.target.size);

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

	onPreRender: function(context, camera) {
		vec2.copy(this.material.uniforms.viewport.value, camera.target.size);
	},

	onPostRender: function(context, camera) {
		if (!this.overlay || !this.renderer || !this.enabled)
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
		if (this.lines.length == 0) {
			return;
		}

		if (!this.renderer) {
			this.renderer = new LineRenderer(context, this.node.transform.absolute, this.material);
		}

		var vertices = [];
		var faces = [];
		var pointsA = [];
		var pointsB = [];
		var widths = [];
		var colors = [];
		var rcp = this.roundCapPoints;
		var createLineGeometry = function() {
			var vertexOffset = vertices.length / 3;

			vertices.push(0, -0.5, 0);
			vertices.push(0, 0.5, 0);
			vertices.push(0, 0.5, 1);
			vertices.push(0, -0.5, 1);

			var count = 4;

			faces.push(
				vertexOffset,
				vertexOffset + 1,
				vertexOffset + 2,
				vertexOffset,
				vertexOffset + 2,
				vertexOffset + 3
			);

			// Cap centers
			vertices.push(0, 0, 0);
			vertices.push(0, 0, 1);

			count += 2;

			for (var z = 0; z < 2; z++) {
				var t = 3 * Math.PI / 2 - z * Math.PI;
				vertices.push(0.5 * Math.cos(t), 0.5 * Math.sin(t), z);
				count++;

				var offset = count - 1;

				for (var i = 1; i < rcp + 1; i++) {
					var theta0 = 3 * Math.PI / 2 - ((i + rcp * z) / rcp) * Math.PI;
					vertices.push(0.5 * Math.cos(theta0), 0.5 * Math.sin(theta0), z);

					faces.push(
						vertexOffset + 4 + z,
						vertexOffset + offset + i - 1,
						vertexOffset + offset + i
					);

					count++;
				}
			}

			return count;
		}

		if (!this.renderer.instanced) {
			for (var i = 0; i < this.lines.length; i++) {
				var count = createLineGeometry();
				for (var j = 0; j < count; j++) {
					pointsA.push(this.lines[i].a[0], this.lines[i].a[1], this.lines[i].a[2]);
					pointsB.push(this.lines[i].b[0], this.lines[i].b[1], this.lines[i].b[2]);
					colors.push(this.lines[i].color.r, this.lines[i].color.g, this.lines[i].color.b, this.lines[i].color.a);
					widths.push(this.lines[i].width);
				}
			}
		} else {
			createLineGeometry();
			for (var i = 0; i < this.lines.length; i++) {
				pointsA.push(this.lines[i].a[0], this.lines[i].a[1], this.lines[i].a[2]);
				pointsB.push(this.lines[i].b[0], this.lines[i].b[1], this.lines[i].b[2]);
				colors.push(this.lines[i].color.r, this.lines[i].color.g, this.lines[i].color.b, this.lines[i].color.a);
				widths.push(this.lines[i].width);
			}
		}

		this.renderer.count = this.lines.length;

		this.renderer.buffer.updateFaces(faces);

		var _this = this;
		var addOrUpdateBuffer = function(name, items, itemSize, divisor) {
			if (_this.renderer.buffer.has(name)) {
				_this.renderer.buffer.update(name, items);
			} else {
				_this.renderer.buffer.add(name, items, itemSize, divisor);
			}
		};

		addOrUpdateBuffer('position', vertices, 3, 0);
		addOrUpdateBuffer('pointA', pointsA, 3, 1);
		addOrUpdateBuffer('pointB', pointsB, 3, 1);
		addOrUpdateBuffer('width', widths, 1, 1);
		addOrUpdateBuffer('color', colors, 4, 1);

		this.damaged = false;
	},

	/** Clears the current vertices/faces buffers. */
	clear: function(context) {
		this.lines = [];
		this.damaged = true;
	},

	/** Add a new line
	 *  @param a {[x: number, y: number, z: number]} Start point of the line
	 *  @param b {[x: number, y: number, z: number]} End point of the line
	 *  @param color {Color?} Color of the line
	 *  @param width {number?} Width of the line
	 */
	addLine: function(a, b, color, width) {
		var lineID = this.lines.length;

		this.lines.push({
			a: a,
			b: b,
			color: color || this.defaultColor,
			width: width || this.defaultWidth
		});

		this.damaged = true;

		if (width && width > this.maxWidth) {
			this.maxWidth = width;
			this.roundCapPoints = Math.pow(2, Math.max(1, Math.round(Math.log2(width)) - 2));
		}

		return {
			vertexOffset: lineID,
		}
	},

	/** Add lines to the renderer
	 *  @param lines {{
	 * 		a: [x: number, y: number, z: number],
	 * 		b: [x: number, y: number, z: number],
	 * 		color: Color?,
	 * 		width: number?
	 * }[]} Array of lines to add
	*/
	addLines: function(lines) {
		var _this = this;

		return lines.map(function(line) {
			return _this.addLine(
				line.a,
				line.b,
				line.color,
				line.width
			);
		});
	},

	updateLine: function(line, a, b, color, width) {
		var line = this.lines[line.vertexOffset];

		line.a = a;
		line.b = b;
		line.color = color || line.color;
		line.width = width || line.width;

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
		var half = [count[0] / 2.0, count[1] / 2.0];
		if (!scale) scale = [1, 1];
		for (var i = -half[0]; i <= half[0]; i++) {
			this.addLine([i * scale[0] + center[0], center[1], -half[1] * scale[1] + center[2]],
				[i * scale[0] + center[0], center[1], half[1] * scale[1] + center[2]]);
		}
		for (i = -half[1]; i <= half[1]; i++) {
			this.addLine([-half[0] * scale[0] + center[0], center[1], i * scale[1] + center[2]],
				[half[0] * scale[0] + center[0], center[1], i * scale[1] + center[2]]);
		}

		this.damaged = true;
	},

	onContextRestored: function(context) {
		this._super(context);

		if (this.renderer) {
			this.damaged = true;
			delete this.renderer.buffer;
			this.renderer.buffer = new LinesRenderBuffer(context);
			this.rebuild(context);
		}
	}
});
