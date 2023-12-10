import Controller from 'scene/components/Controller';

/** Provides free flight mode for any node transform. */

class FlightController extends Controller {
	rotation: any;
	velocity: any;
	angularVelocity: any;
	acceleration: any;
	deceleration: any;
	friction: any;
	rotationAcceleration: any;
	rotationFriction: any;
	tmpRotation: any;
	tmpImpulse: any;

	constructor() {
		super();

		this.rotation=vec3.create();	// Create axis-angle based rotation

		this.velocity=vec3.fromValues(0, 0, 0);
		this.angularVelocity=vec3.fromValues(0, 0, 0);

		this.acceleration=0.2;
		this.deceleration=0.2;
		this.friction=0.01;
		this.rotationAcceleration=0.001;
		this.rotationFriction=0.1;

		this.tmpRotation = quat.create();
		this.tmpImpulse = vec3.create();
	}

	type(): any {
		return "FlightController";
	}

	onAdd(node): any {
		super.onAdd(node);
		this.bind('W', 'accelerate', this);
		this.bind('S', 'decelerate', this);
		this.bind('A', 'strafeLeft', this);
		this.bind('D', 'strafeRight', this);
		this.bind('C', 'moveDown', this);
		this.bind('space', 'moveUp', this);

		this.bind('up_arrow', 'accelerate', this);
		this.bind('down_arrow', 'decelerate', this);
		this.bind('left_arrow', 'strafeLeft', this);
		this.bind('right_arrow', 'strafeRight', this);
	}

	// Methods
	/** Called to accelerate */
	accelerate(deltaTime): any {
		this.addLocalImpulse([0, 0, -this.acceleration*deltaTime]);
	}

	/** Called to decelerate */
	decelerate(deltaTime): any {
		this.addLocalImpulse([0, 0, this.deceleration*deltaTime]);
	}

	/** Called to strafe left */
	strafeLeft(deltaTime): any {
		this.addLocalImpulse([-this.deceleration*deltaTime, 0, 0]);
	}

	/** Called to strafe right */
	strafeRight(deltaTime): any {
		this.addLocalImpulse([ this.deceleration*deltaTime, 0, 0]);
	}

	moveUp(deltaTime): any {
		this.addWorldImpulse([0, this.acceleration*deltaTime, 0]);
	}

	moveDown(deltaTime): any {
		this.addWorldImpulse([0, -this.acceleration*deltaTime, 0]);
	}

	/** Adds a world space impulse to velocity. */
	addWorldImpulse(impulse): any {
		vec3.add(this.velocity, this.velocity, impulse);
	}

	/** Adds local impulse vector (will be transformed by absolute transformation) to velocity */
	addLocalImpulse(impulse): any {
		quat.fromMat4(this.tmpRotation, this.node.transform.absolute);
		vec3.transformQuat(this.tmpImpulse, impulse, this.tmpRotation);
		vec3.add(this.velocity, this.velocity, this.tmpImpulse);
	}

	// Events
	/** Called each scene update to move parent node to new location.
		If newPosition is changed inside this method, it will be used as
		a new position instead of newPosition originally passed to this method.
		Override to provide collision detection as needed.
		@param oldPosition Old position of transform as vec3
		@param newPosition New position of transform as vec3
		@param rotation Rotation as quat
		@return True to apply new position, false to not apply it. Default: true
		*/
	onStep(oldPosition, newPosition, rotation): any {
		return true;
	}

	/** Called on each scene update */
	onUpdate(engine, pass): any {
		super.onUpdate(engine, pass);

		// Apply friction to velocity and angular velocity
		var td=engine.fps.getDelta();
		var ff=1.0+this.friction*td;
		vec3.scale(this.velocity, this.velocity, 1/ff);

		var rf=1.0+this.rotationFriction*td;
		vec3.scale(this.angularVelocity, this.angularVelocity, 1/rf);

		// Apply velocity in given time delta
		var temporaryVelocity=vec3.scale(vec3.create(), this.velocity, td);

		var temporaryAngularVelocity=vec3.scale(vec3.create(), this.angularVelocity, td);
		vec3.add(this.rotation, this.rotation, temporaryAngularVelocity);

		var rotation=quat.create();
		quat.rotateY(rotation, rotation, this.rotation[1]);
		quat.rotateX(rotation, rotation, this.rotation[0]);

		var oldPosition=mat4.translation(vec3.create(), this.node.transform.relative);
		var newPosition=vec3.add(vec3.create(), temporaryVelocity, oldPosition);

		if(this.onStep(oldPosition, newPosition, rotation)) mat4.fromRotationTranslation(this.node.transform.relative, rotation, newPosition);
	}

	/** Called each time mouse is moved */
	onMouseMove(position, button, delta) {
		if(button !== 0) return;
		var impulse=vec3.create();
		var ra=this.rotationAcceleration;
		vec3.scale(impulse, [-delta[1], -delta[0], 0.0], ra);
		vec3.add(this.angularVelocity, this.angularVelocity, impulse);
	}

}

globalThis.FlightController = FlightController;

export default FlightController;
