const getIndent = (depth, correctSize = 0) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize - correctSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  return { indent, bracketIndent };
};

const stringify = (value, depth) => {
  const indents = getIndent(depth);

  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }

  const lines = Object.entries(value)
    .map(([key, val]) => `${indents.indent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${indents.bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff, depth) => {
  const indents = getIndent(depth, 1);

  const result = diff.map(([key, val]) => {
    switch (val.type) {
      case 'nested':
        return `${indents.indent}  ${key}: ${stylish(val.value, depth + 1)}`;
      case 'deleted':
        return `${indents.indent}- ${key}: ${stringify(val.value, depth + 1)}`;
      case 'added':
        return `${indents.indent}+ ${key}: ${stringify(val.value, depth + 1)}`;
      case 'changed':
        return `${indents.indent}- ${key}: ${stringify(val.value1, depth + 1)}\n${indents.indent}+ ${key}: ${stringify(val.value2, depth + 1)}`;
      default:
        return `${indents.indent}  ${key}: ${stringify(val.value, depth + 1)}`;
    }
  });

  return [
    '{',
    ...result,
    `${indents.bracketIndent}}`,
  ].join('\n');
};

export default stylish;
