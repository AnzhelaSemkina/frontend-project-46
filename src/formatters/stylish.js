const stringify = (value, depth) => {
  const replacer = ' ';
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);

  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`, depth + 2);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff, depth) => {
  const result = diff.map(([key, val]) => {
    switch (val.type) {
      case 'nested':
        return `  ${key}: ${stylish(val.value, depth + 2)}`;
      case 'deleted':
        return `- ${key}: ${stringify(val.value, depth + 1)}`;
      case 'added':
        return `+ ${key}: ${stringify(val.value, depth + 1)}`;
      case 'changed':
        return `- ${key}: ${stringify(val.value1, depth + 1)}\n+ ${key}: ${stringify(val.value2, depth + 1)}`;
      default:
        return `  ${key}: ${stringify(val.value, depth + 1)}`;
    }
  });
  return stringify([...result]);
};

export default stylish;
