#!/usr/bin/env node

var grunt = require('grunt');
grunt.tasks(['watch']);
grunt.cli({
  gruntfile: __dirname + "/../Gruntfile.js",
});