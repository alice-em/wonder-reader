// strain.js cleans out the dirty files, like .DS_Store
const path = require('path');

const polaritySort = require('./polaritySort');

const comicTypes = ['.cbr', '.cbz'];
const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];

const isSomething = types => (filename) => {
  const extname = path.extname(filename).toLowerCase();
  return types.includes(extname);
};

const isComic = isSomething(comicTypes);
const isImage = isSomething(imageTypes);

// Array Functions
const sortArrayByAlpha = ARRAY => [...ARRAY].sort(polaritySort);

// Cleans out non image files from ARRAY
const strainer = fileTypes => files =>
  sortArrayByAlpha(files.filter(isSomething(fileTypes)));

const strainComics = strainer(comicTypes);
const strainImages = strainer(imageTypes);

export {
  comicTypes,
  imageTypes,
  isComic,
  isImage,
  sortArrayByAlpha,
  strainComics,
  strainImages,
};
