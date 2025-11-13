import RendererComponent from "scene/components/RendererComponent";
import UniformColor from "rendering/shaders/UniformColor";
import Material, { RendererType } from "rendering/materials/Material";
import UniformVec2 from "rendering/shaders/UniformVec2";
import LineRenderer from "rendering/renderers/LineRenderer";
import BoundingBox from "scene/geometry/BoundingBox";
import Color from "rendering/Color";
import LinesRenderBufferInstanced from "rendering/buffers/LinesRenderBufferInstanced";
import type Engine from "engine/Engine";

/**
 * Can be used to render lines in 3D space.
 * The lines are all rendered with the same color per LineRendererComponent.
 */

class LineRendererComponent extends RendererComponent {
	color: any;
	defaultColor: any;
	defaultWidth: any;
	maxWidth: any;
	roundCapPoints: any;
	renderer: any;
	damaged: any;
	material: any;
	overlay: any;
	lines: any;

	constructor(color?, width?) {
		super();

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
		this.roundCapPoints = Math.pow(2, Math.max(1, Math.round(Math.log2(this.defaultWidth)) - 2));

		this.renderer = null;
		this.damaged = true;

		this.material = new Material(null, {
			viewport: new UniformVec2(),
		}, []);

		this.material.setType(RendererType.Custom);
		this.overlay = false; // /< If set to true the lines are rendered in onPostRender instead of the usual pipeline

		this.lines = [];
	}

	type(): any {
		return "LineRendererComponent";
	}

	excluded(): any {
		return super.excluded().concat(["damaged", "renderer", "material"]);
	}

	onStart(context, engine): any {
		this.material.shader = engine.assetsManager.addShaderSource("lines");
		this.material.samplers = [];
		vec2.copy(this.material.uniforms.viewport.value, engine.scene.camera.target.size);

		if (!this.renderer) { this.renderer = new LineRenderer(context, this.node.transform.absolute, this.material); }

		this.getScene().dynamicSpace.addRenderer(this.renderer);

		engine.assetsManager.load();
	}

	onEnd(context): any {
		if (this.renderer) { this.getScene().dynamicSpace.removeRenderer(this.renderer); }

		delete this.renderer;
		this.renderer = null;
	}

	onUpdate(engine: Engine): any {
		if (this.damaged) {
			this.rebuild(engine.context);
		}
	}

	onUpdateTransform(absolute): any {
		if (this.renderer) {
			this.renderer.layer = this.node.layer;
			this.renderer.castShadows = this.castShadows;
			this.renderer.receiveShadows = this.receiveShadows;
			this.renderer.lightContribution = this.lightContribution;
			this.renderer.setMatrix(absolute);
		}
	}

	onEnable(): any {
		if (this.renderer) { this.renderer.visible = true; }
	}

	onDisable(): any {
		if (this.renderer) { this.renderer.visible = false; }
	}

	onPreRender(context, camera): any {
		vec2.copy(this.material.uniforms.viewport.value, camera.target.size);
	}

	onPostRender(context, camera): any {
		if (!this.overlay || !this.renderer || !this.enabled) { return; }

		this.material.bind();
		this.renderer.renderGeometry(context, this.material.shader);
		this.material.unbind();
	}

	rebuild(context): any {
		if (!this.renderer) {
			this.renderer = new LineRenderer(context, this.node.transform.absolute, this.material);
		}

		let vertices = [];
		let faces = [];
		let pointsA = [];
		let pointsB = [];
		let widths = [];
		let colors = [];
		let rcp = this.roundCapPoints;
		let createLineGeometry = function () {
			let vertexOffset = vertices.length / 3;

			vertices.push(0, -0.5, 0);
			vertices.push(0, 0.5, 0);
			vertices.push(0, 0.5, 1);
			vertices.push(0, -0.5, 1);

			let count = 4;

			faces.push(
				vertexOffset,
				vertexOffset + 1,
				vertexOffset + 2,
				vertexOffset,
				vertexOffset + 2,
				vertexOffset + 3,
			);

			// Cap centers
			vertices.push(0, 0, 0);
			vertices.push(0, 0, 1);

			count += 2;

			for (let z = 0; z < 2; z++) {
				let t = 3 * Math.PI / 2 - z * Math.PI;

				vertices.push(0.5 * Math.cos(t), 0.5 * Math.sin(t), z);
				count++;

				let offset = count - 1;

				for (let i = 1; i < rcp + 1; i++) {
					let theta0 = 3 * Math.PI / 2 - ((i + rcp * z) / rcp) * Math.PI;

					vertices.push(0.5 * Math.cos(theta0), 0.5 * Math.sin(theta0), z);

					faces.push(
						vertexOffset + 4 + z,
						vertexOffset + offset + i - 1,
						vertexOffset + offset + i,
					);

					count++;
				}
			}

			return count;
		};

		if (this.lines.length) {
			createLineGeometry();

			for (let i = 0; i < this.lines.length; i++) {
				pointsA.push(this.lines[i].a[0], this.lines[i].a[1], this.lines[i].a[2]);
				pointsB.push(this.lines[i].b[0], this.lines[i].b[1], this.lines[i].b[2]);
				colors.push(this.lines[i].color.r, this.lines[i].color.g, this.lines[i].color.b, this.lines[i].color.a);
				widths.push(this.lines[i].width);
			}
		}

		this.renderer.count = this.lines.length;

		this.renderer.buffer.updateFaces(faces);

		let _this = this;
		let addOrUpdateBuffer = function (name, items, itemSize, divisor) {
			if (_this.renderer.buffer.has(name)) {
				_this.renderer.buffer.update(name, items);
			} else {
				_this.renderer.buffer.add(name, items, itemSize, divisor);
			}
		};

		addOrUpdateBuffer("position", vertices, 3, 0);
		addOrUpdateBuffer("pointA", pointsA, 3, 1);
		addOrUpdateBuffer("pointB", pointsB, 3, 1);
		addOrUpdateBuffer("width", widths, 1, 1);
		addOrUpdateBuffer("color", colors, 4, 1);

		this.damaged = false;
	}

