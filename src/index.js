import parsers from './parsers.js';
import diff from './buildTree.js';
import formatter from './formatter.js';

const gendiff = (filePath1, filePath2, formatType = 'stylish') => {
  const data1 = parsers(filePath1);
  const data2 = parsers(filePath2);
  return formatter(diff(data1, data2), formatType);
};

export default gendiff;
