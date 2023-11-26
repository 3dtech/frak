#version 300 es

precision highp float;

#if NUM_TARGETS > 0
uniform vec4 color1;
#if NUM_TARGETS > 1
uniform vec4 color2;
#endif
#endif

in vec2 uv;

#if NUM_TARGETS > 0
layout(location = 0) out vec4 out1;
#if NUM_TARGETS > 1
layout(location = 1) out vec4 out2;
#endif
#endif

void main () {
#if NUM_TARGETS > 0
    out1 = color1;
#if NUM_TARGETS > 1
    out2 = color2;
#endif
#endif
}
