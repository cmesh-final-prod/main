import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isMobile, isTablet } from 'react-device-detect';

// importing components

// --------------Wrappers----------------
import RootWrapper from 'components/root/Wrapper';
import MeshWrapper from 'components/mesh/Wrapper';
import ManageWrapper from 'components/manage/Wrapper';
import AboutWrapper from 'components/about/Wrapper';

// --------------_misc--------------------
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
      </div>
    );
  }
}

export default App;
