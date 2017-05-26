/**
* APIDOCJS AUTO DOCUMENTOR.
* ----------------------------------------------
* This Grunt Module helps to document resources automagically.
* Add a New Grunt Watch and Grunt Exec for each DocGroup,
* to add the config vals add to configGroup the required inputs.
* ----------------------------------------------
* @author Daniel Vera <dvera at sunset.com.mx>
*
* ANSI codes for debug messages
* @see https://telepathy.freedesktop.org/doc/telepathy-glib/telepathy-glib-debug-ansi.html
*/

var tcolors = {
  TP_ANSI_FG_RED     : "\x1b[31m",
  TP_ANSI_FG_BLACK   : "\x1b[30m",
  TP_ANSI_RESET      : "\x1b[0m",
  TP_ANSI_BOLD_ON    : "\x1b[1m",
  TP_ANSI_INVERSE_ON : "\x1b[7m",
  TP_ANSI_BOLD_OFF   : "\x1b[22m",
  TP_ANSI_FG_BLACK   : "\x1b[30m",
  TP_ANSI_FG_RED     : "\x1b[31m",
  TP_ANSI_FG_GREEN   : "\x1b[32m",
  TP_ANSI_FG_YELLOW  : "\x1b[33m",
  TP_ANSI_FG_BLUE    : "\x1b[34m",
  TP_ANSI_FG_MAGENTA : "\x1b[35m",
  TP_ANSI_FG_CYAN    : "\x1b[36m",
  TP_ANSI_FG_WHITE   : "\x1b[37m",
  TP_ANSI_BG_RED     : "\x1b[41m",
  TP_ANSI_BG_GREEN   : "\x1b[42m",
  TP_ANSI_BG_YELLOW  : "\x1b[43m",
  TP_ANSI_BG_BLUE    : "\x1b[44m",
  TP_ANSI_BG_MAGENTA : "\x1b[45m",
  TP_ANSI_BG_CYAN    : "\x1b[46m",
  TP_ANSI_BG_WHITE   : "\x1b[47m"
};

function DKTerminal(){

  this.log = function(color, msg)
  {
      console.log(color, msg , tcolors.TP_ANSI_RESET);
  };

  this.err = function(msg){
      console.log(tcolors.TP_ANSI_BG_RED, msg, tcolors.TP_ANSI_RESET);
  };

  this.warn = function(msg){
      console.log(tcolors.TP_ANSI_BG_YELLOW, msg, tcolors.TP_ANSI_RESET);
  };

  this.success = function(msg){
      console.log(tcolors.TP_ANSI_FG_CYAN, msg, tcolors.TP_ANSI_RESET);
  };
};

module.exports = {
  colors: tcolors,
  terminal: new DKTerminal()
};
