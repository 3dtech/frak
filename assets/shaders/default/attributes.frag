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

varying vec2 fragTexcoord2d0;
varying vec2 fragTexcoord2d1;
varying vec2 fragTexcoord2d2;
varying vec2 fragTexcoord2d3;
varying vec4 fragPosition;
varying vec4 fragTangent;
varying vec4 fragBitangent;
varying vec4 fragNormal;
varying vec3 fragBarycentric;

void main(void) {
	gl_FragColor = 
		vec4(fragTexcoord2d0, 0.0, 1.0)*texCoord2d0Multiplier+
		vec4(fragTexcoord2d1, 0.0, 1.0)*texCoord2d1Multiplier+
		vec4(fragTexcoord2d2, 0.0, 1.0)*texCoord2d2Multiplier+
		vec4(fragTexcoord2d3, 0.0, 1.0)*texCoord2d3Multiplier+
		vec4(fragPosition.rgb, 1.0)*positionMultiplier+
		vec4(fragTangent.rgb, 1.0)*tangentMultiplier+
		vec4(fragBitangent.rgb, 1.0)*bitangentMultiplier+
		vec4(fragNormal.rgb, 1.0)*normalMultiplier+
		vec4(fragBarycentric, 1.0)*barycentricMultiplier;
}