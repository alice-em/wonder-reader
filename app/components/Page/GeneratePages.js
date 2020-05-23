import React, { memo } from 'react';

import Context from '../../context/ContextFactory';
import Page from './Page';

const generateTotalSize = encodedPages => encodedPages.reduce((a, { width }) => a + width, 0);

const GeneratePages = () => (
  <Context.Consumer>
    {({ state: { encodedPages }}) => (
      encodedPages.map(({ key, page, width }) => (
        <Page
          key={key}
          id={`page${key}`}
          width={(width / generateTotalSize(encodedPages)) * 100}
          alt="comic page"
          src={page}
        />
      ))
    )}
  </Context.Consumer>
);

export { GeneratePages };
export default memo(GeneratePages);
