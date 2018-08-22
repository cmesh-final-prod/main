import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// importing css
import 'materialize-css/dist/css/materialize.min.css';
import 'css/index.css';

// importing components
import ComponentsWrapper from 'components/Wrapper';
import Root from 'Root';

ReactDOM.render(
  <Root>
    <div>
      <Router>
        <ComponentsWrapper />
      </Router>
    </div>
  </Root>,
  document.getElementById('root')
);
