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
var DocumentAutomation = require('./DocumentAutomation.js');

module.exports = function(apidocconfig, projectPath){
	var documentAutomation = new DocumentAutomation(apidocconfig);
	documentAutomation.getApidocBuilder().getCfgManager().getWorkingDir().chdir(projectPath);
	documentAutomation.create();
	return documentAutomation;
};
