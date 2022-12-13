const stringify = (value, depth) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);

  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff, depth) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize - 1);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);

  const result = diff.map(([key, val]) => {
    switch (val.type) {
      case 'nested':
        return `${indent}  ${key}: ${stylish(val.value, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${key}: ${stringify(val.value, depth + 1)}`;
      case 'added':
        return `${indent}+ ${key}: ${stringify(val.value, depth + 1)}`;
      case 'changed':
        return `${indent}- ${key}: ${stringify(val.value1, depth + 1)}\n${indent}+ ${key}: ${stringify(val.value2, depth + 1)}`;
      default:
        return `${indent}  ${key}: ${stringify(val.value, depth + 1)}`;
    }
  });
  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};

export default stylish;
