import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'node:fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const expectedData = readFile('expectedData.txt');
  const actualData = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actualData).toEqual(expectedData);
});

test('yaml', () => {
  const expectedData = readFile('expectedData.txt');
  const actualData = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(actualData).toEqual(expectedData);
});

test('jsonNested', () => {
  const expectedData = readFile('expectedData2.txt');
  const actualData = gendiff(getFixturePath('file3.json'), getFixturePath('file4.json'));
  expect(actualData).toEqual(expectedData);
});

test('yamlNested', () => {
  const expectedData = readFile('expectedData2.txt');
  const actualData = gendiff(getFixturePath('file3.yaml'), getFixturePath('file4.yaml'));
  expect(actualData).toEqual(expectedData);
});

test('plain', () => {
  const expectedData = readFile('expectedDataToPlain.txt');
  const actualData = gendiff(getFixturePath('file3.json'), getFixturePath('file4.json'), 'plain');
  expect(actualData).toEqual(expectedData);
});
