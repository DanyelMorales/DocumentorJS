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
 *	APIDOC DOCUMENT AUTOMATION CLASS
 */

function DocumentAutomation(apidocBuilder, config)
{	
	this.apidocBuilder = apidocBuilder;
	this.config = config;
	var groups = this.config["groups"];
	var global = this.config["global"];

	this.commands = {};
	this.watchers = {};
	
	this.dispose = function(){
		this.commands = {};
		this.watchers = {};
	};
	
	this.getCommands = function(){
		return this.commands;
	};

	this.getWatchers = function(){
		return this.watchers;
	};

	this.create = function(){
		this.dispose();
		var name = "doc_";
		if(typeof(groups) != "object" || groups.length == 0){
			return null;
		}

		for(var i in groups)
		{		
			var tmpname =  name + i;
			this.apidocBuilder.init(global, groups[i]);
			this.createCommand(tmpname);
			this.createWatcher(tmpname);
		}
	};

	this.createCommand = function(name){
		this.commands[name] = 
		{
			cmd: this.apidocBuilder.getApidocCMD()
		};
	};
	

	this.createWatcher = function(name){
		this.watchers[name] = {
                files: this.apidocBuilder.getRegexToWatch()
               , tasks:['exec:' + name]
        };
	};

};
// --------------------

module.exports = DocumentAutomation;