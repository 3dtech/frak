# FRAK JSON model format

```javascript
	{
		// An axis-aligned bounding box for the entire model [optional]
		"bounds" : {
			"center" : [ 0, 0, 0 ],
			"extents" : [ 10, 10, 10 ],
			"max" : [ 10, 10, 10 ],
			"min" : [ -10, -10, -10 ]
		},
		// The collision octree for this model [optional]
		"collision" : {
			"center" : [ 0, 0, 0 ],
			"extents" : [ 10, 10, 10 ],
			"faces" : {
				"node-id" : { // Node ID from the models' spatial hierarchy tree
					"mesh-index" : [ // Index to the meshes lists
						// Mesh face indices that lie in this octree node
					]
				}
			},
			subnodes: [
				// 8 x the same structure as the root collision tree node
			]
		},
		// List of materials in the model
		"materials" : [
			{
				// Describes ambient, diffuse, emissive and specular colors
				"color" : {
					"ambient" : { "a" : 1, "b" : 0.2, "g" : 0.2, "r" : 0.2 },
					"diffuse" : { "a" : 1, "b" : 0, "g" : 1, "r" : 1 },
					"emissive" : { "a" : 1, "b" : 1, "g" : 1, "r" : 1 },
					"specular" : { "a" : 1, "b" : 1, "g" : 1, "r" : 1 }
				},
				"name" : "blue",
				"shader" : "Diffuse",
				// Textures object can be empty
				"textures" : {
					"texturesDiffuse" : [ "texture.png" ], // Diffuse textures
					"texturesNormals" : [ "normals.png" ]  // Normal maps
				}
			}
		],
		// List of meshes in the model
		"meshes" : [
			{
				"bitangents" : [],
				"faces" : [],
				"materialIndex" : 0, // Index into the materials list
				"normals" : [],
				"tangents" : [],
				"texCoords2D" : [
					[]
				],
				"vertices" : []
			}
		],
		// Metadata - currently only specifies the format version.
		"meta" : {
			"version" : 1
		},
		// Model spatial hierarchy
		// All transformations are column-major matrices
		"scene" : {
			"absolute" : [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
			"id" : 0, // Numerical ID (unique within this model)
			"meshes" : [],
			"name" : "root",
			"relative" : [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
			"subnodes" : [
				{
					"absolute" : [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
					"id" : 1,
					"meshes" : [ 0 ], // List of indices into the meshes list
					"name" : "A subnode",
					"relative" : [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
					"subnodes" : []
				}
			]
		}
	}

```