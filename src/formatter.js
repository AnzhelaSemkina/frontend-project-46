import stylish from './formatters/stylish.js';

export default (diff, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(diff);
  }
  return new Error('Invalid format!');
};
