#version 300 es
/** Directional light shadow-map */
in vec3 position;
in vec2 texcoord2d0;

uniform mat4 modelview;
uniform mat4 projection;

out float depth;
out vec2 uv;

void main() {
	vec4 viewPosition = modelview * vec4(position, 1.0);
	vec4 clipPosition = projection * viewPosition;
	depth = clipPosition.z;
	uv = texcoord2d0;
	gl_Position = clipPosition;
}
