import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import headerStyle from './headerStyle';
import { buttonStyle, buttonTheme } from './buttonStyle';

const LibraryHeader = ({ children, position, title }) => (
  <AppBar style={{ position }}>
    <Toolbar>
      <Typography variant="title" style={headerStyle}>
        {title}
      </Typography>
      <MuiThemeProvider theme={buttonTheme}>
        <div style={buttonStyle}>{children}</div>
      </MuiThemeProvider>
    </Toolbar>
  </AppBar>
);

LibraryHeader.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LibraryHeader;
