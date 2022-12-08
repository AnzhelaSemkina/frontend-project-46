const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    console.log(1, currentValue);
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }

    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = currentValue
      .flat()
      .map((val) => {
        console.log(2, val);
        return `${indent}${val.key}: ${iter(val.value, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  console.log(3, value);
  return iter(value, 1);
};

export default (diff, indent, depth) => {
  const result = diff.flatMap((value) => {
    switch (value.type) {
      case 'nested':
        return `${indent}  ${value.key}: ${stringify(value.value, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${value.key}: ${stringify(value.value, depth + 1)}`;
      case 'added':
        return `${indent}+ ${value.key}: ${stringify(value.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${value.key}: ${stringify(value.value, depth + 1)}`;
      case 'changed':
        return `${indent}- ${value.key}: ${stringify(value.value1, depth + 1)}\n${indent}+ ${value.key}: ${stringify(value.value2, depth + 1)}`;
      default:
        throw new Error(`Invalid data: ${value.type}, ${value.key}: ${JSON.stringify(value.value)}`);
    }
  });
  console.log(result);
  return result;
};
