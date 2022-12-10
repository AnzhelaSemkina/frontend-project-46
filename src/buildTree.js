import _ from 'lodash';

const diff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  const result = keys.sort()
    .map((key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return [key, { type: 'nested', value: diff(data1[key], data2[key]) }];
      }
      if (!Object.hasOwn(data1, key)) {
        return [key, { type: 'added', value: data2[key] }];
      }
      if (!Object.hasOwn(data2, key)) {
        return [key, { type: 'deleted', value: data1[key] }];
      }
      if (data1[key] !== data2[key]) {
        return [
          key, { type: 'changed', value1: data1[key], value2: data2[key] }];
      }
      return [key, { type: 'unchanged', value: data2[key] }];
    });
  console.log('diff', result);
  return result;
};

export default diff;
