const stringify = (value, replacer = '  ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    console.log('indentSize', indentSize);
    console.log('indent', '..', indent, '..');
    console.log('bracketIndent', '..', bracketIndent, '..');
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
  const currentIndent = ' '.repeat(depth);
  const result = diff.map(([key, val]) => {
    switch (val.type) {
      case 'nested':
        return `${currentIndent}  ${key}: ${stylish(val.value, '  ', depth + 1)}`;
      case 'deleted':
        return `${currentIndent}- ${key}: ${stringify(val.value, '  ', depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(val.value, '  ', depth + 1)}`;
      case 'changed':
        return `${currentIndent}- ${key}: ${stringify(val.value1, '  ', depth + 1)}\n${currentIndent}+ ${key}: ${stringify(val.value2, '  ', depth + 1)}`;
      default:
        return `${currentIndent}  ${key}: ${stringify(val.value, '  ', depth + 1)}`;
    }
  });
  console.log('resultStylish', result);
  return [
    '{',
    ...result,
  ].join('\n');
};

export default stylish;
