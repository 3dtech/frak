#version 300 es

precision highp float;

uniform vec4 color1;
uniform vec4 color2;

in vec2 uv;
layout(location = 0) out vec4 out1;
#if NUM_TARGETS == 2
layout(location = 1) out vec4 out2;
#endif

void main () {
    out1 = color1;
#if NUM_TARGETS == 2
    out2 = color2;
#endif
}
