#version 300 es

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 texcoord2d0;

#ifdef VERTEX_TANGENTS
layout(location = 3) in vec4 tangent4d;
#endif

#ifdef VERTEX_COLORS
layout(location = 5) in vec4 color;
#endif

uniform mat4 model;

#include "snippets/camera.glsl"

out vec2 uv0;
out vec4 worldPosition;
out vec3 worldNormal;

#ifdef VERTEX_TANGENTS
out vec4 worldTangent;
#endif

#ifdef VERTEX_COLORS
out vec4 vertexColor;
#endif

out vec4 viewPosition;
out vec3 viewNormal;

#ifdef DEPTH
out float depth;
#endif

void main() {
	uv0 = texcoord2d0;
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(view) * worldNormal;

#ifdef VERTEX_TANGENTS
	worldTangent = vec4(normalize(mat3(model) * tangent4d.xyz), tangent4d.w);
#endif

#ifdef VERTEX_COLORS
	vertexColor = color;
#endif

	vec4 projectionPosition = projection * viewPosition;
#ifdef DEPTH
	depth = projectionPosition.z / projectionPosition.w;
#endif

	gl_Position = projectionPosition;
}
