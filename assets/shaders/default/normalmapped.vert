// Normal mapped diffuse shader
attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord2d0;
attribute vec3 tangent;
attribute vec3 bitangent;

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 lightProjection;
uniform mat4 lightView;
uniform vec3 lightDirection;

varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec4 shadowPosition;

varying mat3 tbn;

const mat4 scaleMatrix = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);

highp mat3 transpose(in highp mat3 m) {
	highp vec3 i0 = m[0];
	highp vec3 i1 = m[1];
	highp vec3 i2 = m[2];
	highp mat3 outMatrix = mat3(
		vec3(i0.x, i1.x, i2.x),
		vec3(i0.y, i1.y, i2.y),
		vec3(i0.z, i1.z, i2.z)
	);
	return outMatrix;
}

void main() {
	uv0 = texcoord2d0; // TODO: In the future this will probably need to use texture offset and scale uniforms
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = normalize(mat3(modelview) * normal);

	shadowPosition = scaleMatrix * lightProjection * lightView * worldPosition;

	tbn[0] = normalize(vec3(model * vec4(tangent, 0.0)));
	tbn[1] = normalize(vec3(model * vec4(bitangent, 0.0)));
	tbn[2] = worldNormal;

	gl_Position = projection * viewPosition;
}
