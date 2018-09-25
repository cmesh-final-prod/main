import React from "react";

// setting up redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import throttle from "lodash/throttle";

// importing reducers
import reducers from "reducers";
import { loadState, saveState } from "reducers/sessionStorage";

// middlewares
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";

let middlewares = [promise(), thunk];

// Development vs. Production
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export default ({ children }) => {
  const persistedState = loadState();
  const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(...middlewares)
  );

  // saving State to local storage every 1000ms
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  return <Provider store={store}>{children}</Provider>;
};
