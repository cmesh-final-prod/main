import React, { Component } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { Route, withRouter } from 'react-router-dom';

// importing css
import 'css/app.css';

// importing components
import Navbar from 'components/attendees/Navbar';
import LandingPage from 'components/attendees/LandingPage';
import SigninWithLinkedin from 'components/attendees/SigninWithLinkedin';

class App extends Component {
  componentDidMount() {
    if (!isMobile || isTablet) {
      this.props.history.push('/about');
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Route path="/" exact component={LandingPage} />
      </div>
    );
  }
}

export default App;
