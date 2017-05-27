#!/usr/bin/env node


// LOCAL DEPENDENCIES
var terminaldk = require("./documentor/utils/TerminalColors.js").terminal;
var messagesdk = require("./documentor/utils/Messages.js").format;
var strings = require("./documentor/Assets/Strings.js");

// NODE DEPENDENCIES
var fs = require('fs');
const path = require('path');
var exec = require('child_process').execSync;
var util = require('util');

// DATA TO PASS THROUG
var configFile  = "/apidoc.config.js";
var workingdir = path.join(process.cwd(),configFile);
var gruntFile =  path.join(__dirname , "/../Gruntfile.js");
var packageFile = path.join(__dirname , "/../package.json");

// STRINGS
var cmdTmpl = strings.CMD.GRUNT;
var msgErr = messagesdk.notFound({"excerpt":strings.EXCERPT.REQUIRED_FILE, "file":workingdir, "path": __dirname });

// verificando si existe el archivo de configuracion
if (!fs.existsSync(workingdir) || !fs.existsSync(gruntFile)) {
   terminaldk.err( msgErr );
   return new Error(msgErr);
}

// Invocando GRUNT y pasandole los valores por argumento
var cmd = util.format(cmdTmpl, gruntFile, workingdir, process.cwd(), packageFile );
exec(cmd, {stdio:[0,1,2]});
