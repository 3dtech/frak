#version 300 es

/**
 * Weighted Blended Order-Independent Transparency - Compositing program
 * Based on http://jcgt.org/published/0002/02/09/
 */

precision highp float;

in vec2 uv;

uniform vec2 ViewportSize;
uniform int render_mode;

uniform sampler2D src;
uniform sampler2D oitAccum;
uniform sampler2D oitWeight;

out vec4 fragColor;


void addRelevantSample(vec2 coords, float weight, inout vec4 accum) {
	vec4 texel = texture(oitAccum, coords);
	if (texel.a < 1.0)
		return;
	float a = texture(oitWeight, coords).a;
	if (a>0.99)
		return;
	accum += texel * weight * a;
}

vec4 avgColor(sampler2D s, vec2 coords) {
	vec2 step = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);

	vec2 kernel[8];
	kernel[0] = vec2(-step.x, step.y);
	kernel[1] = vec2(0.0, step.y);
	kernel[2] = vec2(step.x, step.y);
	kernel[3] = vec2(step.x, 0.0);
	kernel[4] = vec2(-step.x, 0.0);
	kernel[5] = vec2(-step.x, -step.y);
	kernel[6] = vec2(0.0, -step.y);
	kernel[7] = vec2(step.x, -step.y);

	vec4 sum = vec4(0.0);
	float weight = 1.0 / (2.0 + 1.0);
	float kernelSize = 1.0;

	addRelevantSample(coords, weight, sum);

	for (int i=0; i<8; i++) {
		addRelevantSample(coords + kernel[i] * kernelSize, weight, sum);
	}

	kernelSize = 2.0;
	for (int i=0; i<8; i++) {
		addRelevantSample(coords + kernel[i] * kernelSize, weight, sum);
	}

	return sum;
}

void main(void) {
	// Blending: ONE_MINUS_SRC_ALPHA, SRC_ALPHA

	vec4 solidColor = texture(src, uv);
	float reveal = texture(oitWeight, uv).a;
	vec4 transparentColor;

	// Blended order transparency
	if (render_mode == 0) {
		transparentColor = texture(oitAccum, uv);

		vec4 composite = vec4(transparentColor.rgb / max(transparentColor.a, 1e-5), reveal);
		fragColor = (1.0-composite.a) * composite +  composite.a * solidColor;
	}

	// Stochastic transparency
	else if (render_mode == 1) {
		transparentColor = avgColor(oitAccum, uv);
		fragColor = (1.0 - reveal) * transparentColor + reveal * solidColor;
	}
}
