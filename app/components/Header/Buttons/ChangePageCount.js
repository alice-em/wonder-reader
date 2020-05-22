import React from 'react';
import { FaPause, FaStop } from 'react-icons/fa';

import Button from './Button';
import Context from '../../../context/ContextFactory';

const ChangePageCount = () => (
  <Context.Consumer>
    {({ state, changePageCount }) => (
      <Button onClick={changePageCount}>
        {state.pageCount === 2 ? <FaPause /> : <FaStop />}
      </Button>
    )}
  </Context.Consumer>
);

export default ChangePageCount;
