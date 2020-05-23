import IconButton from '@material-ui/core/IconButton';
import React, { memo } from 'react';
import { FaFolderOpen } from 'react-icons/fa';

import Context from '../../../context/ContextFactory';

const OpenDirectory = () => (
  <Context.Consumer>
    {({ openDirectory }) => (
      <IconButton onClick={openDirectory} color="primary">
        <FaFolderOpen />
      </IconButton>
    )}
  </Context.Consumer>
);

export default memo(OpenDirectory);
