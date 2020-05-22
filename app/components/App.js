import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import Context, { ConnectContext } from '../context/ContextFactory';

import Header from './Header';
import Library from './Library/Library';
import Loading from './Loading';
import PageViewer from './PageViewer';
import theme from './theme';

const App = () => (
  <ConnectContext>
    <MuiThemeProvider theme={theme}>
      <div className="main">
        <Header />
        <Library />
        <Context.Consumer>
          {({ state }) => (
            <PageViewer
              encodedPages={state.encodedPages}
              zoomLevel={state.zoomLevel}
            />
          )}
        </Context.Consumer>

        <Loading />
      </div>
    </MuiThemeProvider>
  </ConnectContext>
);

export default App;
