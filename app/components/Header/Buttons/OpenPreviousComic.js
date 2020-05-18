import React from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';

import Button from './Button';
import Context from '../../../context/ContextFactory';

const OpenPreviousComic = () => (
  <Context.Consumer>
    {({ openAdjacentComic }) => (
      <Button onClick={() => openAdjacentComic(-1)}>
        <FaAngleDoubleLeft />
      </Button>
    )}
  </Context.Consumer>
);

export default OpenPreviousComic;
