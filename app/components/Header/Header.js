import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ControlBar from './ControlBar';
import headerStyle from '../headerStyle';

const Header = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="h5" style={headerStyle}>
        Wonder Reader
      </Typography>
      <ControlBar />
    </Toolbar>
  </AppBar>
);

export default Header;
