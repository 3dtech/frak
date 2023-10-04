#version 300 es

precision highp float;

uniform samplerCube diffuse0;

in vec3 uvw;

out vec4 fragColor;

void main() {
    fragColor = texture(diffuse0, uvw);
    //fragColor = vec4(uvw, 1.0);
}
