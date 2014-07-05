/** Used to load text-based resources. 
	Example of usage: 
	<pre>
	var textManager=new TextManager();
	var text=textManager.add('test.txt');	// Request text file
	textManager.load(function() {
		// Result is in data, because resource must be an object
		console.log(text.data);
	});
	</pre>
	*/
var TextManager=Manager.extend({
	/** Constructor */
	init: function() {
		this._super();
	},
	
	/** Adds new text descriptor to loading queue. This is a helper 
		function to load textures simply by providing path 
		@param source Path to source 
		@return New text resource object (until not loaded: {'data': false, 'descriptor': new TextDescriptor(source)}) */
	add: function(source) {
		return this.addDescriptor(new TextDescriptor(source));
	},

	createResource: function(textDescriptor) {
		return {"data": false, 'descriptor': textDescriptor};
	},
	
	loadResource: function(textDescriptor, textResource, loadedCallback, failedCallback) {
		Logistics.getText(this.sourceCallback(textDescriptor.getFullPath(), textDescriptor), function (data) {
			textResource.data=data;
			loadedCallback(textDescriptor, textResource);
		}).error(function() {
			failedCallback(textDescriptor);
		});
	}
});