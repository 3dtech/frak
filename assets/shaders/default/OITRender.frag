/**
 * Weighted Blended Order-Independent Transparency - Compositing program
 * Based on http://jcgt.org/published/0002/02/09/
 */

precision highp float;

varying vec2 uv;

uniform vec2 ViewportSize;
uniform sampler2D src;
uniform sampler2D oitAccum;
uniform sampler2D oitWeight;

float unpack(vec4 c) {
	const vec4 bitShifts = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
	return dot(c, bitShifts);
}

void main(void) {
	vec2 invSize = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
	vec2 coords = gl_FragCoord.xy * invSize;
	vec4 color = texture2D(oitAccum, coords);
	vec4 solid = texture2D(src, coords);
	float w = unpack(texture2D(oitWeight, coords));
    vec4 transparent = vec4(color.rgb / clamp(w, 1e-4, 5e4), color.a);
    gl_FragColor = (1.0 - transparent.a) * transparent + transparent.a * solid;
}
