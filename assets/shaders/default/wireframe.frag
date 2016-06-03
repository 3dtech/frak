// Test fragment shader drawing in blue 
precision mediump float; 

varying vec3 fragBarycentric;

void main(void) { 
		gl_FragColor = vec4(0.0, 0.0, 0.0, 
			pow(1.0-fragBarycentric.r, 32.0)+pow(1.0-fragBarycentric.g, 32.0)+pow(1.0-fragBarycentric.b, 32.0));
}