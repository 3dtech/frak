#version 300 es

/**
 * Blur post-process
 * http://www.sunsetlakesoftware.com/2013/10/21/optimizing-gaussian-blurs-mobile-gpu
 */

precision highp float;

uniform sampler2D src;

in highp vec2 blurCoords[5];
out vec4 fragColor;

void main () {
	lowp vec4 sum = vec4(0.0);
	sum += texture(src, blurCoords[0]) * 0.204164;
	sum += texture(src, blurCoords[1]) * 0.304005;
	sum += texture(src, blurCoords[2]) * 0.304005;
	sum += texture(src, blurCoords[3]) * 0.093913;
	sum += texture(src, blurCoords[4]) * 0.093913;
	fragColor = sum;
}
