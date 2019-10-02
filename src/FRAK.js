export class FRAK {
	constructor(callback) {
		if (typeof(callback) == 'function')
			callback();
		// For backwards compatibility with <1.2.0
	}

	isFunction(f) {
		return typeof(f) === 'function';
	}

	isEmptyObject(o) {
		for (var prop in o) {
			if (o.hasOwnProperty(prop))
				return false;
		}
		return true;
	}

	parseJSON(s) {
		if (typeof window !== 'undefined' && window.JSON && window.JSON.parse)
			return window.JSON.parse(s);
		if (typeof window !== 'undefined' && window.jQuery && window.jQuery.parseJSON)
			return window.jQuery.parseJSON(s);

		if (typeof JSON !== 'undefined') {
			return JSON.parse(s);
		}
		throw 'parseJSON: No JSON parser available.';
	}

	timestamp() {
		if (typeof window !== 'undefined' && window.performance && window.performance.now)
			return function() {
				return window.performance.now.apply(window.performance);
			};
		return Date.now;
	}

	requestAnimationFrame() {
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
	}

	cancelAnimationFrame() {
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
	}

	fullscreenEnabled() {
		if(typeof document !== 'undefined') {
			return document.fullscreenEnabled ||
				document.webkitFullscreenEnabled ||
				document.mozFullScreenEnabled ||
				document.msFullscreenEnabled;
		}
		else return false;

	}

	requestFullscreen(element) {
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
	}

	exitFullscreen() {
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
	}

	isFullscreen() {
		return (document.isFullScreen ||
			document.isFullscreen ||
			document.webkitIsFullscreen ||
			document.webkitIsFullScreen ||
			document.mozIsFullscreen ||
			document.mozIsFullScreen ||
			document.msIsFullscreen ||
			document.msIsFullScreen);
	}

	isWebGLSupported() {
		const canvas = document.createElement('canvas');
		let _gl = null;

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
	}
}

export const FrakClass = FRAK;
