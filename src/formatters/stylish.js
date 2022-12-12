// const makeObjectToString = (level, currentKey, currentValue) => {
//   const indent = '  '.repeat(level);
//   return `${indent}${currentKey}: ${currentValue}`
// };
const stringify = (value, replacer = '  ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    console.log(currentValue);
    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${indent}${key}: ${iter(val, depth + 1)}`);
    console.log('lines', lines);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const stylish = (diff, depth) => {
  const replacer = '  ';
  const spacesCount = 1;
  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const result = diff.map(([key, val]) => {
    switch (val.type) {
      case 'nested':
        return `${indent}  ${key}: ${stylish(val.value, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${key}: ${stringify(val.value, '  ', depth + 1)}`;
      case 'added':
        return `${indent}+ ${key}: ${stringify(val.value, '  ', depth + 1)}`;
      case 'changed':
        return `${indent}- ${key}: ${stringify(val.value1, '  ', depth + 1)}\n${indent}+ ${key}: ${stringify(val.value2, '  ', depth + 1)}`;
      default:
        return `${indent}  ${key}: ${stringify(val.value, '  ', depth + 1)}`;
    }
  });
  console.log('resultStylish', result);
  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;
