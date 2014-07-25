/**
 * Weighted Blended Order-Independent Transparency - Accumulation program
 * Based on http://jcgt.org/published/0002/02/09/
 */

precision highp float;

uniform vec4 diffuse;
uniform sampler2D diffuse0;

uniform int render_mode;

uniform float zNear;
uniform float zFar;

varying vec3 fragNormal;
varying vec4 fragPosition;
varying vec2 fragTexcoord2d0;

/**
 * Weight function 10 in the paper.
 */
float oit_weight_frag(float z, float a) {
	float invz = (1.0 - z);
	return a * max(0.01, 3000.0 * invz * invz * invz);
}

float oit_weight(float z, float a) {
	return pow(a + 0.01, 4.0) + max(1e-2, min(3.0 * 1e3, 100.0 / (1e-5 + pow(abs(z) / 10.0, 3.0) + pow(abs(z) / 200.0, 6.0))));
}

vec4 lighting() {
	/* TODO: proper lighting for transparent surfaces */

	vec4 textureColor = texture2D(diffuse0, fragTexcoord2d0);
	vec4 color = diffuse * textureColor;
	return color;
}

void main(void) {
	vec4 color = lighting();
	float linDepth = 2.0 * zNear * zFar / (zFar + zNear - (2.0 * -fragPosition.z - 1.0) * (zFar - zNear));
	float weight = oit_weight(linDepth, color.a);

	if (render_mode == 0) {
		vec3 c = color.rgb * color.a;
		gl_FragColor = vec4(c * weight, color.a);
	}
	else {
		gl_FragColor = vec4(color.a * weight);

		// float visDepth = (2.0 * zNear) / (zFar + zNear - gl_FragCoord.z * (zFar - zNear));
		// gl_FragColor = vec4(visDepth);
	}
}