	/** Clears the current vertices/faces buffers. */
	clear(context): any {
		this.lines = [];
		this.damaged = true;
	}

	/** Add a new line
	 *  @param a {[x: number, y: number, z: number]} Start point of the line
	 *  @param b {[x: number, y: number, z: number]} End point of the line
	 *  @param color {Color?} Color of the line
	 *  @param width {number?} Width of the line
	 */
	addLine(a, b, color?, width?): any {
		let lineID = this.lines.length;

		this.lines.push({
			a: a,
			b: b,
			color: color || this.defaultColor,
			width: width || this.defaultWidth,
		});

		this.damaged = true;

		if (width && width > this.maxWidth) {
			this.maxWidth = width;
			this.roundCapPoints = Math.pow(2, Math.max(1, Math.round(Math.log2(width)) - 2));
		}

		return {
			vertexOffset: lineID,
		};
	}

	/** Add lines to the renderer
	 *  @param lines {{
	 * 		a: [x: number, y: number, z: number],
	 * 		b: [x: number, y: number, z: number],
	 * 		color: Color?,
	 * 		width: number?
	 * }[]} Array of lines to add
	*/
	addLines(lines): any {
		let _this = this;

		return lines.map(function (line) {
			return _this.addLine(
				line.a,
				line.b,
				line.color,
				line.width,
			);
		});
	}

	updateLine(line, a, b, color, width): any {
		var line = this.lines[line.vertexOffset];

		line.a = a;
		line.b = b;
		line.color = color || line.color;
		line.width = width || line.width;

		this.damaged = true;
	}

	/** Adds a triangle (lines AB, BC, CA). */
	addTriangle(a, b, c): any {
		this.addLine(a, b);
		this.addLine(b, c);
		this.addLine(c, a);

		this.damaged = true;
	}

	/** Adds a box based on bounding-box
		@param box An instance of BoundingBox */
	addBox(box): any {
		if (!(box instanceof BoundingBox)) { throw "LineRendererComponent.addBox expects box to be of type BoundingBox"; }

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
	}

	/** Creates a grid
		@param center The center of grid as vec3
		@param count Count of cells in the grid as vec2
		@param scale Scale of grid cells as vec2 [default: [1, 1]] */
	addGrid(center, count, scale): any {
		let half = [count[0] / 2.0, count[1] / 2.0];
		if (!scale) { scale = [1, 1]; }

		for (var i = -half[0]; i <= half[0]; i++) {
			this.addLine(
				[i * scale[0] + center[0], center[1], -half[1] * scale[1] + center[2]],
				[i * scale[0] + center[0], center[1], half[1] * scale[1] + center[2]],
			);
		}

		for (i = -half[1]; i <= half[1]; i++) {
			this.addLine(
				[-half[0] * scale[0] + center[0], center[1], i * scale[1] + center[2]],
				[half[0] * scale[0] + center[0], center[1], i * scale[1] + center[2]],
			);
		}

		this.damaged = true;
	}

	onContextRestored(context) {
		super.onContextRestored(context);

		this.material.shader?.onContextRestored(context);

		if (this.renderer) {
			this.damaged = true;
			delete this.renderer.buffer;
			this.renderer.buffer = new LinesRenderBufferInstanced(context);
			this.rebuild(context);
		}
	}
}

globalThis.LineRendererComponent = LineRendererComponent;

export default LineRendererComponent;
