#version 300 es

// Shader for rendering linear depth values into a floating point texture
in vec3 position;
in vec2 texcoord2d0;

uniform mat4 modelview;
uniform mat4 projection;
uniform float zNear;
uniform float zFar;

out float depth;
out vec2 uv;

void main() {
	vec4 viewPosition = modelview * vec4(position, 1.0);
	depth = (-viewPosition.z - zNear) / (zFar - zNear);
	uv = texcoord2d0;
	gl_Position = projection * viewPosition;
}
