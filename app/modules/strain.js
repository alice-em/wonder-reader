// strain.js cleans out the dirty files, like .DS_Store
const path = require('path');

const polaritySort = require('./polaritySort');
const { copyArray } = require('../modules/copyData');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

// Determiner Functions
const isSomething = types => filename =>
  types.includes(path.extname(filename).toLowerCase());

const isComic = isSomething(comicTypes);
const isImage = isSomething(imageTypes);

// Array Functions
const isFileAFileType = fileTypes => file =>
  fileTypes.includes(path.extname(file));
const sortArrayByAlpha = ARRAY => copyArray(ARRAY).sort(polaritySort);

// Cleans out non image files from ARRAY
const strainer = fileTypes => files =>
  files.filter(isFileAFileType(fileTypes)).sort(polaritySort);

const strainComics = strainer(comicTypes);
const strainOnlyComics = strainer(comicTypes);
const strainImages = strainer(imageTypes);

export {
  comicTypes,
  imageTypes,
  isComic,
  isImage,
  sortArrayByAlpha,
  strainComics,
  strainOnlyComics,
  strainImages,
};
