#version 300 es

/** Order independent transparency - vertex program */

in vec3 position;
in vec3 normal;
in vec2 texcoord2d0;

uniform mat4 modelview;
uniform mat4 projection;

out vec3 fragNormal;
out vec4 fragPosition;
out vec2 fragTexcoord2d0;

void main() {
	fragNormal = mat3(modelview) * normal;
	fragPosition = modelview * vec4(position, 1.0);
	fragTexcoord2d0 = texcoord2d0;
	gl_Position = projection * fragPosition;
}
