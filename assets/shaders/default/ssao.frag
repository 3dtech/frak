precision highp float;

uniform sampler2D position0;

uniform mat4 projection;

uniform float zNear;
uniform float zFar;
uniform vec2 ViewportSize;

uniform float ssaoGDisplace;
uniform float ssaoRadius;
uniform float ssaoDivider;

#define DL 2.399963229728653
#define EULER 2.718281828459045

float unpack(vec4 c) {
    const vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);
    return dot(c, bitShifts);
}

float getDepth(vec2 coord) {
    float d = unpack(texture2D(position0, coord.xy));
    if (d == 0.0)
        d = 1.0;
    return d;
}

float doAmbientOcclusion(vec2 coord, vec2 coord2, float d) {
    float diff = getDepth(coord + coord2) - d;
    float gDisplace = -0.0002 - (0.00002 * max(min(ssaoGDisplace, 10.0), 0.0));
    //float gDisplace = -0.00032;
    return (diff < gDisplace) ? pow(EULER, -2.0 * (diff - gDisplace) * (diff - gDisplace) * 10000.0 / 0.16) : 0.0;
}

void main() {
    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
    
    vec2 c = gl_FragCoord.xy * inverseVP;
    
    float ao = 0.0;

    float dz = 1.0 / 8.0;
    float z = 1.0 - dz / 2.0;
    float l = 0.0;

    float depth = getDepth(c);

    for (int i = 0; i <= 8; i++) {
        float r = sqrt(1.0 - z);

        vec2 p = vec2(cos(l) * r, sin(l) * r);
        ao += doAmbientOcclusion(c, p * ssaoRadius * inverseVP.x * (1.0 - depth), depth);
        z = z - dz;
        l = l + DL;
    }

    ao /= 8.0 + max(min(ssaoDivider, 1.0), -1.0);
    //ao /= 8.5;
    
    ao = max(0.0, ao * 2.0 - 1.0);
    ao = 1.0 - ao;
    gl_FragColor = vec4(ao, ao, ao, 1.0);
    //gl_FragColor = vec4(depth, depth, depth, 1.0);
    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}