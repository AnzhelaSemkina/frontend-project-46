const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    // console.log(1, currentValue);
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    if (typeof currentValue !== 'object' || currentValue === null) {
      console.log(2, 'return', currentValue);
      return `${currentValue}`;
    }
    const lines = currentValue
      .map((val) => {
        console.log(3, val, `${indent}${val.key}: ${iter(val.value, depth + 1)}`);
        return `${indent}${val.key}: ${iter(val.value, depth + 1)}`;
      });
    console.log(4, lines);
    console.log(5, currentValue);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default (diff, depth = 2, replacer = ' ', spacesCount = 1) => {
  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);

  const result = diff.flatMap((val) => {
    console.log(6, val);
    switch (val.type) {
      case 'nested':
        return `${indent}  ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'deleted':
        return `${indent}- ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'added':
        return `${indent}+ ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'changed':
        return `${indent}- ${val.key}: ${stringify(val.value1, ' ', depth + 1)}\n${indent}+ ${val.key}: ${stringify(val.value2, ' ', depth + 1)}`;
      default:
        throw new Error(`Invalid data: ${val.type}, ${val.key}: ${JSON.stringify(val.value)}`);
    }
  });
  console.log(7, result);
  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};
