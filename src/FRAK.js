function FRAK(callback) {
	// For backwards compatibility with <1.2.0
	if (typeof(callback) == 'function')
		callback();
}

FRAK.extend = function() {
	for(var i=1; i<arguments.length; i++)
		for(var key in arguments[i])
			if(arguments[i].hasOwnProperty(key))
				arguments[0][key] = arguments[i][key];
	return arguments[0];
};

FRAK.isFunction = function(f) {
	return typeof(f) === 'function';
};

FRAK.parseJSON = function(s) {
	if (window.JSON && window.JSON.parse)
		return window.JSON.parse(s);
	if (window.jQuery && window.jQuery.parseJSON)
		return window.jQuery.parseJSON(s);
	throw "FRAK.parseJSON: No JSON parser available.";
};

FRAK.timestamp = function() {
	if (window.performance && window.performance.now)
		return function() { return window.performance.now.apply(window.performance); };
	return Date.now;
}();

FRAK.requestAnimationFrame = function() {
	var raf = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame;
	if (raf)
		return function() { return raf.apply(window, arguments); };
	return function(f) { return window.setTimeout(f, 1000/60); };
}();

FRAK.cancelAnimationFrame = function() {
	var caf = window.cancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame;
	if (caf)
		return function() { return caf.apply(window, arguments); };
	return clearTimeout;
}();
