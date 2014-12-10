// Diffuse shader
attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord2d0;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 lightProjection;
uniform mat4 lightView;

varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec4 shadowPosition;

const mat4 scaleMatrix = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);

void main() {
	uv0 = texcoord2d0; // TODO: In the future this will probably need to use texture offset and scale uniforms
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(modelview) * normal;

	shadowPosition = scaleMatrix * lightProjection * lightView * worldPosition;

	gl_Position = projection * viewPosition;
}
