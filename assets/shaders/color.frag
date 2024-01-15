#version 300 es

precision highp float;

uniform vec4 color1;
#ifdef NUM_TARGETS
#if NUM_TARGETS > 1
uniform vec4 color2;
#endif
#endif

in vec2 uv;

layout(location = 0) out vec4 out1;
#ifdef NUM_TARGETS
#if NUM_TARGETS > 1
layout(location = 1) out vec4 out2;
#endif
#endif

void main () {
    out1 = color1;
#ifdef NUM_TARGETS
#if NUM_TARGETS > 1
    out2 = color2;
#endif
#endif
}
