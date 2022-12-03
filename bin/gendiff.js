#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format(stylish, plain, json)', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(gendiff(file1, file2, program.opts().format));
  });

program.parse();
