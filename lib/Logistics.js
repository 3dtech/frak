/**
*	@version 0.3
*/
var Logistics = (function(){
		var storageSupport = false;
		if(typeof window !== "undefined"){
			storageSupport = 'localStorage' in window && window['localStorage'] !== null;
		}

		var queue = [];
		var multiQueue = []; // {"count": 10, "success": funcion(){}}
		var loadedCount = 0;
		var loading = false;
		var afterLoadCallback = null;
		var progressCallback = null;
		var loadedCheckTimer = null;

		var options = {
			"loadFromLocalStorage": false,
			"storeToLocalStorage": false,
			"loadFromFile": false,
			"enableCORS": true,
			"useCookies": false,
			"fallbackFromStorage": false,
		};

		var me = this;

		var typefunctions = {
			"text": {
				"load": function(dt){
					makeHTTPRequest(dt);
				},
				"parse": function(dt, http){
					dt.data = http.responseText;
				},

				"store": function(dt){
					return dt.data;
				},

				"restore": function(dt, data){
					return data;
				},
			},
			"json": {
				"load": function(dt){
					makeHTTPRequest(dt);
				},
				"parse": function(dt, http){
					try {
						dt.data = JSON.parse(http.responseText);
					}
					catch(e){
						if(typeof console !== "undefined" && console.error){
							console.error("JSON parsing failed for "+dt.url, e);
						}
					}
				},
				"store": function(dt){
					return JSON.stringify(dt.data);
				},
				"restore": function(dt, data){
					if(data){
						return JSON.parse(data);
					}
					else {
						return {};
					}
				},
			},
			"xml": {
				"load": function(dt){
					makeHTTPRequest(dt);
				},
				"parse": function(dt, http){
					if(http.responseXML){
						dt.data = http.responseXML;
					}
					else {
						dt.data = parseXML(http.responseText);
					}
				},
				"store": function(dt){
					if(XMLSerializer){
						return (new XMLSerializer()).serializeToString(dt.data);
					}
					else {
						return "";
					}
				},
				"restore": function(dt, data){
					return parseXML(data);
				},
			},
			"image": {
				"load": function(dt){
					if(dt){
						dt.data = new Image();

						if(dt.useCORS){
							dt.data.crossOrigin = "Anonymous";
						}

						dt.data.onload = function() {
							dt.ready();
						};

						dt.data.onerror = function() {
							dt.failed();
						};

						dt.data.src = dt.url;
					}
				},
				"parse": function(dt){

				},

				"store": function(dt){
					var canvas = document.createElement("canvas");
					canvas.width = dt.data.width;
					canvas.height = dt.data.height;

					// Copy the image contents to the canvas
					var ctx = canvas.getContext("2d");
					ctx.drawImage(dt.data, 0, 0);

					var dataURL = canvas.toDataURL("image/png");
					canvas = null;

					return dataURL;
				},
				"restore": function(dt, data){
					var img = new Image();
					img.src = data;
					return img;
				},
			},
			"binary": {
				"load": function(dt){
					makeHTTPRequest(dt);
				},
				"parse": function(dt, http){
					dt.data = http.response;
				},

				"store": function(dt){
					var str = '';
					var bytes = new Uint8Array( dt.data );
					var len = bytes.byteLength;
					for (var i = 0; i < len; i++) {
						str += String.fromCharCode( bytes[ i ] );
					}
					return window.btoa( str );
				},

				"restore": function(dt, data){
					var buf = new ArrayBuffer(data.length*2); // 2 bytes for each char
					var bufView = new Uint16Array(buf);
					for (var i=0, strLen=data.length; i<strLen; i++) {
						bufView[i] = data.charCodeAt(i);
					}
					return buf;
				},
			},

		};

		// This holds info about item that is loaded
		var DataTransporter = function(_url, _params, _success, _type, _requestType){
			this.url = _url;
			this.params = _params;
			this.success = _success;
			this.dataType = _type;
			this.loaded = false;
			this.data = false; //Holds the parsedData (JSON, XMLDocument, Image, TypedArray)
			this.requestType = _requestType;
			this.useCORS = false;
			this.options = {};

			this.successCallback = _success;
			this.errorCallback = false;
			this.alwaysCallback = false;
			this.progressCallback = false;

			this.setOption = function(key, value){
				this.options[key] = value;
			};

			this.getOption = function(key){
				return this.options[key];
			};

			this.ready = function(){
				this.loaded = true;
				loadedCount++;
				callSuccess(this);
				callProgress();
			};

			this.failed = function(){
				loadedCount++;
				callProgress();
				callError(this);
			};

			this.done = function(callback){
				this.successCallback = callback;
			};

			this.fail = function(callback){
				this.errorCallback = callback;
			};

			this.error = function(callback){
				this.errorCallback = callback;
			};

			this.always = function(callback){
				this.alwaysCallback = callback;
			};

			this.progress = function(callback){
				this.progressCallback = callback;
			};

			this.toString = function(){
				return this.data;
			};
		};

		var MultiTransporter = function(urlList, _success){
			this.urls = urlList;
			this.results = {};
			this.loadedCount = 0;
			this.count = 0;
			this.successCallback = _success;

			this.load = function(){
				var dt = null;
				var url = null;

				for (var key in this.urls) {
					if (this.urls.hasOwnProperty(key)){
						this.count++;
					}
				}

				for(var i in this.urls){
					url = this.urls[i];
					if(url && url.url && url.type){
						dt = get(url.url, undefined, callback(this, this.ready, i), url.type);
						dt.setOption("logistics.multi.key", i);
						dt.fail(callback(this, this.fail));
					}
				}
			};

			this.ready = function(data, status, dt){
				var key = dt.getOption("logistics.multi.key");
				this.results[key] = data;
				this.loadedCount++;
				this.checkIfAllReady();
			};

			this.fail = function(dt){
				this.loadedCount++;
				this.checkIfAllReady();
			};

			this.getKeyForURL = function(url){

			};

			this.checkIfAllReady = function(){
				if(this.loadedCount >= this.count){
					if(typeof this.successCallback === "function"){
						this.successCallback(this.results);
					}
				}
			};
		};

		var get = function(_url, _params, _success, _type){
			var _requestType = "GET";

			//If params is function then this is the success callback
			// Mimics jQuery.get method
			if (typeof _params === "function") {
				// We assume that it's the callback
				_success = _params;
				_params = undefined;
			} else if ( _params && typeof _params === "object" ) {
				_requestType = "POST";
			}

			var dt = new DataTransporter(_url, _params, _success, _type, _requestType);
			if(options.enableCORS){
				dt.useCORS = ifCORSNeeded(_url);
			}

			if(dt){
				queue.push(dt);
				startLoad(dt);
			}

			return dt;
		};

		var getMultiple = function(urlList, success){
			var mt = new MultiTransporter(urlList, success);
			multiQueue.push(mt);
			mt.load();
		};

		var ifCORSNeeded = function(_url){
			if (typeof(document) === "undefined")
				return false;
			var url = _url.match(/(https?:)?\/\/([^\/]+)\/(.*)/);
			if (!url)
				return false;
			if (url[1] === document.location.origin)
				return false;
			return true;
		};

		var startLoad = function(dt){
			load(dt);
			return true;
		};

		var load = function(dt){
			//check if localStorage is supported
			if(options.loadFromLocalStorage && inLocalStorage(dt)){
				restore(dt);
			}
			else{
				getTypeFunction(dt.dataType, "load")(dt);
			}
		};

		var inLocalStorage = function(dt){
			if(storageSupport && localStorage.getItem(dt.url) !== null){
				return true;
			}
			return false;
		};

		var restore = function(dt){
			dt.data = getTypeFunction(dt.dataType, "restore")(dt, loadFromLocalStorage(dt));
			dt.ready();
		};

		var getTypeFunction = function(type, method){
			if(typefunctions && typefunctions[type] && typefunctions[type][method]){
				return typefunctions[type][method];
			}
			else if(typefunctions && typefunctions[type]){
				return typefunctions[type];
			}

			return function(){
				if(typeof console !== "undefined" && console.warn){
					console.warn("Method "+method+" for "+type+" not found");
				}
			};
		};

		var setTypeFunction = function(type, method){
			if(type && method){
				typefunctions[type] = method;
			}
		};

		var makeHTTPRequest = function(dt){
			var xhr = getHTTPObject(dt);
			if(xhr && dt){
				//Prevent caching
				var url = dt.url;

				xhr.open(dt.requestType, url, true);
				if (xhr.overrideMimeType){
					xhr.overrideMimeType('text/plain');
				}

				if(dt.dataType == "binary"){
					xhr.responseType = "arraybuffer";
					if(dt.useCORS){
						xhr.setRequestHeader('Content-Type', 'application/x-3dtechdata');
					}
				}

				if(dt.useCORS && options.useCookies){
					xhr.withCredentials = true;
				}
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if(xhr.status == 200) {
							dt.loaded = true;
							loadedCount++;
							getTypeFunction(dt.dataType, "parse")(dt, xhr);
							callSuccess(dt);
						}
						else {
							loadedCount++;
							callError(dt);
						}
					}
					else {
						if(typeof dt.progressCallback === "function"){
							dt.progressCallback(xhr);
						}
					}
				};

				xhr.ontimeout = function(){
					loadedCount++;
					callError(dt);
				};

				callProgress();

				xhr.send(null);
			}
			else {
				throw "http failed";
			}
		};

		//From jQuery
		var parseXML = function(data){
			var xml = null;
			if ( !data || typeof data !== "string" ) {
				return xml;
			}

			if (window.DOMParser){
				var parser = new DOMParser();
				xml=parser.parseFromString(data, "text/xml");
			}
			else {
				xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = false;
				xml.loadXML(data);
			}

			if ( !xml || xml.getElementsByTagName("parsererror").length ) {
				throw "XML parsing failed";
			}

			return xml;
		};

		var getHTTPObject = function(dt) {
			var http = false;
			//Use IE's ActiveX items to load the file.
			if(dt.useCORS && window.XDomainRequest){
				try {http = new XDomainRequest();}
				catch (E) {http = false;}
			} else if (XMLHttpRequest) {
				try {
					http = new XMLHttpRequest();
				}
				catch (e) {
					http = false;
				}
			}else if(typeof ActiveXObject !== 'undefined') {
				try {http = new ActiveXObject("Msxml2.XMLHTTP"); alert(2);}
				catch (e) {
					try {http = new ActiveXObject("Microsoft.XMLHTTP"); alert(3);}
					catch (E) {http = false;}
				}
			}

			return http;
		};

		var clear = function(){
			queue = [];
			multiQueue = [];
			loadedCount = 0;
			loading = false;
		};

		var store = function(){
			if(storageSupport){
				for(var i in queue){
					storeToLocalStorage(queue[i]);
				}
			}
			else {
				console.warn("localStorage isn't supported");
			}
		};

		var clearStorage = function(){
			localStorage.clear();
		};

		var storeToLocalStorage = function(dt){
			if(storageSupport){
				try {
						localStorage[dt.url] = getTypeFunction(dt.dataType, "store")(dt);
				}
				catch(err){
					console.warn("localStorage limit exceeded");
				}
			}
			else {
				console.warn("localStorage isn't supported");
			}
		};

		var loadFromLocalStorage = function(dt){
			return localStorage[dt.url];
		};

		var callSuccess = function(dt){
			if(dt && typeof dt.successCallback === "function"){
				dt.successCallback(dt.data, "success", dt);

				//check if there is something else to load
				callIfFinished();
			}

			if(dt && options.storeToLocalStorage){
				storeToLocalStorage(dt);
			}

		};

		var callError = function(dt){
			if(dt && options.fallbackFromStorage && inLocalStorage(dt)){
				restore(dt);
				return;
			}
			else if(dt && typeof dt.errorCallback === "function"){
				dt.errorCallback(dt, "error", "");
			}

			callIfFinished();
		};

		var callProgress = function(){
			if(progressCallback && typeof progressCallback === "function" && queue.length && loadedCount){
				progressCallback(loadedCount/queue.length);
			}
		};

		var callIfFinished = function(){
			if(loadedCheckTimer === null){
				loadedCheckTimer = setTimeout(finishedChecker, 5);
			}
		};

		var finishedChecker = function(){
			loadedCheckTimer = null;
			if(queue.length == loadedCount && afterLoadCallback && typeof afterLoadCallback === "function"){
				afterLoadCallback();
			}
		};

		var callback = function(classScope, fnCallback) {
			return function() {
				return fnCallback.apply(classScope, arguments);
			};
		};

		var setOption = function(key, value){
			options[key] = value;
		};

		var getOption = function(key){
			return options[key];
		};

		return {
			count: function(){
				return queue.length;
			},

			loadedCount: function(){
				return loadedCount;
			},

			clear: function(){
				clear();
			},

			// Returns response as a string
			get: function(url, params, success, type, reload){
				return get(url, params, success, toLowerCase(type));
			},

			getJSON: function(url, params, success, reload){
				return get(url, params, success, "json", reload);
			},

			getImage: function(url, params, success, reload){
				return get(url, params, success, "image", reload);
			},

			getBinary: function(url, params, success, reload){
				return get(url, params, success, "binary", reload);
			},

			getXML: function(url, params, success, reload){
				return get(url, params, success, "xml", reload);
			},

			getText: function(url, params, success, reload){
				return get(url, params, success, "text", reload);
			},

			getMultiple: function(urlList, success, reload){
				getMultiple(urlList, success, reload);
			},

			store: function(){
				store();
			},

			clearStorage: function(){
				clearStorage();
			},

			types: function(){
				return typefunctions;
			},

			onFinishedLoading: function(callback){
				afterLoadCallback = callback;
			},

			onProgress: function(callback){
				progressCallback = callback;
			},

			getQueue: function(){
				return queue;
			},

			getTypeFunction: function(type, method){
				return getTypeFunction(type, method);
			},

			setTypeFunction: function(type, method){
				return setTypeFunction(type, method);
			},

			getOption: function(key){
				return getOption(key);
			},

			setOption: function(key, value){
				setOption(key, value);
			}
		};
})();
