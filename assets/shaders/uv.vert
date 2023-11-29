#version 300 es

uniform Camera {
    mat4 projection;
    mat4 projectionInverse;
    mat4 view;
    mat4 viewInverse;
    float zNear;
    float zFar;
    vec3 cameraPosition;
};

layout(location = 0) in vec3 position;
layout(location = 2) in vec2 texcoord2d0;

out vec2 uv;
out vec3 uvw;

void main() {
    vec3 unprojected = (projectionInverse * vec4(position, 1.0)).xyz;

    uvw = mat3(viewInverse) * unprojected;
    uvw.xyz *= -1.0;
	uv = texcoord2d0;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
