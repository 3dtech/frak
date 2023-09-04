import RenderTarget from 'rendering/camera/RenderTarget';


class TargetScreen extends RenderTarget {
	position: any;

	constructor(size?) {
		super(size);
		this.position = vec2.create();
	}

	type(): any {
		return 'TargetScreen';
	}

	setPosition(x, y): any {
		this.position[0] = x;
		this.position[1] = y;
	}

	getPosition(): any {
		return this.position;
	}

	resetViewport() {
		this.setViewport(this.position[0], this.position[1], this.size[0], this.size[1]);
	}

}

globalThis.TargetScreen = TargetScreen;

export default TargetScreen;
