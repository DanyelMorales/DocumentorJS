/**
* DocumentorJS
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup,
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <danyelmorales1991 at gmail.com>
*/
const util = require('util');
var DocumentAutomation = require('./DocumentFacade.js');

module.exports = function(apidocconfig, projectPath){
	var documentAutomation = new DocumentAutomation(apidocconfig);
	documentAutomation.getApidocBuilder().getCfgManager().getWorkingDir().chdir(projectPath);
	documentAutomation.setTasks(["apidoc"]).create();
	return documentAutomation;
};
