/**
 * RGBA color
 * @param r Red intensity in range [0, 1]
 * @param g Green intensity in range [0, 1]
 * @param b Blue intensity in range [0, 1]
 * @param a Opacity in range [0, 1]
 */
class Color {
	r = 1;
	g = 1;
	b = 1;
	a = 1;

	constructor(r?, g?, b?, a?) {
		this.set(r, g, b, a);
	}

	clone() {
		return new Color(this.r, this.g, this.b, this.a);
	}

	fromHex(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
		if (result) {
			this.r = parseInt(result[1], 16)/255.0;
			this.g = parseInt(result[2], 16)/255.0;
			this.b = parseInt(result[3], 16)/255.0;
			if (result[4]) this.a = parseInt(result[4], 16)/255.0;
		}
		return this;
	}

	toHex() {
		return "#" +
			("0" + Math.round(this.r*255).toString(16)).slice(-2) +
			("0" + Math.round(this.g*255).toString(16)).slice(-2) +
			("0" + Math.round(this.b*255).toString(16)).slice(-2) +
			("0" + Math.round(this.a*255).toString(16)).slice(-2);
	}

	/** Returns CSS rgba representation of the color */
	toString() {
		return "rgba("+Math.floor(this.r*255.0)+", "+Math.floor(this.g*255.0)+", "+Math.floor(this.b*255.0)+", "+this.a+")";
	}

	toVector(out?) {
		if (!out)
			out = vec4.create();
		vec4.set(out, this.r, this.g, this.b, this.a);
		return out;
	}

	set(r?, g?, b?, a?) {
		if (typeof(r)=='number') this.r=r;
		if (typeof(g)=='number') this.g=g;
		if (typeof(b)=='number') this.b=b;
		if (typeof(a)=='number') this.a=a;
		return this;
	}
}

globalThis.Color = Color;
export default Color;
