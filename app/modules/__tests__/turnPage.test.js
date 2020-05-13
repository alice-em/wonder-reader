import turnPage from '../turnPage';

const generateTurnPageData = (newPageIndex, pagesToDisplay) => ({
  newPageIndex,
  pagesToDisplay,
});

describe('turnPage', () => {
  it('turns a page right', () => {
    const state = {
      currentPageIndex: 0,
      centerfolds: [],
      pageCount: 1,
      pages: [0, 1, 2, 3],
      polarity: 1,
    };
    expect(turnPage(state)).toEqual(generateTurnPageData(1, 1));
  });

  it('turns a page left', () => {
    const state = {
      currentPageIndex: 2,
      centerfolds: [],
      pageCount: 1,
      pages: [0, 1, 2, 3],
      polarity: -1,
    };
    expect(turnPage(state)).toEqual(generateTurnPageData(1, 1));
  });

  it('turns to the last page', () => {
    const state = {
      currentPageIndex: 3,
      centerfolds: [],
      pageCount: 1,
      pages: [0, 1, 2, 3],
      polarity: 1,
    };
    expect(turnPage(state)).toEqual(generateTurnPageData(3, 1));
  });

  it('turns to the first page', () => {
    const state = {
      currentPageIndex: 0,
      centerfolds: [],
      pageCount: 2,
      pages: [0, 1, 2, 3],
      polarity: -1,
    };
    expect(turnPage(state)).toEqual(generateTurnPageData(0, 2));
  });

  it('turns to the second page if first page is a centerfold', () => {
    const state = {
      currentPageIndex: 1,
      centerfolds: [0],
      pageCount: 2,
      pages: [0, 1, 2, 3],
      polarity: -1,
    };
    expect(turnPage(state)).toEqual(generateTurnPageData(0, 1));
  });

  describe('Complex Positive Polarity Conditionals', () => {
    const polarity = 1;
    it('renders on centerfolds', () => {
      const state = {
        currentPageIndex: 0,
        centerfolds: [0],
        pageCount: 2,
        pages: [0, 1, 2, 3],
        polarity,
      };
      expect(turnPage(state)).toEqual(generateTurnPageData(1, 2));
    });

    it('renders on relative upcoming centerfolds', () => {
      const state = {
        currentPageIndex: 0,
        centerfolds: [0, 1],
        pageCount: 2,
        pages: [0, 1, 2, 3],
        polarity,
      };
      expect(turnPage(state)).toEqual(generateTurnPageData(1, 1));
    });

    it('renders if the next page is a centerfold', () => {
      const state = {
        currentPageIndex: 0,
        centerfolds: [1],
        pageCount: 2,
        pages: [0, 1, 2, 3],
        polarity,
      };
      expect(turnPage(state)).toEqual(generateTurnPageData(1, 1));
    });

    it('anticipates if there is a centerfold 2 pages from currentPageIndex', () => {
      const state = {
        currentPageIndex: 0,
        centerfolds: [2],
        pageCount: 2,
        pages: [0, 1, 2, 3],
        polarity,
      };
      expect(turnPage(state)).toEqual(generateTurnPageData(2, 1));
    });

    it('renders complex equations if it fails other positive polarity patterns', () => {
      const state = {
        currentPageIndex: 0,
        centerfolds: [],
        pageCount: 2,
        pages: [0, 1, 2, 3],
        polarity,
      };
      expect(turnPage(state)).toEqual(generateTurnPageData(2, 2));
    });
  });

  describe('Complex Negative Polarity Conditionals', () => {
    const polarity = -1;
    it('anticipates a centerfold two pages back', () => {
      const state = {
        currentPageIndex: 2,
        centerfolds: [0],
        pageCount: 2,
        pages: [0, 1, 2, 3],
        polarity,
      };
      expect(turnPage(state)).toEqual(generateTurnPageData(1, 1));
    });

    it('Goes back two pages if it fails all other scenarios', () => {
      const state = {
        currentPageIndex: 2,
        centerfolds: [],
        pageCount: 2,
        pages: [0, 1, 2, 3],
        polarity,
      };
      expect(turnPage(state)).toEqual(generateTurnPageData(0, 2));
    });
  });
});
