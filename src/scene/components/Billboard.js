/** Makes the node always face camera */
var Billboard=Component.extend({ 
	init: function(cameraToLookAt, smoothRotation, rotationSpeed) {
		this._super();
		this.cameraToLookAt=cameraToLookAt;
		this.smoothRotation=(smoothRotation===true);
		this.rotationSpeed=4.0;
		if (rotationSpeed) this.rotationSpeed=rotationSpeed;

		// internal caches
		this.cacheMat4=[ mat4.create() ];
		this.cacheQuat=[ quat.create(), quat.create() ];
		this.cacheVec3=[ vec3.create(), vec3.create() ];
	},
	
	type: function() {
		return "Billboard";
	},
	
	onUpdate: function(engine) {
		if (!this.enabled)
			return;

		if (!(this.cameraToLookAt instanceof Camera))
			throw "Billboard.cameraToLookAt is not an instance of Camera";

		var delta=engine.fps.getDelta()/1000.0;
		var invViewMatrix = mat4.invert(this.cacheMat4[0], this.cameraToLookAt.viewMatrix);
		var rotation = quat.fromMat4(this.cacheQuat[0], invViewMatrix);
		if (this.smoothRotation) {
			var localRotation = quat.fromMat4(this.cacheQuat[1], this.node.transform.relative);
			quat.slerp(rotation, localRotation, rotation, this.rotationSpeed * delta);
		}
		quat.normalize(rotation, rotation);
		var localPosition = mat4.translation(this.cacheVec3[0], this.node.transform.relative);
		var localScale = mat4.getScale(this.cacheVec3[1], this.node.transform.relative);
		mat4.fromRotationTranslationScale(this.node.transform.relative, rotation, localPosition, localScale);
	}
});
