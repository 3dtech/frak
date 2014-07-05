/** Sources manager for font sources. Font sources describe everything that
  needs to be loaded to render text.

	A font source is a .json file that references other files required to render the font:
	<pre>
	{
		"name": "Default Font",	// Name of the font
		"textures": [						// Textures used by the font containing required characters
			"fonts/Default_0.png",
			"fonts/Default_1.png",
			"fonts/Default_2.png"
		],
		"data": "fonts/Default.fnt", // Font data file that contains information about character positions and kerning
		"material": "materials/FontMaterial.json" // Material used when rendering text
	}
	</pre>

	See text rendering tutorial for more information.
 */
var FontSourcesManager=Manager.extend({
	init: function(context, fontsManager, textManager) {
		this._super();

		if(fontsManager && !(fontsManager instanceof FontsManager)) throw "fontsManager is not instance of FontsManager";
		if(textManager && !(textManager instanceof TextManager)) throw "textManager is not instance of TextManager";

		if(!textManager) textManager=new TextManager();
		this.textManager=textManager;

		if(!fontsManager) fontsManager=new FontsManager(context);
		this.fontsManager=fontsManager;
	},

	add: function(source) {
		return this.addDescriptor(new FontSourceDescriptor(source));
	},

	createResource: function(fontSourceDescriptor) {
		return new FontSource(fontSourceDescriptor);
	},

	loadResource: function(fontSourceDescriptor, fontSource, loadedCallback, failedCallback) {
		var scope = this;
		Logistics.getText(this.sourceCallback(fontSourceDescriptor.getFullPath(), fontSourceDescriptor), function (data) {
			var object = JSON && JSON.parse(data) || $.parseJSON(data);
			if (!object || !object.textures || !object.data || !object.material) {
				failedCallback(fontSourceDescriptor);
				return;
			}
			var fontDescriptor = new FontDescriptor(object.textures, object.data, new MaterialSourceDescriptor(object.material));
			fontDescriptor.parentDescriptor=fontSourceDescriptor;
			fontSource.font=scope.fontsManager.addDescriptor(fontDescriptor);
			scope.fontsManager.load(function() {
				loadedCallback(fontDescriptor, fontSource);
			});
		}).error(function() {
			failedCallback(fontSourceDescriptor);
		});
	}
});