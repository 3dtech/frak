/** Directional light shadow-map */
precision highp float;

uniform int hasFloat;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

varying float depth;
varying vec2 uv;

vec4 pack(float depth) {
	const vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
	const vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);
	vec4 comp = fract(depth * bitShift);
	comp -= comp.xxyz * bitMask;
	return comp;
}

void main() {
	vec4 textureColor = texture2D(diffuse0, uv);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	float d = (depth + 1.0) * 0.5;

	if (hasFloat == 1) {
		gl_FragColor = vec4(d, d, d, 1.0);
	}
	else {
		gl_FragColor = pack(d);
	}

}
