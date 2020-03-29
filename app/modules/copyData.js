const copyArray = array => [].slice.call(array);

const copyDeepObject = obj => JSON.parse(JSON.stringify(obj));

export { copyArray, copyDeepObject };
