const os = require('os');
const path = require('path');

const encodeUnix = (filepath) => {
  const tempPath = filepath.split(path.sep);

  let newPath = '';
  for (let j = 0; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  return `/${newPath}`.replace(/'/g, "\\'"); // To set root folder && Fixes err with the character \'
};

const encodeWin = (filepath) => {
  const tempPath = filepath.split(path.sep);

  let newPath = '';
  // Saves letter drive information
  const driveLetter = tempPath[0];
  for (let j = 1; j < tempPath.length; j += 1) {
    newPath = path.join(newPath, encodeURIComponent(tempPath[j]));
  }
  return path.join(driveLetter, newPath); // returns c:\path\to\file.cbz
};

// Encodes each folder, then merging it all together
const encodePath = filepath =>
  os.platform === 'win32' ? encodeWin(filepath) : encodeUnix(filepath);

export { encodeUnix, encodeWin };
export default encodePath;
