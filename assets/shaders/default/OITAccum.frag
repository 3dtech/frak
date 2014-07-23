/**
 * Weighted Blended Order-Independent Transparency - Accumulation program
 * Based on http://jcgt.org/published/0002/02/09/
 */

precision highp float;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

uniform int render_mode;

varying vec3 fragNormal;
varying vec4 fragPosition;
varying vec2 fragTexcoord2d0;

/**
 * Weight function 10 in the paper.
 */
float oit_weight(float z, float a) {
	float invz = (1.0 - z);
	return a * max(0.01, 3000.0 * invz * invz * invz);
}

vec4 pack(float depth) {
	const vec4 bitShift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
	const vec4 bitMask = vec4(0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);
	vec4 comp = fract(depth * bitShift);
	comp -= comp.xxyz * bitMask;
	return comp;
}

void main(void) {
	vec4 color = diffuse * texture2D(diffuse0, fragTexcoord2d0);

	if (render_mode == 0) {
		gl_FragColor = color;
	}
	else {
		float weight = oit_weight(gl_FragCoord.z, color.a);
		gl_FragColor = pack(weight);
	}
}
