const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    console.log(currentValue);
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const fg = currentValue.flat();
    console.log(fg);
    const lines = fg.map((key) => {
      console.log(key.type, key.key, key.value);
      switch (key.type) {
        case 'nested':
          return `${currentIndent}  ${key.key}: ${iter(key.value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${key.key}: ${iter(key.value, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key.key}: ${iter(key.value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key.key}: ${iter(key.value, depth + 1)}`;
        case 'changed':
          return `${currentIndent}- ${key.key}: ${iter(key.value1, depth + 1)}\n${currentIndent}+ ${key.key}: ${iter(key.value2, depth + 1)}`;
        default:
          throw new Error(`Invalid data: ${key.type}, ${key.key}: ${JSON.stringify(key.value)}`);
      }
    });
    console.log(lines);
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
    return result;
  };
  return iter(value, 1);
};

export default (diff) => {
  const result = stringify(diff);
  return result;
};
