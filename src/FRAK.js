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
