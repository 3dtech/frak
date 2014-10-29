precision highp float;

uniform sampler2D position0;

uniform mat4 projection;

uniform float zNear;
uniform float zFar;
uniform vec2 ViewportSize;

float unpack(vec4 c) {
    const vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0);
    return dot(c, bitShifts);
}

float random(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float getDepth(vec2 coord) {
    float d = unpack(texture2D(position0, coord.xy));
    if (d == 0.0)
        d = 1.0;
    return d;
}

float doAmbientOcclusion(vec2 coord, vec2 coord2, float d) {
    float diff = getDepth(coord + coord2) - d;
    return (diff < 0.0) ? 1.0 / (1.0 + abs(diff * 100.0)) : 0.0;
}

void main() {
    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
    
    vec2 c = gl_FragCoord.xy * inverseVP;
    
    float depth = getDepth(c);
    
    float vecs[8];
    vecs[0] = vecs[5] = 1.0;
    vecs[1] = vecs[3] = vecs[4] = vecs[6] = 0.0;
    vecs[2] = vecs[7] = -1.0;

    float seed = gl_FragCoord.x + gl_FragCoord.y * inverseVP.y;

    float ao = 0.0;
    for (int j = 0; j < 4; j++) {
        vec2 rand = vec2(random(vec2(seed, 0.0 + float(j))), random(vec2(seed, 0.4 + float(j))));
        rand = normalize(rand);
        
        float rad = 15.0 * inverseVP.x * (1.0 - depth);
        for (int i = 0; i < 4; i++) {
            vec2 coord1 = reflect(vec2(vecs[int(mod(float(i), 4.0)) * 2], vecs[int(mod(float(i), 4.0)) * 2 + 1]), rand) * rad;
            vec2 coord2 = vec2(coord1.x*0.707 - coord1.y*0.707, coord1.x*0.707 + coord1.y*0.707);
            
            ao += doAmbientOcclusion(c, coord1 * 0.25, depth);
            ao += doAmbientOcclusion(c, coord2 * 0.5, depth);
            ao += doAmbientOcclusion(c, coord1 * 0.75, depth);
            ao += doAmbientOcclusion(c, coord2, depth);
        }
    }
    ao /= 64.0;
    
    ao = max(0.0, ao * 2.0 - 1.0);
    ao = 1.0 - ao;
    gl_FragColor = vec4(ao, ao, ao, 1.0);
}