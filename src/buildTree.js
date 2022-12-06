import _ from 'lodash';

const diff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const result = keys.sort()
    .flatMap((key) => {
      const res = [];
      if (!Object.hasOwn(data1, key)) {
        res[key] = 'added';
      } else if (!Object.hasOwn(data2, key)) {
        res[key] = 'deleted';
      } else if (data1[key] !== data2[key]) {
        res[key] = 'changed';
      } else {
        res[key] = 'unchanged';
      }
      return res;
    });

  return result;
};

export default diff;
