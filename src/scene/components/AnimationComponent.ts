import Serializable from 'scene/Serializable.js'

/** AnimationComponent is used to play animations */

class AnimationComponent extends Serializable {
	active: any;
	animations: any;
	playing: any;
	position: any;
	
	constructor(animation) {
		super();
		this.active=false;
		this.animations=animations;
		this.playing=false;
		this.position=0.0;
	}
	
	play(): any {
	}
	
	stop(): any {
	}

	type() {
		return "AnimationPlayer";
	}

}

globalThis.AnimationComponent = AnimationComponent;

export default AnimationComponent;