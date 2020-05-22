import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

import Context from '../../../context/ContextFactory';

const closeButton = {
  background: '#ef5350',
};

const CloseLibrary = () => (
  <Context.Consumer>
    {({ setState }) => (
      <IconButton
        onClick={() => setState({ isLibraryActive: false })}
        color="primary"
        style={closeButton}
      >
        <FaTimes />
      </IconButton>
    )}
  </Context.Consumer>
);

export default CloseLibrary;
