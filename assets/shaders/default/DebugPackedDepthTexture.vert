// DebugPackedDepthTexture
attribute vec3 position; 
attribute vec3 normal; 
attribute vec2 texcoord2d0; 

uniform mat4 modelview;
uniform mat4 projection;

varying vec4 viewPosition;
varying vec3 viewNormal;
varying vec2 uv0;

void main() {
	uv0=texcoord2d0;
	viewPosition = modelview * vec4(position, 1.0);
	viewNormal = normalize(mat3(modelview)*normal);
	gl_Position = projection * viewPosition;
}
