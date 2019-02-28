#version 300 es

// Shader for rendering linear depth values into RGBA texture
in vec3 position;

uniform mat4 modelview;
uniform mat4 projection;

out vec4 viewPosition;

void main() {
	viewPosition = modelview * vec4(position, 1.0);
	gl_Position = projection * viewPosition;
}
