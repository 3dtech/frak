function FRAK(callback) {
	// For backwards compatibility with <1.2.0
	if (typeof(callback) == 'function')
		callback();
}

FRAK.extend = function() {
	for (var i=1; i<arguments.length; ++i) {
		for (var key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key))
				arguments[0][key] = arguments[i][key];
		}
	}
	return arguments[0];
};

FRAK.isFunction = function(f) {
	return typeof(f) === 'function';
};

FRAK.isEmptyObject = function(o) {
	for (var prop in o) {
		if (o.hasOwnProperty(prop))
			return false;
	}
	return true;
};

FRAK.parseJSON = function(s) {
	if (typeof window !== 'undefined' && window.JSON && window.JSON.parse)
		return window.JSON.parse(s);
	if (typeof window !== 'undefined' && window.jQuery && window.jQuery.parseJSON)
		return window.jQuery.parseJSON(s);

	if (typeof JSON !== 'undefined') {
		return JSON.parse(s);
	}
	throw 'FRAK.parseJSON: No JSON parser available.';
};

FRAK.timestamp = function() {
	if (typeof window !== 'undefined' && window.performance && window.performance.now)
		return function() {
			return window.performance.now.apply(window.performance);
		};
	return Date.now;
}();

FRAK.requestAnimationFrame = function() {
	if(typeof window !== 'undefined') {
		var raf = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame;
		if (raf) {
			return function() { return raf.apply(window, arguments); };
		}

		return function(f) { return window.setTimeout(f, 1000/60); };
	}
	else if (typeof setTimeout !== 'undefined') {
		return function(f) { return setTimeout(f, 1000/60); };
	}
}();

FRAK.cancelAnimationFrame = function() {
	if(typeof window !== 'undefined') {
		var caf = window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame;
		if (caf)
			return function() { return caf.apply(window, arguments); };
	}
	else if (typeof clearTimeout !== 'undefined') {
		return clearTimeout;
	}
}();

FRAK.fullscreenEnabled = function() {
	if(typeof document !== 'undefined') {
		return document.fullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled;
	}
	else return false;

}();

FRAK.requestFullscreen = function(element) {
	(element.requestFullscreen ||
		element.requestFullScreen ||
		element.webkitRequestFullscreen ||
		element.webkitRequestFullScreen ||
		element.mozRequestFullscreen ||
		element.mozRequestFullScreen ||
		element.msRequestFullscreen ||
		element.msRequestFullScreen ||
		function(){})
	.call(element);
};

FRAK.exitFullscreen = function() {
	(document.exitFullscreen ||
		document.exitFullScreen ||
		document.webkitExitFullscreen ||
		document.webkitExitFullScreen ||
		document.mozExitFullscreen ||
		document.mozExitFullScreen ||
		document.msExitFullscreen ||
		document.msExitFullScreen ||
		function(){})
	.call(document);
};

FRAK.isFullscreen = function() {
	return (document.isFullScreen ||
		document.isFullscreen ||
		document.webkitIsFullscreen ||
		document.webkitIsFullScreen ||
		document.mozIsFullscreen ||
		document.mozIsFullScreen ||
		document.msIsFullscreen ||
		document.msIsFullScreen);
};

FRAK.isWebGLSupported = function() {
	var canvas = document.createElement('canvas');
	var _gl = null;

	try {
		_gl = canvas.getContext('webgl');
	}
	catch (x) {
		_gl = null;
	}

	if (_gl == null) {
		try {
			_gl = canvas.getContext('experimental-webgl');
		}
		catch (x) {
			_gl = null;
		}
	}

	canvas.remove();
	return !!_gl;
};
