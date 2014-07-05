/**
 * RGBA color
 * @param r Red intensity in range [0, 1]
 * @param g Green intensity in range [0, 1]
 * @param b Blue intensity in range [0, 1]
 * @param a Opacity in range [0, 1]
 */
var Color = function(r, g, b, a) {
	this.r=1.0;
	this.g=1.0;
	this.b=1.0;
	this.a=1.0;
	
	this.clone=function() {
		return new Color(this.r, this.g, this.b, this.a);
	}
	
	this.fromHex=function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
		if (result) {
			this.r = parseInt(result[1], 16)/255.0;
			this.g = parseInt(result[2], 16)/255.0;
			this.b = parseInt(result[3], 16)/255.0;
			if (result[4]) this.a = parseInt(result[4], 16)/255.0;
		}
		return this;
	}
	
	this.toHex=function() {
		var componentToHex = function(v) {
			var h = v.toString(16);
			return h.length==1?"0"+h:h;
		}
		return "#" + componentToHex(this.r*255) + componentToHex(this.g*255) + componentToHex(this.b*255) + componentToHex(this.a*255);
	}
	
	/** Returns CSS rgba representation of the color */
	this.toString=function() {
		return "rgba("+(this.r*255.0)+", "+(this.g*255.0)+", "+(this.b*255.0)+", "+this.a+")";
	}

	this.toVector=function() {
		return vec4.fromValues(this.r, this.g, this.b, this.a);
	}
	
	this.set=function(r, g, b, a) {
		if (typeof(r)=='number') this.r=r;
		if (typeof(g)=='number') this.g=g;
		if (typeof(b)=='number') this.b=b;
		if (typeof(a)=='number') this.a=a;
	}
	
	this.set(r, g, b, a);
}