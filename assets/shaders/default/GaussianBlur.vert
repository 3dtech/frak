// Shader for rendering gaussian blurred image (horizontal)
attribute vec3 position;
attribute vec2 texcoord2d0;

uniform mat4 modelview;
uniform mat4 projection;
uniform float screenWidth;
uniform float screenHeight;

varying vec2 uv0;

void main() {
	uv0 = texcoord2d0;
	
	// Resizes the rendered unit-quad to screen size
	vec4 viewPosition=modelview*vec4(position.x*screenWidth, position.y*screenHeight, position.z, 1.0);
	gl_Position=projection*viewPosition;
}
