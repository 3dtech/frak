#version 300 es

// Attributes shader
in vec3 position;
in vec3 tangent;
in vec3 bitangent;
in vec3 normal;
in vec3 barycentric;
in vec2 texcoord2d0;
in vec2 texcoord2d1;
in vec2 texcoord2d2;
in vec2 texcoord2d3;

uniform mat4 modelview;
uniform mat4 projection;

out vec2 fragTexcoord2d0;
out vec2 fragTexcoord2d1;
out vec2 fragTexcoord2d2;
out vec2 fragTexcoord2d3;
out vec4 fragPosition;
out vec4 fragTangent;
out vec4 fragBitangent;
out vec4 fragNormal;
out vec3 fragBarycentric;

void main() {
	fragNormal = projection * modelview * vec4(normal, 1.0);
	fragPosition = projection * modelview * vec4(position, 1.0);
	fragTangent = projection * modelview * vec4(tangent, 1.0);
	fragBitangent = projection * modelview * vec4(bitangent, 1.0);
	fragTexcoord2d0 = texcoord2d0;
	fragTexcoord2d1 = texcoord2d1;
	fragTexcoord2d2 = texcoord2d2;
	fragTexcoord2d3 = texcoord2d3;
	fragBarycentric = barycentric;
	gl_Position = fragPosition;
}
