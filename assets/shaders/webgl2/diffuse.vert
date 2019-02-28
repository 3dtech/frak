#version 300 es

in vec3 position;
in vec3 normal;
in vec2 texcoord2d0;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 lightProjection;
uniform mat4 lightView;

out vec2 uv0;
out vec4 worldPosition;
out vec3 worldNormal;
out vec4 viewPosition;
out vec3 viewNormal;
out vec4 shadowPosition;

void main() {
	uv0 = texcoord2d0;
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(modelview) * normal;

	shadowPosition = lightProjection * lightView * worldPosition;

	gl_Position = projection * viewPosition;
}
