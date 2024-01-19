/** Render-target class */
class RenderTarget {
	viewport: any;
	frameBuffer: WebGLFramebuffer = null;

	constructor(public size = vec2.create(), public position = vec2.create()) {
		this.viewport = {
			position: vec2.copy(vec2.create(), position),
			size: vec2.copy(vec2.create(), size),
		};
	}

	type(): any {
		return 'RenderTarget';
	}

	/** Binds this rendertarget. All subsequent draw calls go to this render-target */
	bind(context, ...args): any {
		context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, this.frameBuffer);
		context.gl.viewport(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
		context.gl.scissor(this.viewport.position[0], this.viewport.position[1], this.viewport.size[0], this.viewport.size[1]);
		context.gl.enable(context.gl.SCISSOR_TEST);
	}

	/** Unbinds this rendertarget. */
	unbind(context): any {
		context.gl.disable(context.gl.SCISSOR_TEST);
		context.gl.bindFramebuffer(context.gl.FRAMEBUFFER, null);
	}

	setPosition(x, y): any {
		this.position[0] = x;
		this.position[1] = y;
	}

	getPosition(): any {
		return this.position;
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

	set(x, y, width, height) {
		this.setPosition(x, y);
		this.setSize(width, height);
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

	resetViewport() {
		this.setViewport(this.position[0], this.position[1], this.size[0], this.size[1]);
	}
}

globalThis.RenderTarget = RenderTarget;
export default RenderTarget;
