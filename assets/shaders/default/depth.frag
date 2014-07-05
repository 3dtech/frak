// Fallback shader
precision mediump float; 

uniform vec4 color;
uniform float nearDistance;
uniform float farDistance;

varying vec4 fragPosition;

void main(void) { 
	float d=farDistance-nearDistance;
	float z=(fragPosition.z-nearDistance)/d;
	gl_FragColor = vec4(z, z, z, 1.0);
}