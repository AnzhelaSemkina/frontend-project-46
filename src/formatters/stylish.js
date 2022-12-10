const objectToString = (value, currentDepth, replacer = ' ', spacesCount = 1) => {
  const indentSize = currentDepth * spacesCount;
  const indent = replacer.repeat(indentSize);

  return `${indent}${value}`;
};

const stringify = (value) => {
  const iter = (currentValue, depth) => {
    console.log('currentValue:', currentValue);

    if (typeof currentValue !== 'object' || currentValue === null) {
      console.log('return', currentValue);
      return `${currentValue}`;
    }

    const lines = [currentValue]
      .map((key) => objectToString(`${key[0]}: ${iter(key[1])}`, depth, '  ', 1));
    return lines;
  };

  return iter(value, 1);
};

const stylish = (diff, depth) => {
  // const bracketIndent = replacer.repeat(indentSize - spacesCount);

  const result = diff.flatMap(([key, val]) => {
    console.log('resultValue', [key, val]);
    switch (val.type) {
      case 'nested':
        return `  ${key}: ${stylish(val.value, ' ', depth + 1)}`;
      case 'deleted':
        return `- ${key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'added':
        return `+ ${key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'changed':
        return `- ${key}: ${stringify(val.value1, ' ', depth + 1)}\n+ ${key}: ${stringify(val.value2, ' ', depth + 1)}`;
      default:
        return `  ${key}: ${stringify(val.value, ' ', depth + 1)}`;
    }
  });
  console.log(7, result);
  return [
    '{',
    ...result,
    '}',
  ].join('\n');
};

export default stylish;
