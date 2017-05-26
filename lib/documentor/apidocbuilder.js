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

function ApidocBuilder(globalConfig, groupConfig){
	var global = globalConfig;
	var group = groupConfig;
	
	function build()
	{
		var apidocmanager = new ApidocManager();
		apidocmanager.init(globalConfig, groupConfig);
		return apidocmanager;
	}
	
};

function ApidocManager(){
	
	const I_CONFIG_DIR = "configDir";
	const I_GROUP_NAME = "groupName";
	const I_OUTPUT_DIR = "outputDir";
	const I_SOURCE_DIR = "sourceDir";
	const I_REGEX = "regex";
	const I_REGEX_APIDOC = "regexapidoc";
	
	var global = undefined;
	var group = undefined;
	var cwd = undefined;
		
	this.init = function(globalConfig, groupConfig)
	{	global = globalConfig;
		group = groupConfig;
	};

	this.getApidocCMD = function() 
	{
		var apidocCMD = "apidoc -c %s %s %s -o %s";
		var cmd =   util.format(apidocCMD, this.getConfigDir(), this.getRegexToDocument(), this.getSourceDirFormat(), this.getOutputDir());
		return cmd;
	};

	this.getConfigDir = function()
	{
		return this.normalizePath(global[I_CONFIG_DIR]);
	};
	
	this.getRegexToDocument = function(){
		var regex = "-f %s";
		return this.getRegex(regex, group[I_REGEX_APIDOC]).join(' ');
	};

	this.getRegexToWatch = function(){
		var acumulator = [];
		var dirs = this.getSourceDir();
		for(var i in dirs)
		{
			var regex = dirs[i] + "%s";
			var globfiles = this.getRegex(regex, group[I_REGEX]);
			acumulator = acumulator.concat(globfiles);
		}
		
		return acumulator;
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
	}

	this.getSourceDirFormat = function(){
		var sourcedir = this.getSourceDir();
		if(typeof(sourcedir) == "object")
		{
			var regex = "-i %s";
			return this.getRegex(regex, sourcedir).join(' ');
		}
	}

	this.getSourceDir = function() 
	{	
		var sourceDir = [];
		if(typeof group[I_SOURCE_DIR] != "undefined"){
			sourceDir = group[I_SOURCE_DIR];
		}else{
			sourceDir = global[I_SOURCE_DIR];
		}
		return this.normalizePaths(sourceDir);	
	};

	this.getOutputDir = function()
	{
		return this.normalizePath(global[I_OUTPUT_DIR] + group[I_GROUP_NAME]);
	};
	
	this.chdir = function(path)
	{
		cwd = path;
		return this;
	};
	
	this.normalizePaths = function(paths)
	{	var buffer = [];
		for(var path in paths){
			buffer.push(this.normalizePath(paths[path]));
		}
		return buffer;
	};
	
	this.normalizePath = function(path)
	{	
		if (typeof cwd != 'undefined')
		{
			path = nodePath.join(cwd + "/" , path);
		}
		return path;
	};
}

module.exports =  {
	builder:ApidocBuilder,
	manager:ApidocManager
};