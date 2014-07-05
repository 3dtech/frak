// DebugPackedDepthTexture
precision highp float;

#define USE_VSM

uniform mat4 modelview;
uniform vec4 diffuse;
uniform sampler2D diffuse0;

varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec2 uv0;

float unpack(vec4 c) {
	const vec4 bitShifts = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
	return dot(c, bitShifts);
}

float unpackHalf(vec2 c) {
	return c.x + (c.y / 255.0);
}

void main(void) {
	vec4 texel = texture2D(diffuse0, uv0);

#ifdef USE_VSM
	gl_FragColor = vec4(0.0, unpackHalf(texel.xy), unpackHalf(texel.zw), 1.0);
#else
	float depth = unpack(texel);
	gl_FragColor = vec4(depth, depth, depth, 1.0);
#endif
}
