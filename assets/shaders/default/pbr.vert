attribute vec3 position;
attribute vec3 normal;
attribute vec2 texcoord2d0;
#ifdef VERTEX_TANGENTS
attribute vec4 tangent4d;
#endif

uniform mat4 model;
uniform mat4 view;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat4 lightProjection;
uniform mat4 lightView;

varying vec2 uv0;
varying vec4 worldPosition;
varying vec3 worldNormal;
#ifdef VERTEX_TANGENTS
varying vec4 worldTangent;
#endif
varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec4 shadowPosition;

void main() {
	uv0 = texcoord2d0;
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(modelview) * normal;
#ifdef VERTEX_TANGENTS
	worldTangent = vec4(normalize(mat3(model) * tangent4d.xyz), tangent4d.w);
#endif

	shadowPosition = lightProjection * lightView * worldPosition;

	gl_Position = projection * viewPosition;
}
