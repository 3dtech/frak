#version 300 es

// Debug shader
in vec3 position;

uniform mat4 modelview;
uniform mat4 projection;

out vec4 fragPosition;

void main() {
	fragPosition = projection * modelview * vec4(position, 1.0);
	gl_Position = fragPosition;
}
