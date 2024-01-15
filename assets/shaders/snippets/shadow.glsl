uniform sampler2D shadow0;

float linstep(float low, float high, float v) {
	return clamp((v-low)/(high-low), 0.0, 1.0);
}

float VSM(vec2 moments, float compare) {
	float p = smoothstep(compare - shadowBias, compare, moments.x);
	float variance = max(moments.y - moments.x*moments.x, -0.001);
	float d = compare - moments.x;
	float p_max = linstep(0.2, 1.0, variance / (variance + d*d));
	return clamp(max(p, p_max), 0.0, 1.0);
}

float shadowmap(vec4 worldPosition) {
	vec4 shadowPosition = lightProjection * lightView * worldPosition;
	vec2 shadowUV = shadowPosition.xy / shadowPosition.w;
	shadowUV = shadowUV * 0.5 + 0.5;
	vec4 shadowTexel = texture(shadow0, shadowUV) * 2.0 - 1.0;

	return VSM(shadowTexel.xy, shadowPosition.z);
}
