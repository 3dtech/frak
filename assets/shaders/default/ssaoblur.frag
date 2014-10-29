precision highp float;

uniform sampler2D ao0;
uniform sampler2D src;

uniform mat4 projection;

uniform float zNear;
uniform float zFar;
uniform vec2 ViewportSize;

uniform int ssaoBlurSize;
uniform int ssaoOnly;

float random(vec2 co) {
    //co = mod(co, 128.0);
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
    
    const int MAXIMUM_BLUR = 32;
    float result = 0.0;
    vec2 hlim = vec2(float(-ssaoBlurSize) * 0.5 + 0.5);
    for (int i = 0; i < MAXIMUM_BLUR; i++) {
        if (i >= ssaoBlurSize)
            break;
        for (int j = 0; j < MAXIMUM_BLUR; j++) {
            if (j >= ssaoBlurSize)
                break;
            vec2 offset = (hlim + vec2(float(i), float(j))) * inverseVP;
            result += texture2D(ao0, gl_FragCoord.xy * inverseVP + offset).r;
        }
    }
    result = result / float(ssaoBlurSize * ssaoBlurSize);

    if (ssaoOnly == 1) {
        gl_FragColor = vec4(vec3(result), 1.0);
    }
    else {
        gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * result, 1.0);
    }
    //gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * texture2D(ao0, gl_FragCoord.xy * inverseVP/* / 2.0 + 0.5*/).xyz, 1.0);
}