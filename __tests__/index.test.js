import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'node:fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  {
    value1: 'file1.json', value2: 'file2.json', format: undefined, expected: 'expectedData.txt',
  },
  {
    value1: 'file1.yaml', value2: 'file2.yaml', format: 'stylish', expected: 'expectedData.txt',
  },
  {
    value1: 'file1.json', value2: 'file2.json', format: 'plain', expected: 'expectedDataToPlain.txt',
  },
  {
    value1: 'file1.json', value2: 'file2.json', format: 'json', expected: 'expectedDataToJson.json',
  },
])('Check gendiff($value1, $value2, $format)', ({
  value1, value2, format, expected,
}) => {
  const data1 = getFixturePath(value1);
  const data2 = getFixturePath(value2);
  expect(gendiff(data1, data2, format)).toBe(readFile(expected));
});
