/**
* APIDOCJS AUTO DOCUMENTOR.
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup,
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <dvera at sunset.com.mx>
*/
const path = require('path');
var gruntmodule = require('./lib/documentor/grunt.module.js');
var configFile = "./apidoc.config.js";
var pathOP = undefined;
var packagePath = 'package.json';

// DOCUMENTOR EXPORT
module.exports = function (grunt) {

	if(typeof  grunt.option("invokedFrom") != "undefined" &&
		typeof grunt.option("configFile") != "undefined" &&
		typeof grunt.option("packagePath") != "undefined")
	{
		pathOP = grunt.option("invokedFrom");
		configFile = grunt.option("configFile");
		packagePath = grunt.option("packagePath");
	}

	var apidocconfig = require(configFile);
	var documentAutomation = gruntmodule(apidocconfig, pathOP);

	grunt.initConfig({
        pkg: grunt.file.readJSON(packagePath)
		   , apidoc: documentAutomation.getApidocs()
      , watch: documentAutomation.getWatchers()
  });
	grunt.loadNpmTasks('grunt-apidoc');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-exec');
	grunt.registerTask('default', ["watch"]);
};
