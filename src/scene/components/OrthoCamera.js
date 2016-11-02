/** Camera providing orthographic projection */
var OrthoCamera=CameraComponent.extend({
	init: function(left, right, bottom, top, near, far) {
		if(!left) left=0;
		if(!right) right=512;
		if(!bottom) bottom=512;
		if(!top) top=0;
		if(!near) near=-100;
		if(!far) far=100;
		var projection=mat4.ortho(mat4.create(), left, right, bottom, top, near, far) 
		this._super(mat4.identity(mat4.create()), projection);
	},
	
	type: function() {
		return "OrthoCamera";
	}
});