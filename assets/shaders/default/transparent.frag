// Unlit transparency shader
precision mediump float; 

uniform vec4 diffuse;

uniform sampler2D diffuse0;

varying vec3 fragNormal;
varying vec4 fragPosition;
varying vec2 fragTexcoord2d0;

void main(void) {
	gl_FragColor = diffuse*texture2D(diffuse0, fragTexcoord2d0);
}