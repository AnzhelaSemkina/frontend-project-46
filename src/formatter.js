import stylish from './formatters/stylish.js';

export default (diff, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(diff, 1);
  }
  return new Error('Invalid format!');
};
