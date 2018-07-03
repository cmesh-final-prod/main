import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

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
import App from 'components/attendees/App';
import About from 'components/organizers/About';

// redux store
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/about" component={About} />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
