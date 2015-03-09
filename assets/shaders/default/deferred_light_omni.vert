attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord2d0;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;

varying vec4 screenPosition;

void main() {
	screenPosition = projection * view * model * vec4(position, 1.0);
	gl_Position = screenPosition;
}
