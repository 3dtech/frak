#extension GL_EXT_draw_buffers : require

precision highp float;

uniform vec4 diffuse;
uniform float specularStrength;
uniform int specularPower;
uniform int useNormalmap;

uniform sampler2D diffuse0;
uniform sampler2D normal0;

varying float depth;
varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;

varying mat3 tbn;

void main() {
	vec4 textureColor = texture2D(diffuse0, uv0);
	vec4 color = diffuse * textureColor;
	if (color.a < 0.99)
		discard;

	vec3 N = worldNormal;
	if (useNormalmap>0) {
		vec4 encodedNormal = texture2D(normal0, uv0);
		vec3 localCoords = vec3(2.0 * encodedNormal.rg - vec2(1.0), encodedNormal.b);
		N = normalize(tbn * localCoords);
	}

	gl_FragData[0] = vec4(color.rgb, specularStrength);
	gl_FragData[1] = vec4(N, depth);
	gl_FragData[2] = vec4(worldPosition.xyz, float(specularPower)/255.0);
	gl_FragData[3] = vec4(depth, depth, depth, 1.0); // unused 4
}
