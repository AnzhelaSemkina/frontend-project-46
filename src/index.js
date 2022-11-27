import * as fs from 'node:fs';
import path from 'path';
import _ from 'lodash';

const getAbsoluteFilePath = (filePath) => path.resolve(filePath);
const readFile = (filePath) => fs.readFileSync(getAbsoluteFilePath(filePath), 'utf8');
const parseFile = (filePath) => JSON.parse(readFile(filePath));
const getFormat = (filePath) => {
  const name = filePath.split('/').at(-1);
  const format = name.split('.').at(-1);
  return format;
};

const gendiff = (filePath1, filePath2) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const format = getFormat(filePath1);
  console.log(format);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const result = keys.sort()
    .flatMap((key) => {
      const res = [];
      if (!Object.hasOwn(data1, key)) {
        res.push(`+ ${key}: ${data2[key]}\n`);
      } else if (!Object.hasOwn(data2, key)) {
        res.push(`- ${key}: ${data1[key]}\n`);
      } else if (data1[key] !== data2[key]) {
        res.push(`- ${key}: ${data1[key]}\n`);
        res.push(`+ ${key}: ${data2[key]}\n`);
      } else {
        res.push(`  ${key}: ${data2[key]}\n`);
      }
      return res;
    });
  const res = `{
  ${result}}`;
  return res.replace(/[",]/g, '  ');
};
export default gendiff;
