import React from 'react';

import ContextFactory from './ContextFactory';
import defaultState from './defaultState';

const [CenterfoldsContextWrapper, CenterfoldsContext] = ContextFactory(
  defaultState.centerfolds,
  'centerfolds',
);
const [ContentContextWrapper, ContentContext] = ContextFactory(
  defaultState.content,
  'content',
);
const [
  CurrentPageIndexContextWrapper,
  CurrentPageIndexContext,
] = ContextFactory(defaultState.currentPageIndex, 'currentPageIndex');
const [EncodedPagesWrapper, EncodedPagesContext] = ContextFactory(
  defaultState.encodedPages,
  'encodedPages',
);
const [ErrorMessageContextWrapper, ErrorMessageContext] = ContextFactory(
  defaultState.errorMessage,
  'errorMessage',
);
const [ImagesContextWrapper, ImagesContext] = ContextFactory(
  defaultState.images,
  'images',
);
const [IsLibraryActiveContextWrapper, IsLibraryActiveContext] = ContextFactory(
  defaultState.isLibraryActive,
  'isLibraryActive',
);
const [IsLoadingContextWrapper, IsLoadingContext] = ContextFactory(
  defaultState.isLoading,
  'isLoading',
);
const [OpenedComicContextWrapper, OpenedComicContext] = ContextFactory(
  defaultState.openedComic,
  'openedComic',
);
const [PageCountContextWrapper, PageCountContext] = ContextFactory(
  defaultState.pageCount,
  'pageCount',
);
const [PagesContextWrapper, PagesContext] = ContextFactory(
  defaultState.pages,
  'pages',
);
const [ZoomLevelContextWrapper, ZoomLevelContext] = ContextFactory(
  defaultState.zoomLevel,
  'zoomLevel',
);

const connectContext = Component => (
  <CenterfoldsContextWrapper>
    <ContentContextWrapper>
      <CurrentPageIndexContextWrapper>
        <EncodedPagesWrapper>
          <ErrorMessageContextWrapper>
            <ImagesContextWrapper>
              <IsLibraryActiveContextWrapper>
                <IsLoadingContextWrapper>
                  <OpenedComicContextWrapper>
                    <PageCountContextWrapper>
                      <PagesContextWrapper>
                        <ZoomLevelContextWrapper>
                          {Component}
                        </ZoomLevelContextWrapper>
                      </PagesContextWrapper>
                    </PageCountContextWrapper>
                  </OpenedComicContextWrapper>
                </IsLoadingContextWrapper>
              </IsLibraryActiveContextWrapper>
            </ImagesContextWrapper>
          </ErrorMessageContextWrapper>
        </EncodedPagesWrapper>
      </CurrentPageIndexContextWrapper>
    </ContentContextWrapper>
  </CenterfoldsContextWrapper>
);

export default connectContext;
export {
  CenterfoldsContext,
  ContentContext,
  CurrentPageIndexContext,
  EncodedPagesContext,
  ErrorMessageContext,
  ImagesContext,
  IsLibraryActiveContext,
  IsLoadingContext,
  OpenedComicContext,
  PageCountContext,
  PagesContext,
  ZoomLevelContext,
};
