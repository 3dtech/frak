import ShadersManager from 'loading/ShadersManager';
import TexturesManager from 'loading/TexturesManager';
import ModelsManager from 'loading/ModelsManager';
import TextManager from 'loading/TextManager';
import MaterialsManager from 'loading/MaterialsManager';
import MaterialSourcesManager from 'loading/MaterialSourcesManager';

/** General assets manager.
	Example of usage:
	<pre>
// Usually you get instance of AssetsManager from instance of Engine, but it can be constructed separately as well:
var assetsManager=new AssetsManager(renderingContext);            // Create assets manager
var shader=assetsManager.addShaderSource('shaders/default/test'); // Add shader to loading queue
var node=assetsManager.addModel("test.data");                     // Add model to loading queue

// Start loading
assetsManager.load(function() {
	// All done, use shader and node where model from test.data has been attached
});

</pre>
	*/
class AssetsManager {
	managers: any;
	assetsPath: any;
	loadingCount: any;
	loadedCallbacks: any;
	shadersManager: any;
	texturesManager: any;
	modelsManager: any;
	textManager: any;
	materialsManager: any;
	materialSourcesManager: any;

	/**
	 * Constructor
	 * @param renderingContext Instance of RenderingContext
	 * @param assetsPath Default search path for any assets requested
	 */
	constructor(renderingContext, assetsPath) {
		this.managers=[];
		this.assetsPath = assetsPath;

		var me=this;
		this.loadingCount=0;
		this.loadedCallbacks=[];
		var addManager=function(manager) {
			manager.onAddToQueue=function(descriptor) {
				me.loadingCount++;
			};
			manager.onLoaded=function(descriptor) {
				me.loadingCount--;
				if(me.loadingCount<=0) {
					var callbacks=me.loadedCallbacks.slice(0);
					me.loadedCallbacks=[];
					for(var i=0; i<callbacks.length; i++) {
						var c=callbacks[i];
						c();
					}
				}
			};
			me.managers.push(manager);
		};

		addManager(this.shadersManager=new ShadersManager(renderingContext, this.assetsPath));
		addManager(this.texturesManager=new TexturesManager(renderingContext, this.assetsPath));
		addManager(this.modelsManager=new ModelsManager(renderingContext, this.assetsPath, this.shadersManager, this.texturesManager));
		addManager(this.textManager=new TextManager(this.assetsPath));
		addManager(this.materialsManager=new MaterialsManager(renderingContext, this.assetsPath, this.shadersManager, this.texturesManager));
		addManager(this.materialSourcesManager=new MaterialSourcesManager(renderingContext, this.assetsPath, this.materialsManager, this.textManager));
	}

	/** Adds a new texture to textures loading queue
		@param source Path to texture (url) */
	addTexture(source): any {
		return this.texturesManager.add(source);
	}

	/**
	 * Adds a new model to models loading queue
	 * @param source Path to model (url)
	 * @param format Model format ('auto', 'binary' or 'json') [optional]
	 */
	addModel(source, format): any {
		return this.modelsManager.add(source, format);
	}

	/** Adds a new GLSL shader  to shaders loading queue.
		The shader is loaded from two files: fragment shader from <source>.frag and vertex shader from <source>.vert
		@param source Path to shader (url) */
	addShaderSource(source): any {
		return this.shadersManager.addSource(source);
	}

	/** Adds a new GLSL shader source to shaders loading queue.
		@param vertexSource Path to vertex shader (url)
		@param fragmentSource Path to fragment shader (url)	*/
	addShader(vertexSource, fragmentSource): any {
		return this.shadersManager.add(vertexSource, fragmentSource);
	}

	/** Adds text source to texts loading queue.
		@param source Path to text */
	addText(source): any {
		return this.textManager.add(source);
	}

	/** Adds material source to material sources loading queue.
		@param source Path to material source */
	addMaterial(source): any {
		return this.materialSourcesManager.add(source);
	}

	/** Returns true if the asstesmanager has anything in its loading queue. */
	hasItemsInQueue(): any {
		for(var m in this.managers) {
			if (this.managers[m].getWaitingItems()>0)
				return true;
		}
		return false;
	}

	/** Starts loading all queued sources

		IMPORTANT NOTE!
		When the callback is called, there is no guarantee that onStart method has been
		called for any of the resources loaded. In fact, the opposite is likely true.

		@param callback Callback that is called when all added sources have been loaded
		@param progressCallback Callback that is called when either all shaders, all textures or all models have been loaded */
	load(callback, progressCallback): any {
		var me = this;

		if(callback) {
			this.loadedCallbacks.push(callback);
		}

		if (!this.hasItemsInQueue()) {
			var callbacks = this.loadedCallbacks.slice(0);
			this.loadedCallbacks = [];
			for(var j = 0; j < callbacks.length; j++) {
				callbacks[j]();
			}
			return;
		}

		function onProgress() {
			if (!progressCallback)
				return;
			var progress = 0.0;
			for (var i=0; i < me.managers.length; i++){
				if(me.managers[i]){
					progress += me.managers[i].getProgress();
				}
				else
					progress += 1.0;
			}
			progressCallback(progress/me.managers.length);
		}

		for(var m = 0; m < this.managers.length; m++) {
			this.managers[m].load(function() {}, onProgress);
		}
	}
}

globalThis.AssetsManager = AssetsManager;
export default AssetsManager;
