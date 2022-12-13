const replacer = ' ';
const spacesCount = 2;

const makeObjectToString = (currentValue, level) => {
  const indentSize = level * spacesCount;
  const indent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  if (typeof currentValue === 'object') {
    return [
      '{',
      ...currentValue,
      `${bracketIndent}}`,
    ].join('\n');
  }
  return `${indent}${currentValue}`;
};

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }

  const lines = Object.entries(value)
    .map(([key, val]) => makeObjectToString(`${key}: ${stringify(val, depth + 1)}`, depth + 2));
  console.log('lines', lines);
  return makeObjectToString(lines, depth + 1);
};

const stylish = (diff, depth) => {
  const result = diff.map(([key, val]) => {
    switch (val.type) {
      case 'nested':
        return makeObjectToString(`${key}: ${stylish(val.value, depth + 2)}`, depth + 1);
      case 'deleted':
        return makeObjectToString(`- ${key}: ${stringify(val.value, depth + 1)}`, depth);
      case 'added':
        return makeObjectToString(`+ ${key}: ${stringify(val.value, depth + 1)}`, depth);
      case 'changed':
        return `${makeObjectToString(`- ${key}: ${stringify(val.value1, depth + 1)}`, depth)}\n${makeObjectToString(`+ ${key}: ${stringify(val.value2, depth + 1)}`, depth)}`;
      default:
        return makeObjectToString(`  ${key}: ${stringify(val.value, depth + 1)}`, depth);
    }
  });
  console.log('resultStylish', result);
  return makeObjectToString(result, depth);
};

export default stylish;
