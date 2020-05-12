const os = require('os');
const path = require('path');

const encodeUnix = (tempPath) => {
  let newPath = '';
  for (let j = 0; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  newPath = `/${newPath}`; // To set root folder
  newPath = newPath.replace(/'/g, "\\'"); // Fixes err with the character \'
  return newPath;
};

const encodeWin = (tempPath) => {
  let newPath = '';
  // Saves letter drive information
  const c = tempPath[0]; // eslint-disable-line
  for (let j = 1; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  newPath = path.join(c, newPath); // returns c:\path\to\file.cbz
  return newPath;
};

// Encodes each folder, then merging it all together
const encodePath = (filepath) => {
  const tempPath = filepath.split(path.sep);
  return os.platform === 'win32' ? encodeWin(tempPath) : encodeUnix(tempPath);
};

export { encodeUnix };
export default encodePath;
