/** Used to load text-based resources.
	Example of usage:
	<pre>
	var textManager=new TextManager();
	var text=textManager.add('test.txt'); // Request text file
	textManager.load(function() {
		// Do something with text.data
	});
	</pre>
	*/
var TextManager=Manager.extend({
	/**
	 * Constructor
	 * @param assetsPath Default search path for any assets requested
	 */
	init: function(assetsPath) {
		this._super(assetsPath);
	},

	/** Adds new text descriptor to loading queue. This is a helper
		function to load textures simply by providing path
		@param source Path to source
		@return New text resource object (until not loaded: {'data': false, 'descriptor': new TextDescriptor(source)}) */
	add: function(source) {
		source = this.sourceCallback(source);
		return this.addDescriptor(new TextDescriptor(source));
	},

	createResource: function(textDescriptor) {
		return {"data": false, 'descriptor': textDescriptor};
	},

	loadResource: function(textDescriptor, textResource, loadedCallback, failedCallback) {
		var descriptor = this.descriptorCallback(textDescriptor);
		Logistics.getText(descriptor.getFullPath(), function (data) {
			textResource.data = data;
			loadedCallback(descriptor, textResource);
		}).error(function() {
			failedCallback(descriptor);
		});
	}
});