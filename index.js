#!/usr/bin/env node
var VALID_GENERATORS = ['mongoose'];

var fs        = require('fs'),
    dbSchema  = require('dbschema-parser'),
    _         = dbSchema._,
    path      = require('path'),
    pkg       = require('./package.json'),
    program   = require('commander');

program
  .version(pkg.version)
  .option('-d, --database [value]', 'Selected database (default: all)')
  .option('-e, --enhance', 'Use enhanced output (if available) (default: false)')
  .option('-f, --format [value]', 'Output format (default: mongoose)')
  .option('-i, --input <path>', 'DbSchema file.')
  .option('-o, --output <path>', 'Output folder path (default: %current%/%datetime%)')
  .option('-r, --reduce', 'Reduce output path for single objects (default: false)')
  .option('-s, --schema [value]', 'Selected schema (default: all)')
  .option('-I, --index', 'Include index files (default: false)')
  .option('-O, --overwrite', 'Overwrite existing file (default: false)')
  .parse(process.argv);

program.format = _.strings.ifValid(program.format, 'mongoose');
var generator = getGenerator(program.format);
if (typeof generator === 'string') {
  console.log(generator);
  process.exit(1);
} else if (!generator) {
  console.log('Generator %s not installed.', program.format);
  process.exit(1);
}

if (!_.strings.isValid(program.input)) {
  console.log('Input path is required.');
  process.exit(1);
} else if (!_.files.exists(program.input)) {
  console.log('Invalid input path supplied.');
  process.exit(1);
}

var parser;
try {
  parser = new dbSchema.Parser(program.input);
} catch (ex) {
  console.log('Input file could not be parsed.');
  process.exit(1);
}

if (!parser || !parser.json || !parser.object) {
  console.log('Invalid input file supplied: %s', program.input);
  process.exit(1);
} else if (parser.databases.length < 1) {
  console.log('No databases in input file: %s', program.input);
  process.exit(1);
}

program.output = program.output || (path.join(__dirname, 'generated', _.dates.blockdate()));
if (['undefined', 'string'].indexOf(typeof program.output) < 0) {
  console.log('Invalid output path supplied.');
  process.exit(1);
} else if (_.strings.isValid(program.output) && !_.folders.create(program.output)) {
  console.log('Output folder could not be created.');
  process.exit(1);
}

var worker = new generator.Worker(parser, program);
worker.save();

// -----------------------------------------------------------------------------

function getGenerator(name){
  switch(name.toLowerCase()) {
    case 'mongoose':
      return require('dbschema-mongoose');
    default:
      return 'Unknown generator: ' + name;
  }
}
