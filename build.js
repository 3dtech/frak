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
	else {
		console.log('Copying %s to builds/frak-latest.min.js', outputFile);
		fs.createReadStream(outputFile).pipe(fs.createWriteStream('builds/frak-latest.min.js'));
	}
}

var command = "uglifyjs -m -c -o "+outputFile+" --stats ";
if (process.argv.length>=3) {
	if (process.argv[2] == 'debug') {
		command = "uglifyjs -b -o "+outputFile+" --stats ";
		console.log('WARNING: Building DEBUG build of FRAK library.');
	}

	else if (process.argv[2] == "mapped") {
		command += "--source-map frak.map --source-map-url 'http://localhost:8001/frak.map' ";
		console.log('WARNING: Building SOURCE MAPPED build of FRAK library.');
	}
}
exec(command + files.join(' '), {"maxBuffer": 1024*1024}, success);
