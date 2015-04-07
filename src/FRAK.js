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
}

FRAK.isFunction = function(f) {
	return typeof(f) === 'function';
}

FRAK.parseJSON = function(s) {
	if (JSON && JSON.parse)
		return JSON.parse(s);
	if (window.jQuery && jQuery.parseJSON)
		return jQuery.parseJSON(s);
	throw "FRAK.parseJSON: No JSON parser available.";
}
