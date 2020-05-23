import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import headerStyle from '../headerStyle';
import ControlBar from './ControlBar';
import { buttonStyle, buttonTheme } from '../Header/Buttons/buttonStyle';

const Header = () => (
  <AppBar position="fixed" >
    <Toolbar>
      <Typography variant="h5" style={headerStyle}>
        Library
      </Typography>
      <MuiThemeProvider theme={buttonTheme}>
        <div style={buttonStyle}>
          <ControlBar />
        </div>
      </MuiThemeProvider>
    </Toolbar>
  </AppBar>
);

export { Header };
export default Header;
