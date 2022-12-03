import * as fs from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

const getAbsoluteFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(getAbsoluteFilePath(filePath), 'utf8');
const parseFileJson = (filePath) => JSON.parse(readFile(filePath));
const parseFileYaml = (filePath) => yaml.load(readFile(filePath));
const getFormat = (filePath) => path.extname(filePath);

const parsers = (filePath) => {
  const format = getFormat(filePath);
  if (format === '.json') {
    return parseFileJson(filePath);
  }
  if (format === '.yml' || format === '.yaml') {
    return parseFileYaml(filePath);
  }
  return new Error('Invalid data format!');
};
export default parsers;
