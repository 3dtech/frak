#version 300 es

in vec3 position;
in vec3 normal;
in vec2 texcoord2d0;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;

out vec4 screenPosition;

void main() {
	screenPosition = projection * view * model * vec4(position, 1.0);
	gl_Position = screenPosition;
}
