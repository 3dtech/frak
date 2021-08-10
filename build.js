/**
 * Builds FRAK minified version.
 * node build.js [debug]
 */

const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');

const UGLIFYJS = path.join('node_modules', '.bin', 'uglifyjs');

const frakVersion = require('./src/Version.js').version;
const files = require('./dependencies.json');
let type = 'min';

if (process.argv.length >= 3 && process.argv[2] == 'debug') {
	type = 'debug';
}

const outputFilename = `frak-${frakVersion}.${type}.js`// 'frak-' + frakVersion.version + '.' + type + '.js';
const outputFile = path.join('builds', outputFilename);

function success(error, stdout, stderr){
	console.error(stderr);
	if (error) {
		console.log(error, stderr);
	}
	else {
		console.log(`Copying ${outputFile} to ${path.join('builds', `frak-latest.${type}.js}`)}`);
		fs.createReadStream(outputFile).pipe(fs.createWriteStream(path.join('builds', `frak-latest.${type}.js`)));
	}
}

let command = UGLIFYJS + ' -m -c -o ' + outputFile + ' --timings -- ';
if (process.argv.length>=3) {
	if (process.argv[2] == 'debug') {
		command = UGLIFYJS + ' -b -o ' + outputFile + ' --timings -- ';
		console.log('WARNING: Building DEBUG build of FRAK library.');
	}
	else if (process.argv[2] == 'mapped') {
		command += '--source-map frak.map --source-map-url "http://localhost:8001/frak.map" ';
		console.log('WARNING: Building SOURCE MAPPED build of FRAK library.');
	}
}

//console.log(command+files.join(' '));
exec(command + files.join(' '), {'maxBuffer': 1024*1024}, success);
