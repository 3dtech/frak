/** Class that will load all other classes required by FRAK */
var FRAK=Class.extend({
	/** Constructor
		@param callback Callback called when all required classes have been loaded
		@param includes Extra includes array for extensions
		@param useCache Set to false to disable cache
		@param prefix Optional prefix for js files (default: 'js/')
		@param progressCallback Called to notify external components of loading progress (optional)
		@param eachItemCallback Called per each item with arguments (<path>, <code>) [optional] */
	init: function(callback, includes, useCache, prefix, progressCallback, eachItemCallback) {
		if(!prefix) prefix='';
		var includesURL = "dependencies.json"
		this.prefix=prefix;

		if(!includes) includes=[];

		if(!useCache) useCache=false;
		this.useCache=useCache;

		this.stack=[];
		this.callback=callback;
		this.onEachItem=eachItemCallback;
		this.onProgress=progressCallback;
		this.total=0;
		this.loaded=0;

		$.ajaxSetup({
			cache: useCache
		});

		this.loadIncludes(includesURL, includes);
	},

	loadIncludes: function(url, includes){
		var me = this;
		$.getJSON(url, function(coreIncludes) {
			me.loadAllIncludes(includes, coreIncludes);
		});
	},

	loadAllIncludes: function(includes, coreIncludes) {
		coreIncludes=coreIncludes.concat(includes);

		for(var inc in coreIncludes) {
			this.include(coreIncludes[inc]);
		}

		this.load();
	},

	getVersion: function() {
		return frakVersion;
	},

	include: function(script) {
		this.stack.push(script);
		this.total++;
	},

	load: function() {
		// Everything loaded?
		if(this.stack.length==0) {
			this.callback();
			return;
		}

		// Keep loading
		var script=this.prefix+this.stack.shift();
		var me=this;
		$.getScript(script,
			function(data) {
				me.loaded++;
				if ($.isFunction(me.onEachItem)) {
					me.onEachItem(script, data);
				}
				if ($.isFunction(me.onProgress))
					me.onProgress(me.loaded*100/me.total);
				me.load();
			})
		.fail(function(jqxhr, settings, exception) {
			console.log("Failed to load '"+script+"' at "+exception.lineNumber+": "+exception);
			console.trace();
		});
	},

	/** @return Array of registered components */
	getLoadedComponents: function() {
		var result=[];
		var keys=Object.keys(window);

		for( var i = 0; i < keys.length; ++i ) {
			var value=window[keys[i]];
			if(typeof value == 'function') {
				if(value.prototype instanceof Component) {
					console.log(keys[i]);
					result.push(keys[i]);
				}
			}
		}

		return result;
	}
});