function FRAK(callback) {
	// For backwards compatibility with <1.2.0
	if (typeof(callback) == 'function')
		callback();
}

FRAK.raf = window.requestAnimationFrame;

FRAK.caf = window.cancelAnimationFrame;

FRAK.performance = typeof window !== 'undefined' ? (window.performance ? window.performance.now : false) : false;
FRAK.performanceNOW = function() {
	return window.performance.now.apply(window.performance);
};

FRAK.isFunction = function(f) {
	return typeof(f) === 'function';
};

FRAK.isEmptyObject = function(o) {
	for (var prop in o) {
		if (prop in o)
			return false;
	}
	return true;
};

FRAK.parseJSON = function(s) {
	if (typeof window !== 'undefined' && window.JSON && window.JSON.parse)
		return window.JSON.parse(s);

	if (typeof JSON !== 'undefined') {
		return JSON.parse(s);
	}
	throw 'FRAK.parseJSON: No JSON parser available.';
};

FRAK.timestamp = function() {
	if (FRAK.performance)
		return FRAK.performanceNOW;

	return Date.now;
}();

FRAK.requestAnimationFrame = function() {
	if(typeof window !== 'undefined') {
		if (FRAK.raf) {
			return function() { return FRAK.raf.apply(window, arguments); };
		}

		return function(f) { return window.setTimeout(f, 1000/60); };
	}
	else if (typeof setTimeout !== 'undefined') {
		return function(f) { return setTimeout(f, 1000/60); };
	}
}();

FRAK.cancelAnimationFrame = function() {
	if(typeof window !== 'undefined') {
		if (FRAK.caf)
			return function() { return FRAK.caf.apply(window, arguments); };
	}
	else if (typeof clearTimeout !== 'undefined') {
		return clearTimeout;
	}
}();

FRAK.fullscreenEnabled = function() {
	if(typeof document !== 'undefined') {
		return document.fullscreenEnabled ||
		(document as any).webkitFullscreenEnabled ||
		(document as any).mozFullScreenEnabled ||
		(document as any).msFullscreenEnabled;
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
		(document as any).exitFullScreen ||
		(document as any).webkitExitFullscreen ||
		(document as any).webkitExitFullScreen ||
		(document as any).mozExitFullscreen ||
		(document as any).mozExitFullScreen ||
		(document as any).msExitFullscreen ||
		(document as any).msExitFullScreen ||
		function(){})
	.call(document);
};

FRAK.isFullscreen = function() {
	return document.fullscreenElement !== null;
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

function FrakCallback(classScope, fnCallback) {
	return function() { return fnCallback.apply(classScope, arguments); };
}

function stringHash(str: string, seed = 0) {
	let hash = seed;
	if (!str || !str.length) return hash;
	for (let i = 0; i < str.length; i++) {
		let chr = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

function merge<A extends {}>(a: A, b: Partial<A>): A {
	for (const key of Object.keys(a)) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}

	return a;
}

globalThis.FrakCallback = FrakCallback;
globalThis.FRAK = FRAK;
export {FRAK as default, FrakCallback, merge, stringHash};
