#!/usr/bin/env node


var grunt = require('grunt');
var fs = require('fs');
const path = require('path');

var configFile  = "/apidoc.config.js";
var workingdir = path.join(process.cwd(),configFile);

// verificando si existe el archivo de configuracion
if (!fs.existsSync(workingdir)) {
	console.log("NOT FOUND MAIN CONFIG:" + workingdir);
   return new Error(workingdir);
}

// Lanzando el watcher
grunt.tasks(['watch']);
grunt.cli({
  gruntfile: __dirname + "/../Gruntfile.js",
  extra: {"configFile": workingdir, "invokedFrom":process.cwd()}
});