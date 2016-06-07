// Shader for rendering linear depth values into RGBA texture
attribute vec3 position;

uniform mat4 modelview;
uniform mat4 projection;

varying vec4 viewPosition;

void main() {
	viewPosition=modelview*vec4(position, 1.0);
	gl_Position=projection*viewPosition;
}
