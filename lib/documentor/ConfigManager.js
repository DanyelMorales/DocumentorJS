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

const I_CONFIG_DIR = "configDir";
const I_GROUP_NAME = "groupName";
const I_OUTPUT_DIR = "outputDir";
const I_SOURCE_DIR = "sourceDir";
const I_REGEX = "regex";
const I_REGEX_APIDOC = "regexapidoc";

function ConfigManager(globalConfig, groupConfig, workingDirectory)
{
	var global = globalConfig;
	var group = groupConfig;
  var workingDir = workingDirectory;

  this.init = function(globalConfig, groupConfig){
    global = globalConfig;
    group = groupConfig;
  };

  this.getWorkingDir = function(){ return workingDir; };
  this.getGlobalK = function(key){ return global[key]; };
  this.getGroupK = function(key){ return group[key]; };

  this.getConfigDir = function()
	{
		return workingDir.normalizePath(global[I_CONFIG_DIR]);
	};

  this.getSourceDirFormat = function(){
		var sourcedir = this.getSourceDir();
		if(typeof(sourcedir) == "object")
		{
			var regex = "-i %s";
			return this.getRegex(regex, sourcedir).join(' ');
		}
	};

	this.getSourceDir = function()
	{
		var sourceDir = [];
		if(typeof group[I_SOURCE_DIR] != "undefined"){
			sourceDir = group[I_SOURCE_DIR];
		}else{
			sourceDir = global[I_SOURCE_DIR];
		}
		return workingDir.normalizePaths(sourceDir);
	};

	this.getOutputDir = function()
	{
		return workingDir.normalizePath(global[I_OUTPUT_DIR] + group[I_GROUP_NAME]);
	};

  this.getRegexToDocument = function(){
		var regex = "-f %s";
		return this.getRegex(regex, group[I_REGEX_APIDOC]).join(' ');
	};

  this.getRegex = function(regex, collection)
	{
		var cmd = [];
		for(var i in  collection)
		{
			str = this.replaceTagg(util.format(regex, collection[i]));
			cmd[i]= str;

		}
		return cmd;
	};

	this.replaceTagg = function(str)
	{
		var str_ = str;
		for ( var key in group ){
			if ( group.hasOwnProperty(key) ){
				val = group[key];
				str_ = str_.replace("{{"+key+"}}",val);
			}
		}
		return str_;
	};
};


module.exports = ConfigManager;
