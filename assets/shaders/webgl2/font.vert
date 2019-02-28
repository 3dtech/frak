// Font shader
attribute vec3 position; 
attribute vec2 texcoord2d0; 

uniform mat4 modelview;
uniform mat4 projection;

varying vec4 fragPosition;
varying vec2 fragTexcoord2d0;

void main() {
	fragPosition=projection*modelview*vec4(position, 1.0); 
	fragTexcoord2d0=texcoord2d0;
	gl_Position=fragPosition;
}
