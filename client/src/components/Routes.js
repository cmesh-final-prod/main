import React, { Component } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// importing attendee components
import App from 'components/attendee/App';
import SigninWithLinkedin from 'components/attendee/misc/SigninWithLinkedin';
// mesh components
import MeshAppWrapper from 'components/attendee/meshApp/Wrapper';
import EditProfile from 'components/attendee/meshApp/EditProfile';
import MeshList from 'components/attendee/meshApp/MeshList';
import MeshPublicWrapper from 'components/attendee/meshPublic/Wrapper';

// importing organizer components
import About from 'components/organizer/About';
import Manage from 'components/organizer/Manage';

class Routes extends Component {
  renderAttendeeRoutes() {
    return (
      <div>
        <Route exact path="/mesh/:id" component={MeshList} />
        <Route exact path="/mesh/edit/:id" component={EditProfile} />
        <Route
          exact
          path="/signinWithLinkedin"
          component={SigninWithLinkedin}
        />
      </div>
    );
  }

  renderOrganizerRoutes() {
    return (
      <div>
        <Route exact path="/manage" component={Manage} />
        <Route path="/about" component={About} />
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/"
            render={() =>
              !isMobile || isTablet ? <Redirect to="/about" /> : ''
            }
          />
          {this.renderOrganizerRoutes()}
          <App>{this.renderAttendeeRoutes()}</App>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
