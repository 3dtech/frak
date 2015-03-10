/**
 * Shadow blur - horizontal
 */

attribute vec3 position;
attribute vec2 uv0;

uniform sampler2D src;

varying vec2 uv;
varying vec2 blurCoords[14];

void main() {
	float blurSize = 0.4;
	blurCoords[ 0] = uv0 + vec2(-0.028, 0.0) * blurSize;
	blurCoords[ 1] = uv0 + vec2(-0.024, 0.0) * blurSize;
	blurCoords[ 2] = uv0 + vec2(-0.020, 0.0) * blurSize;
	blurCoords[ 3] = uv0 + vec2(-0.016, 0.0) * blurSize;
	blurCoords[ 4] = uv0 + vec2(-0.012, 0.0) * blurSize;
	blurCoords[ 5] = uv0 + vec2(-0.008, 0.0) * blurSize;
	blurCoords[ 6] = uv0 + vec2(-0.004, 0.0) * blurSize;
	blurCoords[ 7] = uv0 + vec2( 0.004, 0.0) * blurSize;
	blurCoords[ 8] = uv0 + vec2( 0.008, 0.0) * blurSize;
	blurCoords[ 9] = uv0 + vec2( 0.012, 0.0) * blurSize;
	blurCoords[10] = uv0 + vec2( 0.016, 0.0) * blurSize;
	blurCoords[11] = uv0 + vec2( 0.020, 0.0) * blurSize;
	blurCoords[12] = uv0 + vec2( 0.024, 0.0) * blurSize;
	blurCoords[13] = uv0 + vec2( 0.028, 0.0) * blurSize;
	uv = uv0;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
