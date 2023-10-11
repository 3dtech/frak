#version 300 es

in vec3 position;
in vec3 normal;
in vec2 texcoord2d0;
#ifdef VERTEX_TANGENTS
in vec4 tangent4d;
#endif

uniform mat4 model;

uniform Camera_block_0 {
    mat4 modelview;
    mat4 projection;
    mat4 view;
    mat4 viewInverse;
    float zNear;
    float zFar;
    vec3 cameraPosition;
};

out vec2 uv0;
out vec4 worldPosition;
out vec3 worldNormal;
#ifdef VERTEX_TANGENTS
out vec4 worldTangent;
#endif
out vec4 viewPosition;
out vec3 viewNormal;

void main() {
	uv0 = texcoord2d0;
	worldPosition = model * vec4(position, 1.0);
	worldNormal = normalize(mat3(model) * normal);
	viewPosition = view * worldPosition;
	viewNormal = mat3(modelview) * normal;
#ifdef VERTEX_TANGENTS
	worldTangent = vec4(normalize(mat3(model) * tangent4d.xyz), tangent4d.w);
#endif

	gl_Position = projection * viewPosition;
}
