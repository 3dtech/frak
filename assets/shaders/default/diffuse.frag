// Diffuse shader
precision highp float;

uniform mat4 modelview;
uniform mat4 view;

uniform vec4 ambient;
uniform vec4 diffuse;
uniform float specularStrength;
uniform int specularPower;

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform float lightIntensity;
uniform float shadowIntensity;

uniform sampler2D diffuse0;
uniform sampler2D shadow0;

uniform int useShadows;
uniform int receiveShadows;

varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec4 shadowPosition;

#define MAXIMUM_HARDNESS 256

float unpack(vec4 c) {
	const vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);
	return dot(c, bitShifts);
}

float unpackHalf(vec2 c) {
	return c.x + (c.y / 255.0);
}

float pow(float v, int n) {
	for (int i = 1; i < MAXIMUM_HARDNESS; i++) {
		if (i >= n)
			break;
		v *= v;
	}
	return v;
}

/** Computes color and directional lighting */
vec4 lighting() {
	vec4 textureColor = texture2D(diffuse0, uv0);
	vec3 N = normalize(viewNormal);
	vec3 L = normalize(mat3(view)*lightDirection);
	vec3 V = normalize(-viewPosition.xyz);
	vec3 H = normalize(L + V);
	float diffuseLight = max(dot(N, L), 0.0) * lightIntensity;
	float specularLight = min(max(dot(N, H), 0.0), 1.0);
	specularLight = pow(specularLight, specularPower);

	vec4 ambientColor = ambient * textureColor;
	vec4 diffuseColor = diffuse * diffuse * textureColor * lightColor * diffuseLight;
	vec4 specularColor = lightColor * specularLight * specularStrength;

	return ambientColor + diffuseColor + specularColor;
}

float ChebychevInequality(vec2 moments, float t) {
	if ( t <= moments.x )
		return 1.0;
	float variance = moments.y - (moments.x * moments.x);
	variance = max(variance, 0.02);
	float d = (t - moments.x); // * shadowIntensity;
	return variance / (variance + d * d);
	// return variance / (variance + pow(d*d, 0.7));
}

float VsmFixLightBleed(float pMax, float amount) {
	return clamp((pMax - amount) / (1.0 - amount), 0.0, 1.0);
}

void main(void) {
	vec4 color = lighting();
	if (useShadows == 0 || receiveShadows == 0) {
		gl_FragColor = color;
		return;
	}

	vec3 depth = shadowPosition.xyz / shadowPosition.w;
	float shadow = 1.0;
	vec4 texel = texture2D(shadow0, depth.xy);

	// VSM
	vec2 moments = vec2(unpackHalf(texel.xy), unpackHalf(texel.zw));
	shadow = ChebychevInequality(moments, depth.z);
	shadow = VsmFixLightBleed(shadow, 0.1);

	// extra esm step to lessen the gradient near close surfaces
	shadow = (clamp(exp(-4.0 * (depth.z - unpackHalf(texel.xy))), 0.0, 1.0) + shadow) / 2.0;

	// // ESM
	// float c = 4.0;
	// shadow = clamp(exp(-c * (depth.z - unpack(texel))), 0.0, 1.0);

	gl_FragColor = clamp(vec4(color.xyz*shadow, color.a), 0.0, 1.0);
}
