// Diffuse shader
attribute vec3 position; 
attribute vec3 barycentric; 

uniform mat4 modelview;
uniform mat4 projection;

varying vec3 fragBarycentric;

void main(void) { 
	gl_Position=projection*modelview*vec4(position, 1.0); 
	fragBarycentric = barycentric;
}