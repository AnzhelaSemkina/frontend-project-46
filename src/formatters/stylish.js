const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const entries = Object.entries(currentValue);
    const lines = entries.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
    return result;
  };
  return iter(value, 1);
};

export default (diff) => {
  const result = stringify(diff);
  // `  ${diff}`.replace(/[",]/g, '  ');
  return result;
};
