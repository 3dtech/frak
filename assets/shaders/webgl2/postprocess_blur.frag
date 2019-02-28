/**
 * Blur post-process
 * http://www.sunsetlakesoftware.com/2013/10/21/optimizing-gaussian-blurs-mobile-gpu
 */

precision highp float;

uniform sampler2D src;

varying highp vec2 blurCoords[5];

void main () {
	lowp vec4 sum = vec4(0.0);
	sum += texture2D(src, blurCoords[0]) * 0.204164;
	sum += texture2D(src, blurCoords[1]) * 0.304005;
	sum += texture2D(src, blurCoords[2]) * 0.304005;
	sum += texture2D(src, blurCoords[3]) * 0.093913;
	sum += texture2D(src, blurCoords[4]) * 0.093913;
	gl_FragColor = sum;
}
