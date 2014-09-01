/** Models manager is used to load entire models together with shaders and textures. */
var ModelsManager=Manager.extend({
	init: function(context, shadersManager, texturesManager) {
		this._super();
		if(!shadersManager) shadersManager=new ShadersManager(context);
		this.shadersManager=shadersManager;

		if(!texturesManager) texturesManager=new TexturesManager(context);
		this.texturesManager=texturesManager;

		this.loadRelativeTextures=true;
	},

	/** Gets loading progress. The progress per resource also depends on progress of
		shaders and textures manager used by models manager.
		@return Current loading progress from 0 to 1 */
	getProgress: function() {
		if(this._super()==1.0) return 1.0;
		return this._super()+(this.texturesManager.getProgress()+this.shadersManager.getProgress())/2.0/this.getTotalItems();
	},

	add: function(source, noCollisionTree) {
		return this.addDescriptor(new ModelDescriptor(source, noCollisionTree));
	},

	createResource: function() {
		return new Node();
	},

	/** Must load given resource from location described by descriptor
		@param descriptor Instance of resource descriptor
		@param resource Resource that will be loaded (created with createResource)
		@param loadedCallback Callback function(descriptor, resource) that must be called by loadResource when loading has finished successfully
		@param failedCallback Callback function(descriptor) that must be called by loadResource when loading has failed */
	loadResource: function(descriptor, resource, loadedCallback, failedCallback) {
		var totalTime=0.0;
		var me=this;
		Logistics.getBinary(descriptor.source,
			function(binaryData) {
				if(!binaryData || binaryData.byteLength == 0) {
					failedCallback(descriptor);
					return;
				}
				var parser = me.createParser(
					binaryData,
					function(parsedData, userdata) {
						var end = new Date().getTime();
						var delta = end-fileStartTime;
						totalTime+=delta;
						console.log('Parsed data: ', parsedData, " delta: ", delta, " time: ", totalTime);

						var modelLoader=new ModelLoader(me.context, descriptor, '', me.shadersManager, me.texturesManager, descriptor.noCollisionTree);
						modelLoader.load(resource, parsedData);

						loadedCallback(descriptor, resource);

						me.shadersManager.load(function() {});
						me.texturesManager.load(function() {});
					},
					function(errors, userdata) {
						failedCallback(descriptor);
					},
					function(progress, userdata) {}
				);
				fileStartTime=new Date().getTime();
				parser.parse();
			}
		);
	},

	/** This function can be overridden to provide alternative parser instances */
	createParser: function(data, cbOnComplete, cbOnError, cbOnProgress, userdata) {
		return new ThreadedDataParser(data, cbOnComplete, cbOnError, cbOnProgress, userdata);
	}
});