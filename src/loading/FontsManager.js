/** Fonts manager is used to load font described by font descriptors. */
var FontsManager=Manager.extend({
	/** Constructor
		@param context Instance of RenderingContext
		@param materialSourcesManager Instance of MaterialSourcesManager
		@param materialsManager Instance of MaterialsManager
		@param texturesManager Instance of TexturesManager
		@param textManager Take a guess...
		*/
	init: function(context, materialSourcesManager, materialsManager, texturesManager, textManager) {
		this._super();

		if(materialSourcesManager && !(materialSourcesManager instanceof MaterialSourcesManager)) throw "materialSourcesManager is not instance of MaterialSourcesManager";
		if(materialsManager && !(materialsManager instanceof MaterialsManager)) throw "materialsManager is not instance of MaterialsManager";
		if(texturesManager && !(texturesManager instanceof TexturesManager)) throw "texturesManager is not instance of TexturesManager";
		if(textManager && !(textManager instanceof TextManager)) throw "textManager is not instance of TextManager";

		if(!textManager) textManager=new TextManager();
		this.textManager=new TextManager();

		if(!materialsManager) materialsManager=new MaterialsManager(context);
		this.materialsManager=materialsManager;

		if(!materialSourcesManager) materialSourcesManager=new MaterialSourcesManager(context, this.materialsManager, this.textManager);
		this.materialSourcesManager=materialSourcesManager;

		if(!texturesManager) texturesManager=new TexturesManager(context);
		this.texturesManager=texturesManager;
	},

	/** Adds a new font descriptor with given font textures and font data to loading queue
		@param fontTextures An array of texture paths
		@param fontData Path to font data file (.fnt) */
	add: function(fontTextures, fontData) {
		return this.addDescriptor(new FontDescriptor(fontTextures, fontData));
	},

	createResource: function(fontDescriptor) {
		return new Font(false, false, false, fontDescriptor);
	},

	loadResource: function(fontDescriptor, font, loadedCallback, failedCallback) {
		var me=this;
		var textures=[];

		var texturePaths = fontDescriptor.fontTexturePaths;
		for(var i in texturePaths) {
			var textureDescriptor = new TextureDescriptor(texturePaths[i]);
			textureDescriptor.parentDescriptor=fontDescriptor;
			textures.push(this.texturesManager.addDescriptor(textureDescriptor));
		}

		this.texturesManager.load(function() {
			// Store loaded font textures
			font.textures=textures;

			if(!fontDescriptor.materialSourceDescriptor) {
				fontDescriptor.materialSourceDescriptor=new MaterialSourceDescriptor("materials/FontMaterial.json");
			}
			fontDescriptor.materialSourceDescriptor.parentDescriptor=fontDescriptor;

			font.materialSource=me.materialSourcesManager.addDescriptor(fontDescriptor.materialSourceDescriptor);
			me.materialSourcesManager.load(function() {
				// Override textures of material
				font.materialSource.material.samplers=[];

				for(var t in font.textures) {
					font.materialSource.material.samplers.push(new Sampler("page"+t, font.textures[t]));
				}

				var text=me.textManager.add(fontDescriptor.getFullDataPath());
				me.textManager.load(function() {
					font.data=new FontData($.parseXML(text.data));
					loadedCallback(fontDescriptor, font);
				});
			});
		});
	}
});