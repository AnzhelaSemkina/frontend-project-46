import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff, 1);
    default:
      throw new Error('Invalid format!');
  }
};
