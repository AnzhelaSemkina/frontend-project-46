export default (diff) => {
  const result = `  ${diff}`.replace(/[",]/g, '  ');
  return result;
};
