/** Provides free flight mode for any node transform. */
var FlightController=Controller.extend({ 
	init: function() {
		this._super();
		
		this.bind('W', 'accelerate');
		this.bind('S', 'decelerate');
		this.bind('A', 'strafeLeft');
		this.bind('D', 'strafeRight');
		
		this.bind('up_arrow', 'accelerate');
		this.bind('down_arrow', 'decelerate');
		this.bind('left_arrow', 'strafeLeft');
		this.bind('right_arrow', 'strafeRight');
		
		
		this.rotation=vec3.create();	// Create axis-angle based rotation
		
		this.velocity=vec3.fromValues(0, 0, 0);
		this.angularVelocity=vec3.fromValues(0, 0, 0);
		
		this.acceleration=0.2;
		this.deceleration=0.2;
		this.friction=0.01;
		this.rotationAcceleration=0.001;
		this.rotationFriction=0.1;
	},
	
	type: function() {
		return "FlightController";
	},
	
	// Methods	
	/** Called to accelerate */
	accelerate: function(deltaTime) {
		this.addLocalImpulse([0, 0, -this.acceleration*deltaTime]);
	},
	
	/** Called to decelerate */
	decelerate: function(deltaTime) {
		this.addLocalImpulse([0, 0, this.deceleration*deltaTime]);
	},
	
	/** Called to strafe left */
	strafeLeft: function(deltaTime) {
		this.addLocalImpulse([-this.deceleration*deltaTime, 0, 0]);
	},
	
	/** Called to strafe right */
	strafeRight: function(deltaTime) {
		this.addLocalImpulse([ this.deceleration*deltaTime, 0, 0]);
	},
	
	/** Adds local impulse vector (will be transformed by absolute transformation) to velocity */
	addLocalImpulse: function(impulse) {
		var relativeImpulse=vec3.create();
		var rotation=quat.create();
		
		quat.fromMat4(rotation, this.node.transform.absolute);
		vec3.transformQuat(relativeImpulse, impulse, rotation);
		vec3.add(this.velocity, this.velocity, relativeImpulse);
	},
	
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
	onStep: function(oldPosition, newPosition, rotation) {
		return true;
	},
	
	/** Called on each scene update */
	onUpdate: function(engine, pass) {
		this._super(engine, pass);
		
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
	},
	
	/** Called each time mouse is moved */
	onMouseMove: function(position, buttons, delta) {
		if(!buttons[0]) return;
		var impulse=vec3.create();
		var ra=this.rotationAcceleration;
		vec3.scale(impulse, [delta[1], delta[0], 0.0], ra);
		vec3.add(this.angularVelocity, this.angularVelocity, impulse);
	}
});