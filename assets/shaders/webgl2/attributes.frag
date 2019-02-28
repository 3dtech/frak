#version 300 es

// Attributes shader
precision mediump float;

uniform float texCoord2d0Multiplier;		// Texture coordinates output multiplier between 0 and 1
uniform float texCoord2d1Multiplier;		// Texture coordinates output multiplier between 0 and 1
uniform float texCoord2d2Multiplier;		// Texture coordinates output multiplier between 0 and 1
uniform float texCoord2d3Multiplier;		// Texture coordinates output multiplier between 0 and 1
uniform float positionMultiplier;				// Position output multiplier between 0 and 1
uniform float tangentMultiplier;				// Tangent output multiplier between 0 and 1
uniform float bitangentMultiplier;			// BiTangent output multiplier between 0 and 1
uniform float normalMultiplier;					// Normal output multiplier between 0 and 1
uniform float barycentricMultiplier;		// Barycentric output multiplier between 0 and 1

in vec2 fragTexcoord2d0;
in vec2 fragTexcoord2d1;
in vec2 fragTexcoord2d2;
in vec2 fragTexcoord2d3;
in vec4 fragPosition;
in vec4 fragTangent;
in vec4 fragBitangent;
in vec4 fragNormal;
in vec3 fragBarycentric;

out vec4 fragColor;

void main(void) {
	fragColor =
		vec4(fragTexcoord2d0, 0.0, 1.0) * texCoord2d0Multiplier +
		vec4(fragTexcoord2d1, 0.0, 1.0) * texCoord2d1Multiplier +
		vec4(fragTexcoord2d2, 0.0, 1.0) * texCoord2d2Multiplier +
		vec4(fragTexcoord2d3, 0.0, 1.0) * texCoord2d3Multiplier +
		vec4(fragPosition.rgb, 1.0) * positionMultiplier +
		vec4(fragTangent.rgb, 1.0) * tangentMultiplier +
		vec4(fragBitangent.rgb, 1.0) * bitangentMultiplier +
		vec4(fragNormal.rgb, 1.0) * normalMultiplier +
		vec4(fragBarycentric, 1.0) * barycentricMultiplier;
}
