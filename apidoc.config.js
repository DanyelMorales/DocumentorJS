/**
* APIDOCJS AUTO DOCUMENTOR.
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup, 
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <dvera at sunset.com.mx>
*/
// COLLECTION OF CONFIG FOR SPECIFIC GROUP OF DOCUMENTATION
var globalConfig = {
	"configDir": "doc/apidoc/",
	"outputDir": "./doc/apidoc/",
	"sourceDir": ["./src/main/java/com/m4sg/crm4marketingsunset/resources/"]
};

var plantillaDeEmail = {
				"groupName":"emailplantillas", 
				"regex":["**/Email*.java", "**/*.js"],
				"regexapidoc":["Email.*\.java$", "Email.*\.js$"]
};

var sobreventa = {
				"sourceDir": ["./src/main/java/com/m4sg/crm4marketingsunset/"],
				"groupName":"sobreventa", 
				"regex":["/reservation/**/*.java", "**/*.js"],
				"regexapidoc":["reservation\/.*\.java$"]
};

var compilado = {
				"groupName":"CRM", 
				"regex":["!**/Email*.java", "**/*.java"],
				"regexapidoc":["!Email.*\.java$",".*\.java$"]
};

var hotel = {
				"groupName":"hotel", 
				"sourceDir": ["./src/main/java/com/m4sg/crm4marketingsunset/"],
				"regex":["**/Hotel*.java", "**/*.js"],
				"regexapidoc":["Hotel.*\.java$", "Hotel.*\.js$"]
};

var cliente = {
				"groupName":"cliente", 
				"sourceDir": ["./src/main/java/com/m4sg/crm4marketingsunset/"],
				"regex":["**/Customer*.java", "**/*.js"],
				"regexapidoc":["Customer.*\.java$", "Customer.*\.js$"]
};

var groups = {
	"global": globalConfig, 
	"groups": [plantillaDeEmail, sobreventa, hotel, cliente]
};

module.exports = groups; 