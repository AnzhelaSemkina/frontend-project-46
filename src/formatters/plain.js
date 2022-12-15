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
      .filter(({ type }) => type !== 'unchanged')
      .map((node) => {
        const { key, type, value } = node;
        const currentPath = `${path}${key}`;
        switch (type) {
          case 'nested':
            return getResult(node.children, `${currentPath}.`);
          case 'deleted':
            return `Property '${currentPath}' was removed`;
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(value)}`;
          case 'changed':
            return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
          default:
            throw new Error(`Invalid type: ${type}`);
        }
      });
    return result.join('\n');
  };
  return getResult(diff);
};
export default plain;
