import React, { memo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import { ConnectContext } from '../context/ContextFactory';

import Header from './Header';
import Library from './Library/Library';
import Loading from './Loading';
import PageViewer from './Page/Viewer';
import theme from './theme';

const App = () => (
  <ConnectContext>
    <MuiThemeProvider theme={theme}>
      <div className="main">
        <Header />
        <Library />
        <PageViewer />
        <Loading />
      </div>
    </MuiThemeProvider>
  </ConnectContext>
);

export default memo(App);
