// Test pass-through shader that doesn't transform vertex
attribute vec3 position; 
attribute vec3 normal; 

uniform mat4 modelview;
uniform mat4 projection;

varying vec3 fragNormal;
varying vec4 fragPosition;

void main(void) { 
	fragNormal=mat3(modelview)*normal;
	fragPosition=projection*modelview*vec4(position, 1.0);
	gl_Position = fragPosition; 
}
