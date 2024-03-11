#if ALPHAMODE == ALPHAMODE_MASK
uniform float alphaCutoff;
#endif

#ifdef LEGACY_AMBIENT
uniform vec4 ambient;
#endif

uniform vec4 diffuse;

#ifdef EMISSIVE
uniform vec4 emissive;
#endif

uniform float metallic;
uniform float perceptualRoughness;
