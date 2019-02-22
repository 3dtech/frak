var BuiltInShaders = {
	"shaders/default/diffuse.vert": " \
		attribute vec3 position; \
		attribute vec3 normal; \
		attribute vec2 texcoord2d0; \
		\
		uniform mat4 model; \
		uniform mat4 view; \
		uniform mat4 modelview; \
		uniform mat4 projection; \
		uniform mat4 lightProjection; \
		uniform mat4 lightView; \
		\
		varying vec2 uv0; \
		varying vec4 worldPosition; \
		varying vec3 worldNormal; \
		varying vec4 viewPosition; \
		varying vec3 viewNormal; \
		varying vec4 shadowPosition; \
		\
		void main() { \
			uv0 = texcoord2d0;  \
			worldPosition = model * vec4(position, 1.0); \
			worldNormal = normalize(mat3(model) * normal); \
			viewPosition = view * worldPosition; \
			viewNormal = mat3(modelview) * normal; \
		\
			shadowPosition = lightProjection * lightView * worldPosition; \
		\
			gl_Position = projection * viewPosition; \
	}",
	"shaders/default/diffuse.frag": " \
		precision highp float; \
		\
		uniform mat4 modelview; \
		uniform mat4 view; \
		\
		uniform vec4 ambient; \
		uniform vec4 diffuse; \
		uniform float specularStrength; \
		uniform int specularPower; \
		\
		uniform vec3 lightDirection; \
		uniform vec4 lightColor; \
		uniform float lightIntensity; \
		uniform float shadowBias; \
		\
		uniform sampler2D diffuse0; \
		uniform sampler2D shadow0; \
		\
		uniform int hasFloat; \
		uniform int useVSM; \
		uniform int useShadows; \
		uniform int receiveShadows; \
		\
		varying vec2 uv0; \
		varying vec4 worldPosition; \
		varying vec3 worldNormal; \
		varying vec4 viewPosition; \
		varying vec3 viewNormal; \
		varying vec4 shadowPosition; \
		\
		float unpack(vec4 c) { \
			const vec4 bitShifts = vec4(1.0 / (255.0 * 255.0 * 255.0), 1.0 / (255.0 * 255.0), 1.0 / 255.0, 1.0); \
			return dot(c, bitShifts); \
		} \
		\
		vec4 lighting(float shadow) { \
			vec4 textureColor = texture2D(diffuse0, uv0); \
			vec3 N = normalize(viewNormal); \
			vec3 L = normalize(mat3(view)*lightDirection); \
			vec3 V = normalize(-viewPosition.xyz); \
			vec3 H = normalize(L + V); \
			float diffuseLight = max(dot(N, L), 0.0) * lightIntensity; \
			float specularLight = min(max(dot(N, H), 0.0), 1.0); \
			specularLight = pow(specularLight, float(specularPower)); \
		\
			vec4 ambientColor = ambient * textureColor; \
			vec4 diffuseColor = diffuse * diffuse * textureColor * lightColor * diffuseLight; \
			vec4 specularColor = lightColor * specularLight * specularStrength; \
		\
			return ambientColor + (diffuseColor + specularColor) * shadow; \
		} \
		\
		float linstep(float low, float high, float v) { \
			return clamp((v-low)/(high-low), 0.0, 1.0); \
		} \
		\
		float VSM(vec2 moments, float compare) { \
			float p = smoothstep(compare - shadowBias, compare, moments.x); \
			float variance = max(moments.y - moments.x*moments.x, -0.001); \
			float d = compare - moments.x; \
			float p_max = linstep(0.2, 1.0, variance / (variance + d*d)); \
			return clamp(max(p, p_max), 0.0, 1.0); \
		} \
		\
		float shadowmap() { \
			vec2 uv = shadowPosition.xy / shadowPosition.w; \
			uv = uv * 0.5 + 0.5; \
			vec4 shadowTexel = texture2D(shadow0, uv); \
		\
			float depth; \
			if (hasFloat == 1) \
				depth = shadowTexel.r; \
			else \
				depth = unpack(shadowTexel); \
		\
			float lightDepth = (shadowPosition.z + 1.0) * 0.5; \
		\
			if (useVSM == 1) \
				return VSM(shadowTexel.xy, lightDepth); \
		\
			return step(lightDepth - shadowBias, depth); \
		} \
		\
		void main(void) { \
			float shadow = 1.0; \
			if (useShadows > 0 && receiveShadows > 0) { \
				shadow = shadowmap(); \
			} \
		\
			vec4 color = lighting(shadow); \
			gl_FragColor = clamp(color, 0.0, 1.0); \
		}",
	"shaders/default/forward_shadow.vert": " \
		attribute vec3 position; \
		attribute vec2 texcoord2d0; \
		\
		uniform mat4 modelview; \
		uniform mat4 projection; \
		\
		varying float depth; \
		varying vec2 uv; \
		\
		void main() { \
			vec4 viewPosition = modelview * vec4(position, 1.0); \
			vec4 clipPosition = projection * viewPosition; \
			depth = clipPosition.z; \
			uv = texcoord2d0; \
			gl_Position = clipPosition; \
		}",
	"shaders/default/forward_shadow_vsm.frag": " \
		#extension GL_OES_standard_derivatives : require \n\
		\
		precision highp float; \
		\
		uniform vec4 diffuse; \
		uniform sampler2D diffuse0; \
		\
		varying float depth; \
		varying vec2 uv; \
		\
		void main() { \
			vec4 textureColor = texture2D(diffuse0, uv); \
			vec4 color = diffuse * textureColor; \
			if (color.a < 0.99) \
				discard; \
		\
			float d = (depth + 1.0) * 0.5; \
			float dx = dFdx(d); \
			float dy = dFdy(d); \
		\
			gl_FragColor = vec4(d, pow(d, 2.0) + 0.25*(dx*dx + dy*dy), 0.0, 1.0); \
		}",
	"shaders/default/ScreenQuad.vert": " \
		attribute vec3 position; \
		attribute vec2 uv0; \
		\
		varying vec2 uv; \
		\
		void main() { \
			uv = uv0; \
			gl_Position = vec4(position.xy, 0.0, 1.0); \
		}",
	"shaders/default/ScreenQuad.frag": " \
		precision highp float; \
		\
		varying vec2 uv; \
		uniform sampler2D tex0; \
		\
		void main () { \
			gl_FragColor = texture2D(tex0, uv); \
		}",
	"shaders/default/depth.vert": " \
		attribute vec3 position; \
		attribute vec2 texcoord2d0; \
		\
		uniform mat4 modelview; \
		uniform mat4 projection; \
		uniform float zNear; \
		uniform float zFar; \
		\
		varying float depth; \
		varying vec2 uv; \
		\
		void main() { \
			vec4 viewPosition = modelview * vec4(position, 1.0); \
			depth = (-viewPosition.z - zNear) / (zFar - zNear); \
			uv = texcoord2d0; \
			gl_Position = projection * viewPosition; \
		}",
	"shaders/default/depth.frag": " \
		precision mediump float; \
		\
		uniform vec4 diffuse; \
		uniform sampler2D diffuse0; \
		\
		varying float depth; \
		varying vec2 uv; \
		\
		void main() { \
			vec4 textureColor = texture2D(diffuse0, uv); \
			vec4 color = diffuse * textureColor; \
			if (color.a < 0.99) \
				discard; \
		\
			gl_FragColor = vec4(depth, depth, depth, depth); \
		}",
	"shaders/default/transparent.frag": " \
		precision mediump float;  \
		\
		uniform vec4 diffuse; \
		\
		uniform sampler2D diffuse0; \
		\
		varying vec3 fragNormal; \
		varying vec4 fragPosition; \
		varying vec2 fragTexcoord2d0; \
		\
		void main(void) { \
			gl_FragColor = diffuse*texture2D(diffuse0, fragTexcoord2d0); \
		}",
	"shaders/default/transparent.vert": " \
		attribute vec3 position;  \
		attribute vec3 normal;  \
		attribute vec2 texcoord2d0;  \
		\
		uniform mat4 modelview; \
		uniform mat4 projection; \
		\
		varying vec3 fragNormal; \
		varying vec4 fragPosition; \
		varying vec2 fragTexcoord2d0; \
		\
		void main() { \
			fragNormal=mat3(modelview)*normal; \
			fragPosition=modelview*vec4(position, 1.0); \
			fragTexcoord2d0=texcoord2d0; \
			gl_Position=projection*fragPosition; \
		}",
	"shaders/default/deferred_light_ambient.frag": " \
		precision highp float; \
		\
		uniform sampler2D gb0; \
		uniform sampler2D gb1; \
		uniform sampler2D gb2; \
		uniform sampler2D gb3; \
		uniform sampler2D shadow0; \
		\
		uniform vec4 lightColor; \
		\
		varying vec2 uv; \
		\
		void main () { \
			vec4 data0 = texture2D(gb0, uv); \
			vec3 color = data0.rgb * lightColor.rgb; \
			gl_FragColor = vec4(color, 1.0); \
		}",
	"shaders/default/deferred_light_ambient.vert": " \
		attribute vec3 position; \
		attribute vec2 texcoord2d0; \
		\
		varying vec2 uv; \
		\
		void main() { \
			uv = texcoord2d0; \
			gl_Position = vec4(position.xy, 0.0, 1.0); \
		}",
	"shaders/default/deferred_light_directional.vert": " \
		attribute vec3 position; \
		attribute vec2 texcoord2d0; \
		\
		varying vec2 uv; \
		\
		void main() { \
			uv = texcoord2d0; \
			gl_Position = vec4(position.xy, 0.0, 1.0); \
		}",
	"shaders/default/deferred_light_directional.frag": " \
		precision highp float; \
		\
		uniform sampler2D gb0; \
		uniform sampler2D gb1; \
		uniform sampler2D gb2; \
		uniform sampler2D gb3; \
		uniform sampler2D shadow0; \
		\
		uniform vec3 cameraPosition; \
		uniform vec3 lightDirection; \
		uniform vec4 lightColor; \
		uniform float lightIntensity; \
		\
		uniform mat4 view; \
		uniform mat4 lightView; \
		uniform mat4 lightProjection; \
		uniform float shadowBias; \
		\
		uniform int useShadows; \
		uniform int useSoftShadows; \
		uniform int shadowOnly; \
		\
		varying vec2 uv; \
		\
		float linstep(float low, float high, float v) { \
			return clamp((v-low)/(high-low), 0.0, 1.0); \
		} \
		\
		float VSM(vec2 moments, float compare) { \
			float p = smoothstep(compare - shadowBias, compare, moments.x); \
			float variance = max(moments.y - moments.x*moments.x, -0.001); \
			float d = compare - moments.x; \
			float p_max = linstep(0.2, 1.0, variance / (variance + d*d)); \
			return clamp(max(p, p_max), 0.0, 1.0); \
		} \
		\
		float shadowmap(vec4 worldPosition) { \
			vec4 shadowPosition = lightProjection * lightView * worldPosition; \
			vec2 shadowUV = shadowPosition.xy / shadowPosition.w; \
			shadowUV = shadowUV * 0.5 + 0.5; \
			vec4 shadowTexel = texture2D(shadow0, shadowUV); \
		\
			return VSM(shadowTexel.xy, shadowPosition.z); \
			// return step(shadowPosition.z - shadowBias, shadowTexel.r); \
		} \
		\
		void main () { \
			vec4 data2 = texture2D(gb2, uv); \
			vec4 data3 = texture2D(gb3, uv); \
			vec4 P = vec4(data2.xyz, 1.0); \
		\
			float shadow = 1.0; \
		\
			if (useShadows == 1 && data3.g > 0.0) { \
				if (useSoftShadows == 1) \
					shadow = texture2D(shadow0, uv).r; \
				else \
					shadow = shadowmap(P); \
			} \
		\
			if (shadowOnly == 1) { \
				gl_FragColor = vec4(shadow, shadow, shadow, 1.0); \
				return; \
			} \
		\
			vec4 data0 = texture2D(gb0, uv); \
			vec4 data1 = texture2D(gb1, uv); \
			vec3 C = data0.xyz; \
			vec3 N = data1.xyz; \
			float specularIntensity = data0.w; \
			float specularPower = 255.0*data2.w; \
		\
			vec4 viewPosition = view * P; \
			vec3 L = normalize(mat3(view) * lightDirection); \
			vec3 V = normalize(-viewPosition.xyz); \
			vec3 H = normalize(L + V); \
			float diffuseLight = max(dot(N, L), 0.0); \
			float specularLight = pow(clamp(dot(N, H), 0.0, 1.0), float(specularPower)); \
			vec3 diffuseColor = C * lightColor.rgb * diffuseLight * lightIntensity; \
			vec3 specularColor = lightColor.rgb * specularLight * specularIntensity; \
			vec3 lighting = diffuseColor + specularColor; \
		\
			vec3 final = shadow * mix(C, lighting, data3.r); \
			gl_FragColor = vec4(final, 1.0);  \
		}"
};
