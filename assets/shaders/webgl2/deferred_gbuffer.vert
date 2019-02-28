#version 300 es

in vec3 position;
in vec3 normal;
in vec2 texcoord2d0;
in vec3 tangent;
in vec3 bitangent;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform float zNear;
uniform float zFar;

out float depth;
out vec2 uv0;
out vec4 worldPosition;
out vec3 worldNormal;
out vec4 viewPosition;
out vec3 viewNormal;

out mat3 tbn;

void main() {
	uv0 = texcoord2d0;
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(modelview) * normal;
	depth = (-viewPosition.z - zNear) / (zFar - zNear);

	tbn[0] = normalize(vec3(model * vec4(tangent, 0.0)));
	tbn[1] = normalize(vec3(model * vec4(bitangent, 0.0)));
	tbn[2] = worldNormal;

	gl_Position = projection * viewPosition;
}
