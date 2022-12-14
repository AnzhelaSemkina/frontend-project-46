const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const getResult = (currentValue, path = '') => {
    const result = currentValue
      .filter(([, val]) => val.type !== 'unchanged')
      .map(([key, val]) => {
        switch (val.type) {
          case 'nested':
            return getResult(val.value, `${path}${key}.`);
          case 'deleted':
            return `Property '${path}${key}' was removed`;
          case 'added':
            return `Property '${path}${key}' was added with value: ${stringify(val.value)}`;
          case 'changed':
            return `Property '${path}${key}' was updated. From ${stringify(val.value1)} to ${stringify(val.value2)}`;
          default:
            throw new Error(`Invalid type: ${val.type}`);
        }
      });
    return result.join('\n');
  };
  return getResult(diff);
};
export default plain;
