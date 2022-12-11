const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

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
  const result = diff.map((val) => {
    console.log('resultValue', val);
    switch (val.type) {
      case 'nested':
        return `\n  ${val.key}: ${stylish(val.value)}`;
      case 'deleted':
        return `\n- ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'added':
        return `\n+ ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'changed':
        return `\n- ${val.key}: ${stringify(val.value1, ' ', depth + 1)}\n+ ${val.key}: ${stringify(val.value2, ' ', depth + 1)}`;
      default:
        return `\n  ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
    }
  });
  console.log('resultStylish', result);
  return `{${result}\n}`;
};

export default stylish;
