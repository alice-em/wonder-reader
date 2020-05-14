import {
  isComic,
  isImage,
  sortArrayByAlpha,
  strainComics,
  strainImages,
} from '../strain';

describe('strain.js', () => {
  it('isComic', () => {
    const testFilenames = {
      cbr: 'test.cbr',
      cbz: 'test.cbz',
      pdf: 'test.pdf',
    };
    expect(isComic(testFilenames.cbr)).toBe(true);
    expect(isComic(testFilenames.cbz)).toBe(true);
    expect(isComic(testFilenames.pdf)).toBe(false);
  });

  it('isImage', () => {
    const testFilenames = {
      bmp: 'test.bmp',
      doc: 'test.doc',
      gif: 'test.gif',
      jpeg: 'test.jpeg',
      jpg: 'test.jpg',
      png: 'test.png',
      webp: 'test.webp',
    };

    expect(isImage(testFilenames.bmp)).toBe(true);
    expect(isImage(testFilenames.doc)).toBe(false);
    expect(isImage(testFilenames.gif)).toBe(true);
    expect(isImage(testFilenames.jpeg)).toBe(true);
    expect(isImage(testFilenames.jpg)).toBe(true);
    expect(isImage(testFilenames.png)).toBe(true);
    expect(isImage(testFilenames.webp)).toBe(true);
  });

  it('sortArrayByAlpha', () => {
    const expected = ['abc01.png', 'abc03.png', 'abc05.png', 'abc3.png'];
    const testArray = ['abc01.png', 'abc05.png', 'abc03.png', 'abc3.png'];

    expect(sortArrayByAlpha(testArray)).toEqual(expected);
  });

  it('strainComics', () => {
    const expected = ['abc.cbz', 'other.cbz', 'sample.cbr'];
    const testFiles = ['abc.cbz', 'sample.cbr', 'document.pdf', 'other.cbz'];

    expect(strainComics(testFiles)).toEqual(expected);
  });

  it('strainImages', () => {
    const expected = ['abc.bmp', 'document.jpg', 'sample.png'];
    const testFiles = ['abc.bmp', 'sample.png', 'document.jpg', 'other.cbz'];

    expect(strainImages(testFiles)).toEqual(expected);
  });
});
