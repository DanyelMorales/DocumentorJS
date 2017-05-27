/**
* APIDOCJS AUTO DOCUMENTOR.
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup,
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <dvera at sunset.com.mx>
*/
const util = require('util');
const nodePath = require('path');
const keyConfig = require("./Types");
const messagesdk = require("./utils/Messages.js").format;

function ConfigManager(workingDirectory)
{
	var global = undefined;
	var group = undefined;
  var workingDir = workingDirectory;

  this.init = function(globalConfig, groupConfig){
    global = globalConfig;
    group = groupConfig;
  };

  this.getWorkingDir = function(){ return workingDir; };
  this.getGlobalK = function(key){ return global[key]; };
  this.getGroupK = function(key){ return group[key]; };
  this.getConfigDir = function(){ return workingDir.normalizePath(global[keyConfig.I_CONFIG_DIR]); };

  this.getSourceDirFormat = function(regex){
		var sourcedir = this.getSourceDir();
		if(typeof(sourcedir) == "object")
		{
			return this.getRegex(regex, sourcedir).join(' ');
		}
	};

	this.getSourceDir = function()
	{
		var sourceDir = [];
		if(typeof group[keyConfig.I_SOURCE_DIR] != "undefined"){
			sourceDir = group[keyConfig.I_SOURCE_DIR];
		}else{
			sourceDir = global[keyConfig.I_SOURCE_DIR];
		}
		return workingDir.normalizePaths(sourceDir);
	};

	this.getOutputDir = function()
	{
		var path = global[keyConfig.I_OUTPUT_DIR] + group[keyConfig.I_GROUP_NAME];
		return workingDir.normalizePath(path);
	};

  this.getOneLineRegexToDocument = function(regex){
		return this.getRegex(regex, group[keyConfig.I_REGEX_APIDOC]).join(' ');
	};

  this.getRegex = function(regex, collection)
	{
		var cmd = [];
		for(var i in  collection)
		{
			str = messagesdk.replaceTagg(util.format(regex, collection[i]), group);
			cmd[i]= str;

		}
		return cmd;
	};

};

module.exports = ConfigManager;
