/** Provides restricted flight mode that is used for orbiting. */
var OrbitController=FlightController.extend({
	init: function() {
		this._super();

		this.target=new TypeReference("Transform");									///< Set to target transform

		this.panButton=2;
		this.rotateButton=0;

		// Positioning and panning
		this.position=vec3.create();			///< Current final position disregarding pan
		this.velocity=vec3.create();			///< Current velocity
		this.pan=vec3.create();						///< Panning added after calculating position
		this.minimumPan=[-100, -100, -100];
		this.maximumPan=[100, 100, 100];
		this.panXAxis=[1.0, 0.0, 0.0];		///< Mouse xAxis is multiplied with this vector to get horizontal panning axis
		this.panYAxis=[0.0, 0.0, 1.0];		///< Mouse yAxis is multiplied with this vector to get vertical panning axis
		this.panSpeed=0.05;

		// Rotation
		this.rotation=vec3.create();				///< Current rotation
		this.angularVelocity=vec3.create();	///< Angular velocity
		this.minimumPitch=-Math.PI/2.2;			///< Limits x-axis rotation
		this.maximumPitch=0;								///< Limits x-axis rotation
		this.rotationAcceleration=0.012;			///< Acceleration of rotation
		this.rotationFriction=0.1;					///< Friction of rotation applied to velocity

		this.lastPinch = 0;

		// Zooming
		this.zoomSpeed=1.0;								///< Zoom-speed
		this.doZoomIn=false;							///< Set to true to zoom in when onUpdate is called
		this.doZoomOut=false;							///< Set to true to zoom out when onUpdate is called

		// Current distance/zooming limits
		this.distance=5.0;								///< Set to current target distance
		this.minimumDistance=2.5;					///< Minimum distance
		this.maximumDistance=7.5;					///< Maximum distance
		this.distanceSteps=4;							///< When using mouse scroll, how many mouse scroll steps are required for distance to go from minimumDistance to maxDistance

		// cache for some variables used in onUpdate()
		this.direction=vec3.create();
		this.cameraPosition=vec3.create();
		this.targetPosition=vec3.create();
		this.lookat=mat4.create();


	},

	excluded: function() {
		return this._super().concat([
			"velocity", "angularVelocity", "doZoomIn", "doZoomOut",
			"direction", "cameraPosition", "targetPosition", "lookat"
		]);
	},

	type: function() {
		return "OrbitController";
	},

	onAdd: function(){
		this._super();

		this.bind('W', 'zoomIn', this);
		this.bind('S', 'zoomOut', this);
		this.bind('A', 'rotateLeft', this);
		this.bind('D', 'rotateRight', this);
		this.bind('E', 'rotateUp', this);
		this.bind('Q', 'rotateDown', this);
	},

	/** Get current zoom level */
	getZoom: function(){
		var relativeDistance = this.distance - this.minimumDistance;
		var range = this.maximumDistance - this.minimumDistance;
		return (relativeDistance/range);
	},

	/** Set zoom level based on a percentage */
	setZoom: function(percentage){
		percentage = Math.max(0, percentage);
		var range = this.maximumDistance - this.minimumDistance;
		this.distance = Math.min(this.minimumDistance + (range*percentage), this.maximumDistance);
	},

	setDistance: function(_distance){
		this.distance = Math.min(Math.max(_distance, this.minimumDistance), this.maximumDistance);
	},

	/** Zooms in by moving target distance closer */
	zoomIn: function(deltaTime) {
		if (!this.enabled)
			return;
		if(!deltaTime) deltaTime=1.0;
		this.distance-=deltaTime*this.zoomSpeed*(this.maximumDistance-this.minimumDistance)/this.distanceSteps;
		if(this.distance<this.minimumDistance) this.distance=this.minimumDistance;
	},

	/** Zooms out by moving target distance farther */
	zoomOut: function(deltaTime) {
		if (!this.enabled)
			return;
		if(!deltaTime) deltaTime=1.0;
		this.distance+=deltaTime*this.zoomSpeed*(this.maximumDistance-this.minimumDistance)/this.distanceSteps;
		if(this.distance>this.maximumDistance) this.distance=this.maximumDistance;
	},

	/** Accelerates to the left */
	rotateLeft: function(deltaTime) {
		this.accelerate([0.0, -this.rotationAcceleration, 0.0], deltaTime);
	},

	/** Accelerates to the right */
	rotateRight: function(deltaTime) {
		this.accelerate([0.0,  this.rotationAcceleration, 0.0], deltaTime);
	},

	/** Accelerates up */
	rotateUp: function(deltaTime) {
		this.accelerate([this.rotationAcceleration, 0.0, 0.0], deltaTime);
	},

	/** Accelerates down */
	rotateDown: function(deltaTime) {
		this.accelerate([-this.rotationAcceleration, 0.0, 0.0], deltaTime);
	},

	/** Accelerates by acceleration vector */
	accelerate: function(accelerationVector, deltaTime) {
		if (!this.enabled)
			return;
		vec3.scale(accelerationVector, accelerationVector, deltaTime);
		vec3.add(this.angularVelocity, this.angularVelocity, accelerationVector);
	},

	// Events
	/** Called on each scene update */
	onUpdate: function(engine, pass) {
		this._super(engine, pass);

		if(this.target.isNull()) return;	// No target to orbit

		// Move by current velocity
		vec3.add(this.rotation, this.rotation, this.angularVelocity);

		// Calculate desired position
		var rotation=quat.create();
		quat.rotateY(rotation, rotation, this.rotation[1]);
		quat.rotateX(rotation, rotation, this.rotation[0]);
		vec3.set(this.direction, 0.0, 0.0, 1.0);
		vec3.transformQuat(this.direction, this.direction, rotation);
		vec3.scale(this.direction, this.direction, this.distance);

		mat4.translation(this.targetPosition, this.target.value.absolute);
		vec3.add(this.cameraPosition, this.targetPosition, this.direction);
		vec3.add(this.targetPosition, this.targetPosition, this.pan);
		vec3.add(this.cameraPosition, this.cameraPosition, this.pan);

		// Look at target from calculated position
		mat4.lookAt(this.lookat, this.cameraPosition, this.targetPosition, [0, 1, 0]);
		mat4.invert(this.node.transform.absolute, this.lookat);

		this.node.calculateRelativeFromAbsolute();

		if(this.doZoomIn) this.zoomIn();
		if(this.doZoomOut) this.zoomOut();
	},


	/** Called when mouse is moved
		@param position Position of mouse as vec2
		@param buttons Buttons as array
		@param delta Mouse movement delta as vec2 */
	onMouseMove: function(position, button, delta) {
		if(this.rotateButton!==false && button == this.rotateButton) this.rotate(delta[1], delta[0]);
		if(this.panButton!==false && button == this.panButton) this.move(delta[0], delta[1]);
	},

	rotate: function(xDelta, yDelta) {
		var impulse=vec3.create();
		vec3.scale(impulse, [-xDelta, -yDelta, 0.0], this.rotationAcceleration);
		vec3.add(this.rotation, this.rotation, impulse);
		this.rotation[0]=Math.max(this.minimumPitch, this.rotation[0]);
		this.rotation[0]=Math.min(this.maximumPitch, this.rotation[0]);
	},

	move: function(xDelta, yDelta) {
		var delta=vec3.create();
		vec3.scale(delta, this.panXAxis, -xDelta);
		vec3.add(delta, delta, vec3.scale(vec3.create(), this.panYAxis, -yDelta));
		delta=vec3.scale(delta, delta, this.distance/900); //todo: use field of view times 20

		var q = quat.fromMat4(quat.create(), this.node.transform.absolute);
		var dir = vec3.fromValues(0, 0, 1);
		vec3.transformQuat(dir, dir, q);
		var angle = Math.atan2(dir[2], dir[0]);
		angle-=Math.PI/2.0;
		quat.identity(q);
		quat.rotateY(q, q, angle);
		quat.conjugate(q, q);
		quat.normalize(q, q);
		vec3.transformQuat(delta, delta, q);
		vec3.add(this.pan, this.pan, delta);

		this.pan[0]=Math.max(this.pan[0], this.minimumPan[0]);
		this.pan[1]=Math.max(this.pan[1], this.minimumPan[1]);
		this.pan[2]=Math.max(this.pan[2], this.minimumPan[2]);

		this.pan[0]=Math.min(this.pan[0], this.maximumPan[0]);
		this.pan[1]=Math.min(this.pan[1], this.maximumPan[1]);
		this.pan[2]=Math.min(this.pan[2], this.maximumPan[2]);
	},

	onPinch: function(position, scale){
		//Skip if it is still redrawing
		if(this.lastPinch === 0){
			this.lastPinch = this.getZoom();
		}

		scale =  this.lastPinch*(1/scale);
		this.setZoom(scale);
	},

	onRotate: function(position, rotation, type, event){
		var rad = (rotation * (Math.PI / 180));
		this.rotation[1] = this.rotation[1] + rad;
	},

	onMouseWheel: function(position, delta, type, event){
		if(delta<0) {
			this.zoomOut();
		}
		else {
			this.zoomIn();
		}
	}
});