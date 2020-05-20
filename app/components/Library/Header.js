import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import headerStyle from '../headerStyle';
import { buttonStyle, buttonTheme } from '../Header/Buttons/buttonStyle';

const Header = ({ children, position, title }) => (
  <AppBar style={{ position }}>
    <Toolbar>
      <Typography variant="h5" style={headerStyle}>
        {title}
      </Typography>
      <MuiThemeProvider theme={buttonTheme}>
        <div style={buttonStyle}>{children}</div>
      </MuiThemeProvider>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
