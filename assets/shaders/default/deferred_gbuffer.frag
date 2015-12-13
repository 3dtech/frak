#extension GL_EXT_draw_buffers : require

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

varying float depth;
varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;

varying mat3 tbn;

vec3 reflection() {
	vec3 eyeDirection = normalize(-viewPosition.xyz);
	vec3 worldEyeDirection = normalize(mat3(viewInverse) * eyeDirection);
	vec3 lookup = reflect(worldEyeDirection, worldNormal) * vec3(-1.0, 1.0, 1.0);
	vec4 color = textureCube(env0, lookup);
	return color.rgb;
}

void main() {
	vec4 textureColor = texture2D(diffuse0, uv0);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	vec3 N = viewNormal;
	if (useNormalmap == 1) {
		vec4 encodedNormal = texture2D(normal0, uv0);
		vec3 localCoords = vec3(2.0 * encodedNormal.rg - vec2(1.0), encodedNormal.b);
		N = normalize(tbn * localCoords);
		N = normalize(mat3(view) * N);
	}

	if (useReflection == 1) {
		vec3 refl = reflection();
		float maskValue = texture2D(mask, uv0).r;
		color.rgb = mix(refl, color.rgb, maskValue * materialBlend);
	}

	gl_FragData[0] = vec4(color.rgb, specularStrength);
	gl_FragData[1] = vec4(N, depth);
	gl_FragData[2] = vec4(worldPosition.xyz, float(specularPower)/255.0);
	gl_FragData[3] = vec4(lightContribution, receiveShadows, depth, 1.0);
}
