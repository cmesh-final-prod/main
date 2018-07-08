import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// importing components
import AboutContent from 'components/about/Content';

class AboutWrapper extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`${this.props.match.url}`}
          component={AboutContent}
        />
      </div>
    );
  }
}

export default AboutWrapper;
