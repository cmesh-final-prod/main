import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// importing components
import About from 'components/web/About';
import Navbar from 'components/web/_misc/Navbar';

class AboutWrapper extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Redirect to={`${this.props.match.url}/about`} />
        <Route path={`${this.props.match.url}/about`} component={About} />
      </div>
    );
  }
}

export default AboutWrapper;
