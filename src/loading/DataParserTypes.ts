var DataParserTypes = {
	// base types
	NODE_ROOT										: 0x00001000,
	NODE_STRING										: 0x00001001,
	NODE_MATRIX3X3									: 0x00001002,
	NODE_MATRIX4X4									: 0x00001003,

	// everything relating to materials
	NODE_MATERIALS									: 0x00002000,
		NODE_MATERIAL								: 0x00002001,
		NODE_COLOR_AMBIENT							: 0x00002002,
		NODE_COLOR_DIFFUSE							: 0x00002003,
		NODE_COLOR_SPECULAR							: 0x00002004,
		NODE_COLOR_EMISSIVE							: 0x00002005,
		NODE_TWOSIDED								: 0x00002006,
		NODE_SHININESS								: 0x00002007,
		NODE_SHININESS_STRENGTH						: 0x00002008,

		NODE_TEXTURES_AMBIENT						: 0x00002050,
		NODE_TEXTURES_DIFFUSE						: 0x00002051,
		NODE_TEXTURES_SPECULAR						: 0x00002052,
		NODE_TEXTURES_EMISSIVE						: 0x00002053,
		NODE_TEXTURES_NORMALS						: 0x00002054,
		NODE_TEXTURES_HEIGHT						: 0x00002055,
		NODE_TEXTURES_SHININESS						: 0x00002056,
		NODE_TEXTURES_OPACITY						: 0x00002057,
		NODE_TEXTURES_DISPLACEMENT					: 0x00002058,
		NODE_TEXTURES_LIGHTMAP						: 0x00002059,
		NODE_TEXTURES_REFLECTION					: 0x0000205A,      
			NODE_TEXTURE							: 0x00002100,
				NODE_TEXTURE_SCALE					: 0x00002101,
		NODE_SHADER_NAME							: 0x00002200,

		// everything relating to geometry
		NODE_GEOMETRY								: 0x00003000,
			// triangle meshes
			NODE_MESH								: 0x00003100,
			NODE_MATERIAL_REFERENCE					: 0x00003101,
			NODE_VERTICES							: 0x00003102,
			NODE_NORMALS							: 0x00003103,
			NODE_TANGENTS							: 0x00003104,
			NODE_BITANGENTS							: 0x00003105,
			NODE_TEXTURE_COORDINATES				: 0x00003106,
			NODE_FACES								: 0x00003107,

		// scene hierarchy
		NODE_SCENE									: 0x00004000,
			NODE_GROUP								: 0x00004001,
				NODE_MESH_REFERENCE					: 0x00004002,
				NODE_TRANSFORM_POSITION				: 0x00004003,
				NODE_TRANSFORM_ROTATION				: 0x00004004,
				NODE_TRANSFORM_SCALE				: 0x00004005,
				NODE_GROUP_ID						: 0x00004006,

		// collision octrees
		NODE_COLLISION								: 0x00005000,
			NODE_COLLISION_NODE						: 0x00005001,
				NODE_COLLISION_AABB_CENTER			: 0x00005002,
				NODE_COLLISION_AABB_EXTENTS			: 0x00005003,
				NODE_COLLISION_FACE_LIST			: 0x00005004,
					NODE_FACE_LIST_NODE_ID			: 0x00005010,
					NODE_FACE_LIST_MESH_REFERENCE	: 0x00005011,
					NODE_FACE_LIST_INDICES			: 0x00005012,
	
	
	/** Helper function for getting canonical values for node IDs */
	getName: function(value) {
		for (var name in DataParserTypes) {
			if (DataParserTypes[name]===value)
				return name;
		}
		return false;
	}
};