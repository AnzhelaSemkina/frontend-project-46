const objectToString = (value, currentDepth, replacer = ' ', spacesCount = 1) => {
  const indentSize = currentDepth * spacesCount;
  const indent = replacer.repeat(indentSize);

  return `${indent}${value}`;
};

const stringify = (value) => {
  const iter = (currentValue, depth) => {
    console.log('currenValue:', currentValue);

    if (typeof currentValue !== 'object' || currentValue === null) {
      console.log('return', currentValue);
      return `${currentValue}`;
    }

    const lines = [currentValue]
      .map((val) => objectToString(`${val.key}: ${iter(val.value, depth + 1)}`));
    console.log(4, lines);
    console.log(5, currentValue);
    return [
      '{',
      ...lines,
    ].join('\n');
  };

  return iter(value, 1);
};

const stylish = (diff, depth) => {
  // const bracketIndent = replacer.repeat(indentSize - spacesCount);

  const result = diff.flatMap((val) => {
    console.log('resultValue', val);
    switch (val.type) {
      case 'nested':
        return `  ${val.key}: ${stylish(val.value, ' ', depth + 1)}`;
      case 'deleted':
        return `- ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'added':
        return `+ ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
      case 'changed':
        return `- ${val.key}: ${stringify(val.value1, ' ', depth + 1)}\n+ ${val.key}: ${stringify(val.value2, ' ', depth + 1)}`;
      default:
        return `  ${val.key}: ${stringify(val.value, ' ', depth + 1)}`;
    }
  });
  console.log(7, result);
  return result.join('\n');
};

export default stylish;
