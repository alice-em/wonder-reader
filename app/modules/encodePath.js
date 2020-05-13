const os = require('os');
const path = require('path');

const generateEncodedPath = separatedPath =>
  path.join(...separatedPath.map(encodeURIComponent));

const encodeUnix = (filepath) => {
  const separatedPath = filepath.split(path.sep);
  const newPath = generateEncodedPath(separatedPath);
  return `/${newPath}`.replace(/'/g, "\\'"); // To set root folder && Fixes err with the character \'
};

const encodeWin = (filepath) => {
  const separatedPath = filepath.split(path.sep);
  const driveLetter = separatedPath.shift();
  const newPath = generateEncodedPath(separatedPath);
  // Saves letter drive information
  return path.join(driveLetter, newPath); // returns c:\path\to\file.cbz
};

// Encodes each folder, then merging it all together
const encodePath = filepath =>
  os.platform === 'win32' ? encodeWin(filepath) : encodeUnix(filepath);

export { encodeUnix, encodeWin };
export default encodePath;
