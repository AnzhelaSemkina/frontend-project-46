import * as fs from 'node:fs';
import path from 'path';
import parsers from './parsers.js';
import diff from './buildTree.js';
import formatter from './formatters/index.js';

const getAbsoluteFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFormat = (filePath) => path.extname(filePath);

const gendiff = (filePath1, filePath2, formatType = 'stylish') => {
  const data1 = readFile(getAbsoluteFilePath(filePath1));
  const data2 = readFile(getAbsoluteFilePath(filePath2));

  const dataParse1 = parsers(data1, getFormat(filePath1));
  const dataParse2 = parsers(data2, getFormat(filePath2));

  return formatter(diff(dataParse1, dataParse2), formatType);
};

export default gendiff;
