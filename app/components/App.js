import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import Context, { connectContext } from '../context/ContextFactory';

import Header from './Header';
import Library from './Library';
import Loading from './Loading';
import PageViewer from './PageViewer';
import theme from './theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div className="main">
      <Header />
      <Context.Consumer>
        {({ openComic, state, setState, throwError }) => (
          <Library
            closeDrawer={() => setState({ top: false })}
            loadedLibrary={state.content.fullpath}
            openComic={openComic}
            throwError={throwError}
            saveContentDataToMain={content => setState({ content })}
          />
        )}
      </Context.Consumer>
      <Context.Consumer>
        {({ state }) => (
          <PageViewer pages={state.encodedPages} zoomLevel={state.zoomLevel} />
        )}
      </Context.Consumer>

      <Loading />
    </div>
  </MuiThemeProvider>
);

export { App };
export default connectContext(App);
