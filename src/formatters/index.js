import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, format = 'stylish') => {
  if (format === 'plain') {
    return plain(diff);
  }
  if (format === 'stylish') {
    return stylish(diff, 1);
  }
  throw new Error('Invalid format!');
};
