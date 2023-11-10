#version 300 es

precision highp float;

uniform Camera {
    mat4 modelview;
    mat4 projection;
    mat4 projectionInverse;
    mat4 view;
    mat4 viewInverse;
    float zNear;
    float zFar;
    vec3 cameraPosition;
};

uniform vec4 diffuse;

#ifdef DIFFUSE_TEXTURE
uniform sampler2D diffuse0;

#ifdef DIFFUSE_UV_TRANSFORM
uniform mat3 diffuseUVTransform;
#endif
#endif

in vec2 uv0;

out vec4 fragColor;

vec2 diffuseUV() {
    vec3 uv = vec3(uv0, 1.0);

#ifdef DIFFUSE_UV_TRANSFORM
	uv = diffuseUVTransform * uv;
#endif

	return uv.xy;
}

void main(void) {
    vec4 outputColor = diffuse;
#ifdef DIFFUSE_TEXTURE
	outputColor *= texture(diffuse0, diffuseUV());
#endif

    // blend func: GL_ZERO, GL_ONE_MINUS_SRC_ALPHA
    fragColor = vec4(outputColor.a);
}
