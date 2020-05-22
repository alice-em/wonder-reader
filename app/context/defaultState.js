export default {
  openedComic: {
    name: null,
    basename: '',
    tempdir: '',
    extname: '',
    origin: '',

    pending: 0,
    error: false,
    errorMessage: '',
    stat: '',
  },
  pages: [],
  encodedPages: [],

  // Page Data for Main => PageViewer => Page
  centerfolds: [],
  currentPageIndex: '',
  pageCount: 2,

  // Errors
  // error: false,
  errorMessage: '',

  // Material UI Drawer data
  isLibraryActive: false,
  // options: false,

  // Contents data for Library
  content: {
    contents: [],
    dirname: '',
    fullpath: null,
    id: 'libraryRoot',
    isDirectory: true,
  },

  // Zoom data for PageViewer
  zoomLevel: 100,

  // bool to display loading screen
  isLoading: false,

  // Image cache
  images: [],
};
