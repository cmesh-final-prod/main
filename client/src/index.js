import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// importing css
import 'materialize-css/dist/css/materialize.min.css';
import 'css/index.css';

// importing components
import App from 'components/App';
import Root from 'Root';

ReactDOM.render(
  <Root>
    <div>
      <Router>
        <App />
      </Router>
    </div>
  </Root>,
  document.getElementById('root')
);
