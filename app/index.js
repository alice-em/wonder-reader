import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';

import './app.global.css';
import App from './components/App';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
