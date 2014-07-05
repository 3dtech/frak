/**
 * Builds FRAK minified version.
 * node build.js [debug]
 */

var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;

require('./src/Version.js');
var files = require('./dependencies.json');

var outputFilename = "frak-"+frakVersion+".min.js";
var outputFile = "builds/"+outputFilename;

function success(error, stdout, stderr){
	sys.puts(stderr);
	if (error) {
		console.log(error, stderr);
	}
}

var command = "uglifyjs -m -c -o "+outputFile+" --stats ";
if (process.argv.length>=3 && process.argv[2]=='debug') {
	command = "uglifyjs -b -o "+outputFile+" --stats ";
	console.log('WARNING: Building DEBUG build of FRAK library.');
}
exec(command + files.join(' '), {"maxBuffer": 1024*1024}, success);
