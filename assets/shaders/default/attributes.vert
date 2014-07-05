// Attributes shader
attribute vec3 position; 
attribute vec3 tangent; 
attribute vec3 bitangent; 
attribute vec3 normal; 
attribute vec3 barycentric; 
attribute vec2 texcoord2d0; 
attribute vec2 texcoord2d1;
attribute vec2 texcoord2d2; 
attribute vec2 texcoord2d3; 

uniform mat4 modelview;
uniform mat4 projection;

varying vec2 fragTexcoord2d0;
varying vec2 fragTexcoord2d1;
varying vec2 fragTexcoord2d2;
varying vec2 fragTexcoord2d3;
varying vec4 fragPosition;
varying vec4 fragTangent;
varying vec4 fragBitangent;
varying vec4 fragNormal;
varying vec3 fragBarycentric;

void main() {
	fragNormal=projection*modelview*vec4(normal, 1.0); 
	fragPosition=projection*modelview*vec4(position, 1.0); 
	fragTangent=projection*modelview*vec4(tangent, 1.0); 
	fragBitangent=projection*modelview*vec4(bitangent, 1.0); 
  fragTexcoord2d0=texcoord2d0;
  fragTexcoord2d1=texcoord2d1;
  fragTexcoord2d2=texcoord2d2;
  fragTexcoord2d3=texcoord2d3;
  fragBarycentric=barycentric;
	gl_Position=fragPosition;
}
