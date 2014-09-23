/** FRAK for minified version that won't load files on its own */
var FRAK=Class.extend({
	/** Constructor */
	init: function(callback, includes, useCache, prefix, progressCallback, eachItemCallback) {
		if(!prefix) prefix='js/';
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

		for(var inc in includes) {
			this.include(includes[inc]);
		}

		this.load();
	},

	include: function(script) {
		this.stack.push(script);
		this.total++;
	},

	getVersion: function() {
		return frakVersion;
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
			console.warn("Failed to load '"+script+"' at "+exception.lineNumber+": "+exception);
			console.trace();
		});
	}
});