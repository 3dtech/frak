attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord2d0;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform float zNear;
uniform float zFar;

varying float depth;
varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;

void main() {
	uv0 = texcoord2d0;
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(modelview) * normal;
	depth = (-viewPosition.z - zNear) / (zFar - zNear);

	gl_Position = projection * viewPosition;
}
