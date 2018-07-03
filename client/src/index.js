import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// importing css
import 'materialize-css/dist/css/materialize.min.css';
import 'css/index.css';

// importing components
import Root from 'Root';
import App from 'components/App';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);
registerServiceWorker();
