precision highp float;

uniform sampler2D position0;

uniform mat4 projection;

uniform float zNear;
uniform float zFar;
uniform vec2 ViewportSize;

float random(vec2 co) {
    //co = mod(co, 128.0);
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 getPosition(vec2 coord) {
    vec3 pos = texture2D(position0, coord.xy).xyz;
    //pos.z *= (zFar - zNear);
    //pos *= vec3(2.0, 2.0, 1.0);
    //pos += vec3(1.0, 1.0, 0.0);
    //pos *= vec3(ViewportSize, 1.0);
    if (pos.z == 0.0)
        pos.z = 1.0;
    return pos;
}

float doAmbientOcclusion(vec2 coord, vec2 coord2, vec3 pos) {
    vec3 diff = getPosition(coord + coord2) - pos;
    float d = length(diff);
    return (diff.z < 0.0) ? 1.0 / (1.0 + abs(diff.z * (zFar - zNear))) : 0.0;
}

void main() {
    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
    
    vec2 c = gl_FragCoord.xy * inverseVP/* * 2.0 - 1.0*/;
    
    vec3 pos = getPosition(c);
    float seed = gl_FragCoord.x + gl_FragCoord.y * inverseVP.y;
    vec2 rand = vec2(random(vec2(seed, 0.0)), random(vec2(seed, 0.4)));
    rand = normalize(rand);
    
    float vecs[8];
    vecs[0] = vecs[5] = 1.0;
    vecs[1] = vecs[3] = vecs[4] = vecs[6] = 0.0;
    vecs[2] = vecs[7] = -1.0;
    
    float ao = 0.0;
    float rad = 50.0 * inverseVP.x * random(vec2(seed, -0.7)) * (1.0 - pos.z);
    const int iterations = 16;
    for (int i = 0; i < iterations; i++) {
        vec2 coord1 = reflect(vec2(vecs[int(mod(float(i), 4.0)) * 2], vecs[int(mod(float(i), 4.0)) * 2 + 1]), rand) * rad;
        vec2 coord2 = vec2(coord1.x*0.707 - coord1.y*0.707, coord1.x*0.707 + coord1.y*0.707);
        
        ao += doAmbientOcclusion(c, coord1 * 0.25, pos);
        ao += doAmbientOcclusion(c, coord2 * 0.5, pos);
        ao += doAmbientOcclusion(c, coord1 * 0.75, pos);
        ao += doAmbientOcclusion(c, coord2, pos);
    }
    ao /= float(iterations) * 4.0;
    
    //ao = 1.0 - ao;
    ao = max(0.0, ao * 2.0 - 1.0);
    ao = 1.0 - ao;
    gl_FragColor = vec4(ao, ao, ao, 1.0);
    //gl_FragColor = vec4(gl_FragCoord.xy * inverseVP, 1.0, 1.0);
    //gl_FragColor = vec4(getPosition(gl_FragCoord.xy * inverseVP), 1.0);
    //gl_FragColor = vec4(gl_FragCoord.xy * inverseVP * 2.0 - 1.0, 0.0, 1.0);
    //gl_FragColor = vec4(getNormal(gl_FragCoord.xy * inverseVP), 1.0);
    //gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * vec3(ao, ao, ao), 1.0);
}