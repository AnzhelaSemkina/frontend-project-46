import _ from 'lodash';
import parser from './parsers.js';

const gendiff = (filePath1, filePath2) => {
  const data1 = parser(filePath1);
  const data2 = parser(filePath2);

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
