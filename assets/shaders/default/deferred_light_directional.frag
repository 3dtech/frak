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

varying vec2 uv;

const mat4 scaleAndBias = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);

float shadowmap(vec4 worldPosition) {
	vec4 shadowPosition = scaleAndBias * lightProjection * lightView * worldPosition;
	vec3 shadowCoord = shadowPosition.xyz / shadowPosition.w;
	vec4 shadowTexel = texture2D(shadow0, shadowCoord.xy);
	return step(shadowCoord.z*shadowBias, shadowTexel.r);
}

void main () {
	vec4 data2 = texture2D(gb2, uv); // position, specularPower/255
	vec4 P = vec4(data2.xyz, 1.0);

	float shadow = 1.0;

	if (useShadows == 1) {
		if (useSoftShadows == 1)
			shadow = texture2D(shadow0, uv).r;
		else
			shadow = shadowmap(P);
	}

	if (shadowOnly == 1) {
		gl_FragColor = vec4(shadow, shadow, shadow, 1.0);
		return;
	}

	vec4 data0 = texture2D(gb0, uv); // color, specularIntensity
	vec4 data1 = texture2D(gb1, uv); // normal, depth

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

	vec3 final = shadow * (diffuseColor + specularColor);
	gl_FragColor = vec4(final, 1.0);
}
