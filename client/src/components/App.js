import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isMobile, isTablet } from 'react-device-detect';

// importing style sheets
import 'css/app.css';
import 'css/color.css';
import 'css/layout.css';
import 'css/labels.css';
import 'css/feedback.css';
import 'css/list.css';
import 'css/signin.css';

// importing wrapper components
import RootWrapper from 'components/root/Wrapper';
import MeshWrapper from 'components/mesh/Wrapper';
import ManageWrapper from 'components/manage/Wrapper';
import AboutWrapper from 'components/about/Wrapper';
import LocationErrorWrapper from 'components/locationError/Wrapper';

// importing _misc components
import SigninWithLinkedin from 'components/_misc/SigninWithLinkedin';

class App extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() =>
            !isMobile || isTablet ? <Redirect to="/about" /> : <RootWrapper />
          }
        />
        <Route path="/mesh" component={MeshWrapper} />
        <Route path="/manage" component={ManageWrapper} />
        <Route path="/about" component={AboutWrapper} />
        <Route path="/signinWithLinkedin" component={SigninWithLinkedin} />
        <Route path="/locationError" component={LocationErrorWrapper} />
      </div>
    );
  }
}

export default App;
