/** Can be used to render lines on screen.
	The lines are rendered with the same color for each line renderer.
 */
var LineRendererComponent=Component.extend({
	init: function(color) {
		this._super();

		this.shader=false;
		if (color instanceof Color)
			this.color=new UniformColor(color);
		else
			this.color=new UniformColor(new Color(0.5, 0.5, 0.5, 1.0));

		this.faces=[];
		this.vertices=[];
		this.buffer=false;
		this.updateBuffer=false;
		this.depthTest=false; ///< Set to true to enable GL_DEPTH_TEST in rendering
	},

	type: function() {
		return "LineRendererComponent";
	},

	excluded: function() {
		return this._super().concat(["buffer", "updateBuffer"]);
	},

	/** Initializes LineRenderer starting to load necessary shaders and creating white texture
		to be passed to transparency rendering shader */
	initialize: function(context) {
		this.shader=this.node.scene.engine.assetsManager.addShaderSource("Transparent");
		this.node.scene.engine.assetsManager.load();

		var white=new Texture(context);
		white.clearImage(context, [0xFF, 0xFF, 0xFF, 0xFF]);
		this.samplers=[new Sampler("diffuse0", white)];
	},

	/** (Re)builds buffers used for rendering. Call after adding new lines. */
	build: function(context) {
		if (this.vertices.length==0 || this.faces.length==0)
			return false;
		this.buffer=new RenderBuffer(context, this.faces, context.gl.DYNAMIC_DRAW);
		this.buffer.add('position', this.vertices, 3);
	},

	/** Clears the current vertices/faces buffers. */
	clear: function(context) {
		this.faces=[];
		this.vertices=[];

		// Delete RenderBuffer buffers ahead of GC (we will allocate a new RenderBuffer in the next build())
		for (var i in this.buffer.buffers) {
			context.gl.deleteBuffer(this.buffer.buffers[i]);
		}
		this.buffer=false;
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
		if(!this.buffer || !this.buffer.buffers.position) return; 	// Can't update buffers, because these don't exist yet
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

		this.updateBuffer=true;
	},

	/** Adds a triangle (lines AB, BC, CA). */
	addTriangle: function(a, b, c) {
		this.addLine(a, b);
		this.addLine(b, c);
		this.addLine(c, a);
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
	},

	onStart: function(context) {
		this.initialize(context);
		this.build(context);
	},

	onPostRender: function(context, camera) {
		if(!this.enabled || this.buffer===false)
			return;

		if(this.updateBuffer) {
			this.build(context);
		}

		var uniforms={
			"modelview": new UniformMat4(context.modelview.top()),
			"projection": new UniformMat4(context.projection.top()),
			"diffuse": this.color
		};
		this.shader.use(uniforms);
		this.shader.bindSamplers(this.samplers);
		this.shader.requirements.apply(this.buffer);

		var gl=context.gl;

		if (this.depthTest) {
			gl.enable(gl.DEPTH_TEST);
			gl.depthFunc(gl.LESS);
			gl.depthMask(true);
		}

		var locations=[];
		for(var bufferName in this.buffer.buffers) {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.buffers[bufferName]);
			var bufferLocation=gl.getAttribLocation(this.shader.program, bufferName);
			if(bufferLocation==-1) continue;
			gl.enableVertexAttribArray(bufferLocation);
			locations.push(bufferLocation);
			gl.vertexAttribPointer(bufferLocation, this.buffer.buffers[bufferName].itemSize, gl.FLOAT, false, 0, 0);
		}
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.facesBuffer);
		gl.drawElements(gl.LINES, this.buffer.facesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		for (var i in locations)
			gl.disableVertexAttribArray(locations[i]);

		if (this.depthTest) {
			gl.disable(gl.DEPTH_TEST);
		}
	}
});