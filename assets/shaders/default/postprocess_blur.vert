/**
 * Blur post-process
 * http://www.sunsetlakesoftware.com/2013/10/21/optimizing-gaussian-blurs-mobile-gpu
 */

attribute vec3 position;
attribute vec2 uv0;

uniform vec2 ViewportSize;
uniform vec2 BlurSize;

varying vec2 blurCoords[5];

void main() {
	vec2 offset = vec2(1.0 / ViewportSize.x, 1.0 / ViewportSize.y) * BlurSize;

	blurCoords[0] = uv0;
	blurCoords[1] = uv0 + offset * 1.407333;
	blurCoords[2] = uv0 - offset * 1.407333;
	blurCoords[3] = uv0 + offset * 3.294215;
	blurCoords[4] = uv0 - offset * 3.294215;

	gl_Position = vec4(position.xy, 0.0, 1.0);
}
