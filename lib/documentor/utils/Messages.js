/**
* APIDOCJS AUTO DOCUMENTOR.
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup,
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <dvera at sunset.com.mx>

*/
var util = require('util');

function DKFormat(){

  var MESSAGES = {
    NOT_FOUND: "Not found {{file}} in {{path}} : {{excerpt}}"
  };

  this.setMessages = function(messages){
       MESSAGES = messages;
  };

  this.replaceTagg = function(str, group)
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

  this.notFound = function(ph){
      return this.format(ph, MESSAGES.NOT_FOUND);
  };

  this.format = function(ph, template){
      return this.replaceTagg(template, ph);
  };

};

module.exports = {
  format: new DKFormat()
};
