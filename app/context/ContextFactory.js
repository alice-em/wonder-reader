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
  console.log('pagePath', {
    tempdir,
    file,
    key,
  });
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
  const setState = async (newState) => {
    console.log('currentState:', state);
    console.log('incomingState:', newState);
    try {
      await updateState({ ...state, ...newState });
    } catch (e) {
      throw e;
    }
  };

  // const {
  //   centerfolds,
  //   currentPageIndex,
  //   openedComic,
  //   pageCount,
  //   pages,
  // } = state;

  // Core Shared Functionality
  const throwError = (error, errorMessage) => {
    if (error) {
      // console.log(errorMessage);
      setState({ errorMessage }).catch(console.log);
    }
  };

  const isCenterfold = (index) => {
    const { centerfolds } = state;
    return centerfolds.includes(index);
  };

  const isCenterfoldsComing = () => {
    const { currentPageIndex } = state;
    return isCenterfold(currentPageIndex) || isCenterfold(currentPageIndex + 1);
  };

  const setCurrentPages = (
    newPageIndex,
    pagesToDisplay,
    { openedComic, pageCount, pages, ...otherState } = state,
  ) => {
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
        console.log(encodedPages);
      }
    }
    setState({
      ...otherState,
      currentPageIndex: newPageIndex,
      encodedPages,
      openedComic,
      pageCount,
      pages,
    }).catch(throwError);
  };

  // ChangePageCount Function
  const changePageCount = () => {
    const { currentPageIndex, openedComic, pageCount } = state;
    const newPageCount = pageCount === 2 ? 1 : 2;

    if (openedComic.name !== null) {
      setState({ pageCount: newPageCount })
        .then(() => {
          if (newPageCount === 2) {
            if (isCenterfoldsComing()) {
              return setCurrentPages(currentPageIndex, 1);
            }
          }
          return setCurrentPages(currentPageIndex, newPageCount);
        })
        .catch(throwError);
    }
  };

  // openAdjacentComic Functions
  const openComic = (fullpath) => {
    const { pageCount } = state;
    const Comic = new File(fullpath);
    setState({ isLoading: true })
      .then(() => Comic.extract((newOpenedComic) => {
          if (newOpenedComic.error) {
            throwError(true, newOpenedComic.errorMessage);
          } else {
            fs.readdir(newOpenedComic.tempdir, (err, files) => {
              const generatedPages = files.map(
                mapPages(newOpenedComic.tempdir),
              );
              const pagePaths = generatedPages.map(({ pagePath }) => pagePath);

              const newState = {
                centerfolds: generateCenterfolds(pagePaths),
                openedComic: newOpenedComic,
                images: generateImages(generatedPages),
                isLoading: false,
                pages: generatedPages,
                top: false,
              };
              setCurrentPages(0, pageCount, newState);
            });
          }
        }))
      .catch(throwError);
  };

  const openAdjacentComic = (polarity) => {
    const { openedComic } = state;

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
  const shouldPageTurnLeft = () => {
    const { currentPageIndex } = state;
    return currentPageIndex !== 0;
  };

  const shouldPageTurnRight = () => {
    const { currentPageIndex, pageCount, pages } = state;
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
    const {
      centerfolds,
      currentPageIndex,
      openedComic,
      pageCount,
      pages,
    } = state;
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
        const { openedComic } = state;
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
