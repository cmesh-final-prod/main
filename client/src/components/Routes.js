import React, { Component } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// importing attendee components
import App from 'components/attendee/App';
import MeshList from 'components/attendee/MeshList';
import EditProfile from 'components/attendee/EditProfile';
import SigninWithLinkedin from 'components/attendee/SigninWithLinkedin';

// importing organizer components
import About from 'components/organizer/About';
import Manage from 'components/organizer/Manage';

class Routes extends Component {
  renderAttendeeRoutes() {
    return (
      <div>
        <Route path="/meshlist" component={MeshList} />
        <Route path="/editProfile/:id" component={EditProfile} />
        <Route path="/signinWithLinkedin" component={SigninWithLinkedin} />
      </div>
    );
  }

  renderOrganizerRoutes() {
    return (
      <div>
        <Route path="/about" component={About} />
        <Route exact path="/manage" component={Manage} />
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
              !isMobile || isTablet ? <Redirect to="/about" /> : <App />
            }
          />
          {this.renderAttendeeRoutes()}
          {this.renderOrganizerRoutes()}
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
