import React from 'react';
import ReactDOM from 'react-dom';

// importing css
import 'materialize-css/dist/css/materialize.min.css';
import 'css/index.css';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

// importing reducers
import reducers from 'reducers';

// importing components
import Routes from 'components/Routes';

// redux store
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Routes />
    </div>
  </Provider>,
  document.getElementById('root')
);
