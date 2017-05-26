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
	
	if(typeof  grunt.option("extra") != "undefined" && 
		typeof grunt.option("extra")["configFile"] != "undefined")
	{
		pathOP = grunt.option("extra")["invokedFrom"];
		configFile = grunt.option("extra")["configFile"];
		packagePath = grunt.option("extra")["packagePath"];
	}
	
	var apidocconfig = require(configFile); 
	var documentAutomation = gruntmodule(apidocconfig, pathOP);
	
	grunt.initConfig({
        pkg: grunt.file.readJSON(packagePath)
		, exec: documentAutomation.getCommands()
        , watch: documentAutomation.getWatchers()
     });
  
	grunt.registerTask('default', ["watch"]);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
};
