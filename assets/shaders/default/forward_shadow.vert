/** Directional light shadow-map */
attribute vec3 position;
attribute vec2 texcoord2d0;

uniform mat4 modelview;
uniform mat4 projection;

varying float depth;
varying vec2 uv;

void main() {
	vec4 viewPosition = modelview * vec4(position, 1.0);
	vec4 clipPosition = projection * viewPosition;
	depth = clipPosition.z;
	uv = texcoord2d0;
	gl_Position = clipPosition;
}
