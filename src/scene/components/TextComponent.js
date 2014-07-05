/** Text component is used to render text at given node */
var TextComponent=MeshComponent.extend({
	/** Constructor
		@param text Default text to display
		@param fontSourceDescriptor Descriptor describing font source location */
	init: function(text, fontSourceDescriptor) {
		if(!fontSourceDescriptor) {
			fontSourceDescriptor=new FontSourceDescriptor("fonts/default.json");
		}
		this.fontSourceDescriptor=fontSourceDescriptor;
		this.fontSource=false;
		this.alignment='center';
		this._super(new Mesh());
		this.engine=false;
		this.context=false;
		this.submeshes={};					// Map of page submeshes
		this.loaded=false;
		this.setText(text);
	},

	excluded: function() {
		return this._super().concat(["material", "engine", "context", "fontSource"]);
	},

	type: function() {
		return "TextComponent";
	},

	onStart: function(context, engine) {
		this.context=context;
		this.engine=engine;
		if(!this.fontSource) {
			this.fontSource=engine.assetsManager.fontSourcesManager.addDescriptor(this.fontSourceDescriptor);
			var me=this;
			engine.assetsManager.load(function() {
				me.loaded=true;
				me.generateTextMesh();
				me.updateTextRenderer();
			});
		}
	},

	updateTextRenderer: function() {
		var me=this;
		this.node.onEachComponent(function(c) {
			if(c instanceof TextRendererComponent) c.updateRenderers(me.context, me.engine);
		});
	},

	/** Sets text and generates text mesh */
	setText: function(text) {
		this.text = String(text);
		this.generateTextMesh();
	},

	/** Generates text mesh */
	generateTextMesh: function() {
		if(!this.loaded) return;

		var fontData=this.fontSource.font.data;
		if (!fontData) {
			console.log('Warning: font data not available!', this.fontSource);
		}

		var text=this.text;
		var submeshPositions={};	// Positions in page submeshes
		var position = vec2.create();
		var size = vec2.create();

		// For entire text
		for(var i in text) {
			// Fetch character and character data
			var c=text.charCodeAt(i);
			if(!fontData.characters[c]) continue;	// Skip unknown character

			var cData=fontData.characters[c];
			size=cData.size;
			var offset=vec2.fromValues(0, -cData.offset[1]+fontData.baseline-size[1]);
			//console.log(offset, cData.offset[1], fontData.lineHeight, fontData.baseline);

			// Character rectangle on texture
			//var rectangle=[cData.normalizedPosition, vec2.add(vec2.create(), cData.normalizedPosition, cData.normalizedSize)];
			var rectangle=[cData.normalizedPosition, vec2.subtract(vec2.create(), cData.normalizedPosition, cData.normalizedSize)];

			var kerning=0;
			if(i<text.length-1) {
				var nc=text.charCodeAt(i);
				if(fontData.kernings[c] && fontData.kernings[c][nc]) kerning=fontData.kernings[c][nc];
			}

			// Create character submesh, if it does not exist for the page

			var submesh=this.getPageSubmesh(cData.page);
			if(!submeshPositions[cData.page]) submeshPositions[cData.page]=0;								// Current position in page submesh is 0
			var p=submeshPositions[cData.page];		// Text cursor position in current page submesh
			submeshPositions[cData.page]++;

			// Positions
			submesh.positions[(p*4+0)*3]=offset[0]+position[0];
			submesh.positions[(p*4+0)*3+1]=offset[1];
			submesh.positions[(p*4+0)*3+2]=0;

			submesh.positions[(p*4+1)*3]=offset[0]+position[0]+size[0];
			submesh.positions[(p*4+1)*3+1]=offset[1];
			submesh.positions[(p*4+1)*3+2]=0;

			submesh.positions[(p*4+2)*3]=offset[0]+position[0]+size[0];
			submesh.positions[(p*4+2)*3+1]=offset[1]+size[1];
			submesh.positions[(p*4+2)*3+2]=0;

			submesh.positions[(p*4+3)*3]=offset[0]+position[0];
			submesh.positions[(p*4+3)*3+1]=offset[1]+size[1];
			submesh.positions[(p*4+3)*3+2]=0;

			// Normals
			for(var j=0; j<4; j++) {
				submesh.normals[(p*4+j)*3+0]=0;
				submesh.normals[(p*4+j)*3+1]=0;
				submesh.normals[(p*4+j)*3+2]=1;
			}

			// Texture coordinates

			submesh.texCoords2D[0][(p*4+0)*2+0]=rectangle[0][0];
			submesh.texCoords2D[0][(p*4+0)*2+1]=rectangle[0][1];

			submesh.texCoords2D[0][(p*4+1)*2+0]=rectangle[1][0];
			submesh.texCoords2D[0][(p*4+1)*2+1]=rectangle[0][1];

			submesh.texCoords2D[0][(p*4+2)*2+0]=rectangle[1][0];
			submesh.texCoords2D[0][(p*4+2)*2+1]=rectangle[1][1];

			submesh.texCoords2D[0][(p*4+3)*2+0]=rectangle[0][0];
			submesh.texCoords2D[0][(p*4+3)*2+1]=rectangle[1][1];

			submesh.faces[p*6+0]=p*4+0;
			submesh.faces[p*6+1]=p*4+1;
			submesh.faces[p*6+2]=p*4+3;
			submesh.faces[p*6+3]=p*4+1;
			submesh.faces[p*6+4]=p*4+2;
			submesh.faces[p*6+5]=p*4+3;

			position[0]+=size[0]+kerning;
		}

		for(var s in this.submeshes) {
			var submesh=this.submeshes[s];

			if(this.alignment) {
				var offset=0.0;
				if(this.alignment=='center') offset=-position[0]/2;
				if(this.alignment=='right') offset=-position[0];

				for(var i=0; i<submesh.positions.length; i+=3) {
					submesh.positions[i]+=offset;
				}
			}

			submesh.recalculateBounds();
			submesh.materialIndex=0;
			this.mesh.addSubmesh(submesh);
		}

		this.mesh.materials=[this.fontSource.font.materialSource.material];

		this.onTextSet();
	},

	/** Called after text has been set and bounding boxes calculated for text mesh */
	onTextSet: function() {},

	// Private
	/** Calculates characters count on page
		@param page Currently accessed page */
	calculateCharactersOnPage: function(page) {
		var count=0;
		var fontData=this.fontSource.font.data;
		for(var i in fontData.characters) {
			var cData=fontData.characters[i];
			if(cData.page==page) count++;
		}
		return count;
	},

	/** Gets cached submesh or creates submesh for characters on given page */
	getPageSubmesh: function(page) {
		if(this.submeshes[page]) return this.submeshes[page];

		var submesh=new Submesh();

		// Calculate characters count per page for calculating submesh normals, faces and positions count
		var characterCount=this.calculateCharactersOnPage(page);

		submesh.page=new UniformInt(page);			// Special character page variable for submesh. It'll be used to switch samplers
		submesh.faces=new Array(2*3*characterCount);
		submesh.positions=new Array(3*4*characterCount);
		submesh.normals=new Array(3*4*characterCount);
		submesh.texCoords2D=[new Array(2*4*characterCount)];

		this.submeshes[page]=submesh;

		return submesh;
	}
});