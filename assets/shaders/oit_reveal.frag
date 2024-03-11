#version 300 es

precision highp float;

in vec2 uv0;

#include "snippets/pbr.glsl"

out vec4 fragColor;

void main(void) {
    // blend func: GL_ZERO, GL_ONE_MINUS_SRC_ALPHA
    fragColor = vec4(diffuseValue().a);
}
