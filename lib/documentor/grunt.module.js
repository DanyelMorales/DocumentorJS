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
var apidocbuilder = require('./apidocbuilder.js');
var DocumentAutomation = require('./documentAutomation.js');
var manager = apidocbuilder.manager;

module.exports = function(apidocconfig, projectPath){
	var managerObject = new manager().chdir(projectPath);
	var documentAutomation = new DocumentAutomation(managerObject, apidocconfig);
	documentAutomation.create();
	return documentAutomation;
};
