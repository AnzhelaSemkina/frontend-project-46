const stringify = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `${value}`;
  }
  return value;
};

const plain = (diff) => {
  console.log(1, diff);
  const getResult = (currentValue, path = '') => {
    console.log(3, currentValue.filter((tree) => tree[1].type !== 'unchanged'));
    const result = currentValue
      .filter((tree) => tree[1].type !== 'unchanged')
      .map(([key, val]) => {
        console.log(2, key, val);
        switch (val.type) {
          case 'nested':
            return getResult(val.value, `${path}${key}`);
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
    console.log(result);
    return result.join('\n');
  };
  return getResult(diff);
};
export default plain;
