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

// DOCUMENTOR EXPORT
module.exports = function (grunt) {
	
	if(typeof grunt.option("extra")["configFile"] != "undefined")
	{
		pathOP = grunt.option("extra")["invokedFrom"];
		process.chdir(grunt.option("extra")["invokedFrom"]);
		configFile = grunt.option("extra")["configFile"];
	}
	
	var apidocconfig = require(configFile); 
	apidocconfig["pathOP"] = pathOP;
	var documentAutomation = gruntmodule(apidocconfig);
    
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
		, exec: documentAutomation.getCommands()
        , watch: documentAutomation.getWatchers()
     });
  
	grunt.registerTask('default', ["watch"]);
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
};
