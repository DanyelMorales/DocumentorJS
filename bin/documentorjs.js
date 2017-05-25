#!/usr/bin/env node

var grunt = require('grunt');
var fs = require('fs');
const path = require('path');
 
var configFile  = "/apidoc.config.js";
var workingdir = path.join(process.cwd(),configFile);
var gruntFile =  path.join(__dirname , "/../Gruntfile.js");

// verificando si existe el archivo de configuracion
if (!fs.existsSync(workingdir) || !fs.existsSync(gruntFile)) {
	console.log("NOT FOUND MAIN CONFIG:" + workingdir);
   return new Error(workingdir);
}

// Lanzando el watcher

grunt.cli({
  gruntfile: gruntFile,
  extra: {"configFile": workingdir, "invokedFrom":process.cwd(), "packagePath":path.join(__dirname , "/../package.json")}
});