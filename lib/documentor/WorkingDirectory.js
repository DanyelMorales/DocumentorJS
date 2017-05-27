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

function WorkingDirectory(){

  var cwd = undefined;

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



module.exports = WorkingDirectory;
