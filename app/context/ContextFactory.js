import fs from 'fs';
import React, { createContext, useEffect, useState } from 'react';
import path from 'path';
import sizeOf from 'image-size';

import encodePath from '../modules/encodePath';
import File from '../modules/File';
import { generateCenterfolds } from '../modules/generate';
import { strainComics } from '../modules/strain';

import defaultState from './defaultState';

const mapPages = tempdir => (file, key) => {
  const pagePath = path.join(tempdir, file);

  return {
    encodedPagePath: encodePath(pagePath),
    key,
    pagePath,
  };
};

const generateImages = pages =>
  pages.map((page) => {
    const img = new Image();
    img.src = page.encodedPagePath;
    return img;
  });

const Context = createContext();
Context.displayName = 'Context';

const ConnectContext = ({ children }) => {
  const [state, updateState] = useState(defaultState);

  // const setState = newState => updateState({ ...state, ...newState });
  const setState = (newState) => {
    console.log('currentState:', state);
    console.log('incomingState:', newState);
    updateState({ ...state, ...newState });
  };

  const {
    centerfolds,
    currentPageIndex,
    openedComic,
    pageCount,
    pages,
  } = state;

  // Core Shared Functionality
  const throwError = (error, errorMessage) => {
    if (error) {
      // console.log(errorMessage);
      setState({ errorMessage });
    }
  };

  const generateEncodedPages = (newPageIndex, pagesToDisplay) => {
    const encodedPages = [];
    const pagesToRender = Math.min(pageCount, pagesToDisplay);
    for (let i = 0; i < pagesToRender; i += 1) {
      const key = newPageIndex + i;
      if (key < pages.length) {
        // Stops from trying to read beyond comic page length
        const pagePath = path.join(openedComic.tempdir, openedComic.pages[key]);
        const { width, height } = sizeOf(pagePath);
        const ratio =
          key === newPageIndex ? 1 : encodedPages[0].height / height;

        encodedPages[i] = {
          page: encodePath(pagePath),
          key,
          width: width * ratio,
          height: height * ratio,
        };
      }
    }
    return encodedPages;
  };

  const isCenterfold = index => centerfolds.includes(index);

  const isCenterfoldsComing = () =>
    isCenterfold(currentPageIndex) || isCenterfold(currentPageIndex + 1);

  const setCurrentPages = (pageIndex, pagesToDisplay) => {
    // console.log('setCurrentPages', newPageCount);
    const encodedPages = generateEncodedPages(pageIndex, pagesToDisplay);
    setState({
      currentPageIndex: pageIndex,
      encodedPages,
    });
  };

  // ChangePageCount Function
  const changePageCount = () => {
    const newPageCount = pageCount === 2 ? 1 : 2;

    setState({ pageCount: newPageCount });
    if (openedComic.name !== null) {
      if (newPageCount === 2) {
        if (isCenterfoldsComing()) {
          setCurrentPages(currentPageIndex, 1);
        }
      } else {
        setCurrentPages(currentPageIndex, newPageCount);
      }
    }
  };

  // openAdjacentComic Functions
  const openComic = (fullpath) => {
    console.log(fullpath)
    const Comic = new File(fullpath);
    console.log(Comic);
    setState({ isLoading: true });
    Comic.extract((newOpenedComic) => {
      console.log(newOpenedComic)
      if (newOpenedComic.error) {
        throwError(true, newOpenedComic.errorMessage);
      } else {
        fs.readdir(newOpenedComic.tempdir, (err, files) => {
          console.log(files);
          const generatedPages = files.map(mapPages(newOpenedComic.tempdir));
          const pagePaths = generatedPages.map(({ pagePath }) => pagePath);

          setState({
            centerfolds: generateCenterfolds(pagePaths),
            openedComic: newOpenedComic,
            images: generateImages(pages),
            isLoading: false,
            pages: generatedPages,
            top: false,
          });
          setCurrentPages(0, isCenterfoldsComing(0) || pageCount === 1 ? 1 : 2);
        });
      }
    });
  };

  const openAdjacentComic = (polarity) => {
    if (openedComic.name !== null) {
      fs.readdir(path.dirname(openedComic.origin), (err, files) => {
        const strainedComics = strainComics(files);
        const newIndex = strainedComics.indexOf(openedComic.name) + polarity;
        if (newIndex > -1 && newIndex < strainedComics.length) {
          const newComicFilepath = path.join(
            path.dirname(openedComic.origin),
            strainedComics[newIndex],
          );
          openComic(newComicFilepath);
        }
      });
    }
  };

  // TurnPage Functions
  const shouldPageTurnLeft = () => currentPageIndex !== 0;

  const shouldPageTurnRight = () => {
    const ultimatePage = pages.length - 1;
    const penultimatePage = pages.length - 2;

    const isUltimatePage = currentPageIndex === ultimatePage;
    const isPenultimatePage = currentPageIndex === penultimatePage;

    return !(
      isUltimatePage ||
      (isPenultimatePage &&
        pageCount === 2 &&
        isCenterfoldsComing(penultimatePage))
    );
  };

  const turnPage = (polarity) => {
    if (openedComic.name.length > 0) {
      const { newPageIndex, pagesToDisplay } = turnPage({
        currentPageIndex,
        centerfolds,
        pageCount,
        pages,
        polarity,
      });
      setCurrentPages(newPageIndex, pagesToDisplay);
    }
  };

  const turnPageLeft = () => {
    const polarity = -1;
    if (shouldPageTurnLeft()) {
      turnPage(polarity);
    }
  };

  const turnPageRight = () => {
    const polarity = 1;
    if (shouldPageTurnRight()) {
      turnPage(polarity);
    }
  };

  const arrowKeyTurnPage = (code) => {
    if (code === 'ArrowRight') {
      turnPageRight();
    } else if (code === 'ArrowLeft') {
      turnPageLeft();
    }
  };

  useEffect(() => {
    window.addEventListener(
      'keydown',
      (e) => {
        const isComicActive = openedComic.name !== null;
        const isActiveElemInput = document.activeElement.tagName === 'input';

        const shouldTurn = isComicActive && !isActiveElemInput;

        if (shouldTurn) {
          arrowKeyTurnPage(e.code);
        }
      },
      [],
    );
  });

  // Component Render
  return (
    <Context.Provider
      value={{
        changePageCount,
        openAdjacentComic,
        openComic,
        state,
        setState,
        throwError,
        turnPageLeft,
        turnPageRight,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ConnectContext };
export default Context;
