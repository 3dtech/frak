precision highp float;

uniform sampler2D ao0;
uniform sampler2D src;

uniform mat4 projection;

uniform float zNear;
uniform float zFar;
uniform vec2 ViewportSize;

float random(vec2 co) {
    //co = mod(co, 128.0);
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec2 inverseVP = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y);
    
    gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * inverseVP).xyz * texture2D(ao0, gl_FragCoord.xy * inverseVP/* / 2.0 + 0.5*/).xyz, 1.0);
    //gl_FragColor = vec4(gl_FragCoord.xy * inverseVP, 0.0, 1.0);
    //gl_FragColor = vec4((gl_FragCoord.xy * inverseVP == texture2D(ao0, gl_FragCoord.xy * inverseVP).xy) ? 1.0 : 0.0, 0.0, 0.0, 1.0);
}