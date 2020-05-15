import fs from 'fs';
import path from 'path';
import React, { Component } from 'react';
import sizeOf from 'image-size';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import encodePath from '../modules/encodePath';
import File from '../modules/File';
import Header from './Header';
import Library from './Library';
import Loading from './Loading';
import PageViewer from './PageViewer';
import theme from './theme';
import turnPage from '../modules/turnPage';
import { generateCenterfolds } from '../modules/generate';
import { strainComics } from '../modules/strain';

export default class App extends Component {
  state = {
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
    top: false,
    // options: false,

    // Contents data for Library
    content: {},

    // Zoom data for PageViewer
    zoomLevel: 100,

    // bool to display loading screen
    isLoading: false,

    // Image cache
    images: [], // eslint-disable-line react/no-unused-state
  };

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      const { openedComic } = this.state;

      const isComicActive = openedComic.name !== null;
      const isActiveElemInput = document.activeElement.tagName === 'input';

      const shouldTurn = isComicActive && !isActiveElemInput;

      if (shouldTurn) {
        this.arrowKeyTurnPage(e.code);
      }
    });
  }

  arrowKeyTurnPage = (code) => {
    if (code === 'ArrowRight') {
      this.turnPageRight();
    } else if (code === 'ArrowLeft') {
      this.turnPageLeft();
    }
  };

  changePageCount = () => {
    const { pageCount } = this.state;
    const newPageCount = pageCount === 2 ? 1 : 2;
    this.setState({ pageCount: newPageCount }, () => {
      this.postChangePageCount();
    });
  };

  closeLibrary = () => {
    this.toggleDrawer('top', false);
  };

  determineAvailableAdjComic = (err, files, polarity) => {
    const { openedComic } = this.state;
    const originDirname = path.dirname(openedComic.origin);
    const strainedComics = strainComics(files);
    const index = strainedComics.indexOf(openedComic.name);
    const newIndex = index + polarity;
    if (newIndex > -1 && newIndex < strainedComics.length) {
      const newComicName = strainedComics[newIndex];
      const newComicFilepath = path.join(originDirname, newComicName);
      this.openComic(newComicFilepath);
    }
  };

  determinePages = () => {
    this.loadImages();
    const pagesToDisplay = this.determinePagesToDisplay();
    this.setCurrentPages(0, pagesToDisplay);
  };

  determinePagesToDisplay = () => {
    const { pageCount } = this.state;
    return this.isCenterfoldsComing(0) || pageCount === 1 ? 1 : 2;
  };

  generatePages = (tempdir, cb) => {
    fs.readdir(tempdir, (err, files) => {
      const pages = this.mapPages(files, tempdir);
      cb(pages);
    });
  };

  generateEncodedPages = (newPageIndex, pagesToDisplay) => {
    const { openedComic, pageCount, pages } = this.state;

    const encodedPages = [];
    const pagesToRender = Math.min(pageCount, pagesToDisplay);
    for (let i = 0; i < pagesToRender; i += 1) {
      const key = newPageIndex + i;
      if (key < pages.length) {
        // Stops from trying to read beyond comic page length
        const temp = openedComic.tempdir;
        const pageKey = openedComic.pages[key];
        const pagePath = path.join(temp, pageKey);
        const page = encodePath(pagePath);
        const { width, height } = sizeOf(pagePath);
        const ratio =
          key === newPageIndex ? 1 : encodedPages[0].height / height;

        encodedPages[i] = {
          page,
          key,
          width: width * ratio,
          height: height * ratio,
        };
      }
    }
    return encodedPages;
  };

  isCenterfold = (index) => {
    const { centerfolds } = this.state;
    return centerfolds.includes(index);
  };

  isCenterfoldsComing = () => {
    const { currentPageIndex } = this.state;
    return (
      this.isCenterfold(currentPageIndex) ||
      this.isCenterfold(currentPageIndex + 1)
    );
  };
  loadImages = () => {
    const { pages } = this.state;
    const images = pages.map((page) => {
      const img = new Image();
      img.src = page.encodedPagePath;
      return img;
    });
    this.setState({ images }); // eslint-disable-line react/no-unused-state
  };

  mapPages = (files, tempdir) =>
    files.map((file, key) => {
      const pagePath = path.join(tempdir, file);

      return {
        encodedPagePath: encodePath(pagePath),
        key,
        pagePath,
      };
    });

  openComic = (fullpath) => {
    const Comic = new File(fullpath);
    const isLoading = true;
    this.setState({ isLoading }, () => {
      Comic.extract((comic) => {
        this.postComicExtract(comic);
      });
    });
  };

  openAdjacentComic = (polarity) => {
    const { openedComic } = this.state;
    if (openedComic.name !== null) {
      const originDirname = path.dirname(openedComic.origin);
      fs.readdir(originDirname, (err, files) => {
        this.determineAvailableAdjComic(err, files, polarity);
      });
    }
  };

  openLibrary = () => {
    this.toggleDrawer('top', true);
  };

  openNextComic = () => {
    this.openAdjacentComic(1);
  };

  openPrevComic = () => {
    this.openAdjacentComic(-1);
  };

  postChangePageCount = () => {
    const { currentPageIndex, openedComic, pageCount } = this.state;

    if (openedComic.name !== null) {
      if (pageCount === 2) {
        if (this.isCenterfoldsComing()) {
          this.setCurrentPages(currentPageIndex, 1);
        }
      } else {
        this.setCurrentPages(currentPageIndex, pageCount);
      }
    }
  };

  postComicExtract = (comic) => {
    if (comic.error) {
      this.throwError(true, comic.errorMessage);
    } else {
      this.generatePages(comic.tempdir, (page) => {
        this.postGeneratePages(page, comic);
      });
    }
  };

  postGeneratePages = (pages, openedComic) => {
    const pagePaths = pages.map(page => page.pagePath);
    const centerfolds = generateCenterfolds(pagePaths);
    const isLoading = false;
    const top = false;
    this.setState(
      {
        centerfolds,
        openedComic,
        isLoading,
        pages,
        top,
      },
      () => {
        this.determinePages();
      },
    );
  };

  saveContentDataToMain = (content) => {
    this.setState({ content });
  };

  setCurrentPages = (newPageIndex, pagesToDisplay) => {
    console.log('setCurrentPages', newPageIndex, pagesToDisplay);
    const encodedPages = this.generateEncodedPages(
      newPageIndex,
      pagesToDisplay,
    );
    this.setState({
      currentPageIndex: newPageIndex,
      encodedPages,
    });
  };

  setZoomLevel = (value) => {
    this.setState({ zoomLevel: Number(value) });
  };

  shouldPageTurnLeft = () => {
    const { currentPageIndex } = this.state;
    return currentPageIndex !== 0;
  };

  shouldPageTurnRight = () => {
    const { currentPageIndex, pageCount, pages } = this.state;

    const ultimatePage = pages.length - 1;
    const penultimatePage = pages.length - 2;

    const isUltimatePage = currentPageIndex === ultimatePage;
    const isPenultimatePage = currentPageIndex === penultimatePage;

    return !(
      isUltimatePage ||
      (isPenultimatePage &&
        pageCount === 2 &&
        this.isCenterfoldsComing(penultimatePage))
    );
  };

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open,
    });
  };

  toggleOptions = () => {
    this.toggleDrawer('options', !this.options);
  };

  throwError = (error, errorMessage) => {
    if (error) {
      this.setState({ errorMessage }, () => {
        console.log(this.state.errorMessage);
        // TODO Spawn error module;
      });
    }
  };

  turnPage = (polarity) => {
    const {
      centerfolds,
      currentPageIndex,
      openedComic,
      pageCount,
      pages,
    } = this.state;

    console.log(openedComic);
    if (openedComic.name.length > 0) {
      const { newPageIndex, pagesToDisplay } = turnPage({
        currentPageIndex,
        centerfolds,
        pageCount,
        pages,
        polarity,
      });
      this.setCurrentPages(newPageIndex, pagesToDisplay);
    }
  };

  turnPageLeft = () => {
    const polarity = -1;
    if (this.shouldPageTurnLeft()) {
      this.turnPage(polarity);
    }
  };

  turnPageRight = () => {
    const polarity = 1;
    if (this.shouldPageTurnRight()) {
      this.turnPage(polarity);
    }
  };

  render() {
    const {
      content,
      encodedPages,
      isLoading,
      openedComic,
      pageCount,
      top,
      zoomLevel,
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main">
          <Header
            changePageCount={this.changePageCount}
            openLibrary={this.openLibrary}
            openPrevComic={this.openPrevComic}
            pageCount={pageCount}
            setZoomLevel={this.setZoomLevel}
            turnPageLeft={this.turnPageLeft}
            turnPageRight={this.turnPageRight}
            zoomLevel={zoomLevel}
          />
          <Library
            closeDrawer={this.closeLibrary}
            loadedLibrary={content.fullpath}
            openComic={this.openComic}
            throwError={this.throwError}
            open={top}
            saveContentDataToMain={this.saveContentDataToMain}
          />
          <PageViewer
            comic={openedComic}
            pages={encodedPages}
            openComic={this.openComic}
            turnPage={this.turnPage}
            zoomLevel={zoomLevel}
          />
          <Loading isLoading={isLoading} />
        </div>
      </MuiThemeProvider>
    );
  }
}
