export default (a, b) => {
  const polarity = a < b ? -1 : 1;
  return a === b ? 0 : polarity;
};
