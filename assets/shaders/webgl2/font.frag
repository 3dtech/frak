// Diffuse shader
precision mediump float; 

uniform vec4 ambient;
uniform vec4 diffuse;
uniform int page;						// The font page texture

uniform sampler2D page0;		
uniform sampler2D page1;
uniform sampler2D page2;
uniform sampler2D page3;
uniform sampler2D page4;
uniform sampler2D page5;
uniform sampler2D page6;
uniform sampler2D page7;

varying vec2 fragTexcoord2d0;

void main(void) {
	vec4 c;
	if(page==0) c = texture2D(page0, fragTexcoord2d0);
	if(page==1) c = texture2D(page1, fragTexcoord2d0);
	if(page==2) c = texture2D(page2, fragTexcoord2d0);
	if(page==3) c = texture2D(page3, fragTexcoord2d0);
	if(page==4) c = texture2D(page4, fragTexcoord2d0);
	if(page==5) c = texture2D(page5, fragTexcoord2d0);
	if(page==6) c = texture2D(page6, fragTexcoord2d0);
	if(page==7) c = texture2D(page7, fragTexcoord2d0);
	gl_FragColor=vec4(diffuse.r*c.r, diffuse.g*c.g, diffuse.b*c.b, c.a);
}