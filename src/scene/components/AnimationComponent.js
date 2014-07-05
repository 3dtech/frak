/** AnimationComponent is used to play animations */
var AnimationComponent=Serializable.extend({
	init: function(animation) {
		this._super();
		this.active=false;
		this.animations=animations;
		this.playing=false;
		this.position=0.0;
	},
	
	play: function() {
	},
	
	stop: function() {
	},

	type: function() {
		return "AnimationPlayer";
	}
});