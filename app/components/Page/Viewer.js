import React, { memo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import GeneratePages from './GeneratePages';
import ZoomController from './ZoomController';

const Viewer = () => (
  <ScrollContainer className="PageViewer dragscroll" hideScrollbars={false}>
    <ZoomController>
      <GeneratePages />
    </ZoomController>
  </ScrollContainer>
);

export default memo(Viewer);
