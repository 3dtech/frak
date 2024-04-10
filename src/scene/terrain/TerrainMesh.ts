/**
 * Generates mesh used to render terrain on GPU.
 * The mesh consists of triangle fans arranged in concentric 4-sided pyramids
 * in order to keep sampling density near the viewer.
 */

 // TODO: Add uv mapping mode that does not repeat the coordinates over tiled textures

function TerrainMesh() {
	var scope = this;

	this.generate = function (size, cellSize, numCones) {
		if (numCones<1)
			throw "TerrainMesh: numCones must be at least 1";

		var positions = [];
		var uv = [];
		var normals = [];
		var faces = [];
		var barycentric = [];
		var offset = 0;

		var meshSize = size * Math.pow(2, numCones-1);
		var halfSize = meshSize/2.0;

		var LEFT = 1,
			RIGHT = 2,
			UP = 3,
			DOWN = 4;

		function mapuv(p) {
			return (p + halfSize) / meshSize;
		}

		function addOctoFan(position, cellSize, sideA?, sideB?) {
			positions.push(position[0], position[1], position[2]);
			uv.push(mapuv(position[0]), mapuv(position[2]));
			normals.push(0.0, 1.0, 0.0);
			barycentric.push(0, 0, 1);

			positions.push(position[0]-0.5*cellSize, position[1], position[2]-0.5*cellSize);
			uv.push(mapuv(position[0]-0.5*cellSize), mapuv(position[2]-0.5*cellSize));
			normals.push(0.0, 1.0, 0.0);
			barycentric.push(0, 1, 0);

			if (sideA !== LEFT && sideB !== LEFT) {
				positions.push(position[0]-0.5*cellSize, position[1], position[2]);
				uv.push(mapuv(position[0]-0.5*cellSize), mapuv(position[2]));
				normals.push(0.0, 1.0, 0.0);
				barycentric.push(0, 0, 0);
			}

			positions.push(position[0]-0.5*cellSize, position[1], position[2]+0.5*cellSize);
			uv.push(mapuv(position[0]-0.5*cellSize), mapuv(position[2]+0.5*cellSize));
			normals.push(0.0, 1.0, 0.0);
			barycentric.push(1, 0, 0);

			if (sideA !== UP && sideB !== UP) {
				positions.push(position[0], position[1], position[2]+0.5*cellSize);
				uv.push(mapuv(position[0]), mapuv(position[2]+0.5*cellSize));
				normals.push(0.0, 1.0, 0.0);
				barycentric.push(0, 0, 0);
			}

			positions.push(position[0]+0.5*cellSize, position[1], position[2]+0.5*cellSize);
			uv.push(mapuv(position[0]+0.5*cellSize), mapuv(position[2]+0.5*cellSize));
			normals.push(0.0, 1.0, 0.0);
			barycentric.push(1, 1, 0);

			if (sideA !== RIGHT && sideB !== RIGHT) {
				positions.push(position[0]+0.5*cellSize, position[1], position[2]);
				uv.push(mapuv(position[0]+0.5*cellSize), mapuv(position[2]));
				normals.push(0.0, 1.0, 0.0);
				barycentric.push(0, 0, 0);
			}

			positions.push(position[0]+0.5*cellSize, position[1], position[2]-0.5*cellSize);
			uv.push(mapuv(position[0]+0.5*cellSize), mapuv(position[2]-0.5*cellSize));
			normals.push(0.0, 1.0, 0.0);
			barycentric.push(0, 1, 1);

			if (sideA !== DOWN && sideB !== DOWN) {
				positions.push(position[0], position[1], position[2]-0.5*cellSize);
				uv.push(mapuv(position[0]), mapuv(position[2]-0.5*cellSize));
				normals.push(0.0, 1.0, 0.0);
				barycentric.push(0, 0, 0);
			}

			// 2 side-splits removed
			if (sideA && sideB) {
				faces.push(
					offset + 0, offset + 1, offset + 2,
					offset + 0, offset + 2, offset + 3,
					offset + 0, offset + 3, offset + 4,
					offset + 0, offset + 4, offset + 5,
					offset + 0, offset + 5, offset + 6,
					offset + 0, offset + 6, offset + 1
				);
				offset += 7;
			}
			// 0 side-splits removed
			else if (!sideA && !sideB) {
				faces.push(
					offset + 0, offset + 1, offset + 2,
					offset + 0, offset + 2, offset + 3,
					offset + 0, offset + 3, offset + 4,
					offset + 0, offset + 4, offset + 5,
					offset + 0, offset + 5, offset + 6,
					offset + 0, offset + 6, offset + 7,
					offset + 0, offset + 7, offset + 8,
					offset + 0, offset + 8, offset + 1
				);
				offset += 9;
			}
			// 1 side-split removed
			else {
				faces.push(
						offset + 0, offset + 1, offset + 2,
						offset + 0, offset + 2, offset + 3,
						offset + 0, offset + 3, offset + 4,
						offset + 0, offset + 4, offset + 5,
						offset + 0, offset + 5, offset + 6,
						offset + 0, offset + 6, offset + 7,
						offset + 0, offset + 7, offset + 1
					);
					offset += 8;
			}
		}

		function genCone(size, cellSize, gridStep, prevBounds?) {
			var origin = vec3.create();
			var count = size/cellSize;
			var x = -(size - cellSize) / 2.0;
			for (var i=0; i<count; i++) {
				var y = -(size - cellSize) / 2.0;
				for (var j=0; j<count; j++) {
					if (prevBounds) {
						if (x>prevBounds[0] && x<prevBounds[1] && y>prevBounds[0] && y<prevBounds[1]) {
							y+=cellSize;
							continue;
						}
					}

					origin[0] = x;
					origin[2] = y;
					origin[1] = gridStep; // Not used at the moment

					if (i==0 || i==count-1 || j==0 || j==count-1) {
						var a = null;
						var b = null;
						if (i == 0)
							a = LEFT;
						else if (i == count-1)
							a = RIGHT;

						if (j == 0)
							b = DOWN;
						else if (j == count-1)
							b = UP;

						addOctoFan(origin, cellSize, a, b);
					}
					else {
						addOctoFan(origin, cellSize);
					}

					y+=cellSize;
				}
				x+=cellSize;
			}
		}

		var step = 0.5;
		genCone(size, cellSize, step); // Initial core cone (the highest density)

		var prevBounds = vec2.create();
		for (var i=1; i<numCones; i++) {
			vec2.set(prevBounds, -(size-cellSize)/2.0, (size-cellSize)/2.0);
			size *= 2.0;
			cellSize *= 2.0;
			step *= 2.0;
			genCone(size, cellSize, step, prevBounds);
		}

		scope.positions = positions;
		scope.barycentric = barycentric;
		scope.normals = normals;
		scope.uv = uv;
		scope.faces = faces;
	};
}

globalThis.TerrainMesh = TerrainMesh;
export default TerrainMesh;
