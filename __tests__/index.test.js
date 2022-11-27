import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'node:fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const expectedData = readFile('expectedFile.txt');
  const actualData = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actualData).toEqual(expectedData);
});

test('yaml', () => {
  const expectedData = readFile('expectedFile.txt');
  const actualData = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(actualData).toEqual(expectedData);
});
