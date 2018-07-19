import React from 'react';

// setting up redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';

// importing reducers
import reducers from 'reducers';
import { loadState, saveState } from 'reducers/sessionStorage';

// middlewares
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

export default ({ children }) => {
  const persistedState = loadState();
  const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(promise(), thunk, logger)
  );

  // saving State to local storage every 1000ms
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  return <Provider store={store}>{children}</Provider>;
};
