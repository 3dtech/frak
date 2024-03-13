uniform sampler2D shadow0;

float VSM(vec2 moments, float compare) {
	if (compare <= moments.x) return 1.0;
	float variance = moments.y - moments.x * moments.x;
	variance = max(variance, 0.000002);
	float d = compare - moments.x;
	float p_max = variance / (variance + d * d);
	return smoothstep(0.2, 1.0, p_max);
}

float shadowmap(vec4 worldPosition, float bias) {
	vec4 shadowPosition = lightProjection * lightView * worldPosition;
	vec2 shadowUV = shadowPosition.xy / shadowPosition.w;
	shadowUV = shadowUV * 0.5 + 0.5;
	vec4 shadowTexel = texture(shadow0, shadowUV) * 2.0 - 1.0;

	return VSM(shadowTexel.xy, shadowPosition.z - bias);
}
