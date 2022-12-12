const stringify = (value, replacer = ' ', spacesCount = 1) => {
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
  const result = diff.map(([key, val]) => {
    switch (val.type) {
      case 'nested':
        return `\n  ${key}: ${stylish(val.value, ' ', depth + 2)}`;
      case 'deleted':
        return `\n- ${key}: ${stringify(val.value, ' ', depth + 2)}`;
      case 'added':
        return `\n+ ${key}: ${stringify(val.value, ' ', depth + 2)}`;
      case 'changed':
        return `\n- ${key}: ${stringify(val.value1, ' ', depth + 2)}\n+ ${key}: ${stringify(val.value2, ' ', depth + 2)}`;
      default:
        return `\n  ${key}: ${stringify(val.value, ' ', depth + 2)}`;
    }
  });
  console.log('resultStylish', result);
  return `{${result}\n}`;
};

export default stylish;
