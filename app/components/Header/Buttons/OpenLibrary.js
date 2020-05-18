import React from 'react';
import { FaBook } from 'react-icons/fa';

import Button from './Button';
import Context from '../../../context/ContextFactory';

const OpenLibrary = () => (
  <Context.Consumer>
    {({ setState }) => (
      <Button onClick={() => setState({ top: true })}>
        <FaBook />
      </Button>
    )}
  </Context.Consumer>
);

export default OpenLibrary;
