import IconButton from '@material-ui/core/IconButton';
import React, { memo } from 'react';
import { FaLevelUpAlt } from 'react-icons/fa';

import Context from '../../../context/ContextFactory';

const SetParentAsLibrary = () => (
  <Context.Consumer>
    {({ setParentAsLibrary }) => (
      <IconButton onClick={setParentAsLibrary} color="primary">
        <FaLevelUpAlt />
      </IconButton>
    )}
  </Context.Consumer>
);

export default memo(SetParentAsLibrary);
