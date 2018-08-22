import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// importing components
import About from 'components/web/About';
import Navbar from 'components/web/_misc/Navbar';
import Footer from 'components/_misc/Footer';
import Terms from 'components/web/_misc/Terms';
class AboutWrapper extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => {
            return <Redirect to={`${this.props.match.url}/about`} />;
          }}
        />
        <Route path={`${this.props.match.url}/about`} component={About} />
        <Route
          path={`${this.props.match.url}/terms-of-use`}
          component={Terms}
        />
        <Footer />
      </div>
    );
  }
}

export default AboutWrapper;
