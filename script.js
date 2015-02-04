#! /usr/bin/env node
// -*- js -*-
'use strict';

var lowerCaser    = require('./lib/lowercase-references-to-web-assets.js');
var args          = process.argv.slice(2);
var directoryName = args[0];

lowerCaser(__dirname + '/' + directoryName);