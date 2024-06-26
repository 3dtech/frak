/**
 * Defines explicit locations for commonly used shader program attributes.
 */

var ExplicitAttributeLocations = {
	'position': 0,
	'normal': 1,
	'texcoord2d0': 2, 'uv0': 2,
	'tangent': 3, 'tangent4d': 3,
	'bitangent': 4,
	'color': 5,
};

globalThis.ExplicitAttributeLocations = ExplicitAttributeLocations;
export default ExplicitAttributeLocations;
