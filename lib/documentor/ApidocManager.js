/**
* APIDOCJS AUTO DOCUMENTOR.
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup,
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <dvera at sunset.com.mx>
*/

/**
 * APIDOC BUILDER CLASS
 */
const util = require('util');
const nodePath = require('path');
const ConfigManager = require("./ConfigManager.js");
const WorkingDirectory = require("./WorkingDirectory.js");
const keyConfig = require("./Types");

function ApidocBuilder(){
	this.build = function()
	{
		var configManager = new ConfigManager(new WorkingDirectory());
		var apidocmanager = new ApidocManager(configManager);
		return apidocmanager;
	}

};

function ApidocManager(cfgManager){
	var configManager = cfgManager;

	this.getCfgManager = function()
	{
		return configManager;
	};

	this.getApidocCMD = function()
	{
		var apidocCMD = "apidoc -c %s %s %s -o %s";
		var cmd =   util.format(apidocCMD,
			configManager.getConfigDir(),
			configManager.getOneLineRegexToDocument( "-f %s" ),
			configManager.getSourceDirFormat( "-i %s" ),
			configManager.getOutputDir());
		return cmd;
	};

	this.getApidocJSON = function(){
			return {
				src:	configManager.getSourceDir(),
				dest: configManager.getOutputDir(),
				options: {
					 debug: false,
					 includeFilters: configManager.getGroupK(keyConfig.I_REGEX_APIDOC),
					 excludeFilters: [ "node_modules/" ]
				}
			};
	};

	this.getRegexToWatch = function(){
		var acumulator = [];
		var dirs = configManager.getSourceDir();
		for(var i in dirs)
		{
			var regex = dirs[i] + "%s";
			var globfiles = configManager.getRegex(regex, configManager.getGroupK(keyConfig.I_REGEX));
			acumulator = acumulator.concat(globfiles);
		}
		return acumulator;
	};

	this.getTasks = function(tasks, name){
		  var collection  = [];
			for (var task in tasks) {
					collection.push(tasks[task] +":" + name);
			}
			return collection;
	};

};

module.exports =  {
	builder:ApidocBuilder,
	manager:ApidocManager
};
