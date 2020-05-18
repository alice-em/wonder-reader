import React from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

import Button from './Button';
import Context from '../../../context/ContextFactory';

const OpenNextComic = () => (
  <Context.Consumer>
    {({ openAdjacentComic }) => (
      <Button onClick={() => openAdjacentComic(1)}>
        <FaAngleDoubleRight />
      </Button>
    )}
  </Context.Consumer>
);

export default OpenNextComic;
