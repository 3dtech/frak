#version 300 es

in vec3 position;
in vec3 normal;
in vec2 texcoord2d0;

uniform mat4 modelview;
uniform mat4 projection;

out vec4 viewPosition;
out vec3 viewNormal;
out vec2 uv0;

void main() {
	uv0 = texcoord2d0;
	viewPosition = modelview * vec4(position, 1.0);
	viewNormal = normalize(mat3(modelview)*normal);
	gl_Position = projection * viewPosition;
}
