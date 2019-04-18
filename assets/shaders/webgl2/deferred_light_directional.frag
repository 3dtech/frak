#version 300 es

precision highp float;

uniform sampler2D gb0;
uniform sampler2D gb1;
uniform sampler2D gb2;
uniform sampler2D gb3;
uniform sampler2D shadow0;

uniform vec3 cameraPosition;
uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;

uniform mat4 view;
uniform mat4 lightView;
uniform mat4 lightProjection;
uniform float shadowBias;

uniform int useShadows;
uniform int useSoftShadows;
uniform int shadowOnly;

in vec2 uv;
out vec4 fragColor;

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
	vec4 shadowTexel = texture(shadow0, shadowUV);

	return VSM(shadowTexel.xy, shadowPosition.z);
	// return step(shadowPosition.z - shadowBias, shadowTexel.r);
}

void main () {
	vec4 data2 = texture(gb2, uv); // position, specularPower/255
	vec4 data3 = texture(gb3, uv); // material parameters: (lightContribution, receiveShadows, reflectivity, unused)
	vec4 P = vec4(data2.xyz, 1.0);

	float shadow = 1.0;

	if (useShadows == 1 && data3.g > 0.0) {
		if (useSoftShadows == 1)
			shadow = texture(shadow0, uv).r;
		else
			shadow = shadowmap(P);
	}

	if (shadowOnly == 1) {
		fragColor = vec4(shadow, shadow, shadow, 1.0);
		return;
	}

	vec4 data0 = texture(gb0, uv); // color, specularIntensity

	vec4 data1 = texture(gb1, uv); // normal, depth

	vec3 C = data0.xyz;
	vec3 N = data1.xyz;
	float specularIntensity = data0.w;
	float specularPower = 255.0*data2.w;

	vec4 viewPosition = view * P;
	vec3 L = normalize(mat3(view) * lightDirection);
	vec3 V = normalize(-viewPosition.xyz);
	vec3 H = normalize(L + V);
	float diffuseLight = max(dot(N, L), 0.0);
	float specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower));
	vec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity;
	vec3 specularColor = lightColor.rgb * specularLight * specularIntensity;

	vec3 lighting = diffuseColor + specularColor;

	vec3 final = shadow * mix(C, lighting, data3.r);

	fragColor = vec4(final, 1.0);
}
