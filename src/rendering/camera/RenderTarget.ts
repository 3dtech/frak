/** Render-target class */
class RenderTarget {
	viewport: any;
	size: any;

	constructor(size?) {
		this.viewport = {
			position: vec2.create(),
			size: vec2.create()
		};

		this.size = vec2.create();
		if (size) {
			vec2.copy(this.size, size);
			vec2.copy(this.viewport.size, size);
		}
	}

	type(): any {
		return 'RenderTarget';
	}

	/** Binds this rendertarget. All subsequent draw calls go to this render-target */
	bind(context, ...args): any {
		context.gl.viewport(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
		context.gl.scissor(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
		context.gl.enable(context.gl.SCISSOR_TEST);
	}

	/** Unbinds this rendertarget. */
	unbind(context): any {
		context.gl.disable(context.gl.SCISSOR_TEST);
	}

	/** Sets RenderTarget size */
	setSize(width, height): any {
		this.size[0] = width;
		this.size[1] = height;
	}

	/** Returns RenderTarget size */
	getSize(): any {
		return this.size;
	}

	/** Sets RenderTarget viewport position and size */
	setViewport(x, y, width, height): any {
		vec2.set(this.viewport.position, x, y);
		vec2.set(this.viewport.size, width, height);
	}

	/** Inherits viewport parameters from another RenderTarget */
	inheritViewport(other): any {
		vec2.copy(this.viewport.position, other.viewport.position);
		vec2.copy(this.viewport.size, other.viewport.size);
	}

	/** Sets viewport to cover the entire RenderTarget */
	resetViewport() {
		this.setViewport(0, 0, this.size[0], this.size[1])
	}
}

globalThis.RenderTarget = RenderTarget;
export default RenderTarget;
