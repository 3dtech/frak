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

void main(void) {
	vec2 invSize = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
	vec2 coords = gl_FragCoord.xy * invSize;

	float w = texture2D(oitWeight, coords).r;
	vec4 transparentColor = texture2D(oitAccum, coords);
	vec4 solidColor = texture2D(src, coords);

	vec4 transparent = vec4(transparentColor.rgb / clamp(w, 1e-4, 5e4), transparentColor.a);
	gl_FragColor = (1.0 - transparent.a) * transparent + transparent.a * solidColor;
}
