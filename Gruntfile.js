/**
* APIDOCJS AUTO DOCUMENTOR.
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup, 
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <dvera at sunset.com.mx>
*/
var gruntmodule = require('./lib/documentor/grunt.module.js');
//var apidocconfig = require('./apidoc.config.js');
var apidocconfig = require(process.cwd() + '/apidoc.config.js');

var documentAutomation = gruntmodule(apidocconfig);

// DOCUMENTOR EXPORT
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
		, exec: documentAutomation.getCommands()
        , watch: documentAutomation.getWatchers()
     });
  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
};
