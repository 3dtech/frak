#version 300 es

precision highp float;

uniform mat4 view;
uniform mat4 viewInverse;

uniform vec4 diffuse;
uniform float specularStrength;
uniform int specularPower;
uniform float lightContribution;
uniform int useNormalmap;
uniform int useReflection;
uniform int receiveShadows;

uniform float materialBlend;

uniform sampler2D diffuse0;
uniform sampler2D normal0;
uniform samplerCube env0;
uniform sampler2D mask;

in float depth;
in vec2 uv0;
in vec4 worldPosition;
in vec3 worldNormal;
in vec4 viewPosition;
in vec3 viewNormal;

in mat3 tbn;

layout(location = 0) out vec4 gbuf_color;
layout(location = 1) out vec4 gbuf_normal;
layout(location = 2) out vec4 gbuf_position;
layout(location = 3) out vec4 gbuf_params;

vec3 reflection() {
	vec3 eyeDirection = normalize(-viewPosition.xyz);
	vec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);
	vec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);
	vec4 color = texture(env0, lookup);
	return color.rgb;
}

void main() {
	vec4 textureColor = texture(diffuse0, uv0);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	vec3 N = viewNormal;
	if (useNormalmap == 1) {
		vec4 encodedNormal = texture(normal0, uv0);
		vec3 localCoords = vec3(2.0 * encodedNormal.rg - vec2(1.0), encodedNormal.b);
		N = normalize(tbn * localCoords);
		N = normalize(mat3(view) * N);
	}

	if (useReflection == 1) {
		vec3 refl = reflection();
		float maskValue = texture(mask, uv0).r;
		color.rgb = mix(refl, color.rgb, maskValue * materialBlend);
	}

	gbuf_color = vec4(color.rgb, specularStrength);
	gbuf_normal = vec4(N, depth);
	gbuf_position = vec4(worldPosition.xyz, float(specularPower)/255.0);
	gbuf_params = vec4(lightContribution, receiveShadows, depth, 1.0);
}
