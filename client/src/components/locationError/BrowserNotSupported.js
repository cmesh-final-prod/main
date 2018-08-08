import React, { Component } from 'react';

// importing components
import Oops from 'components/locationError/Oops';

class BrowserNotSupported extends Component {
  renderProblem() {
    return (
      <div className="row">
        <div className="col s10 offset-s1 grey-text location-problem">
          <p>
            This browser seems to be an older version that doesn't support
            location services...
          </p>
        </div>
      </div>
    );
  }

  renderSolution() {
    return (
      <div className="row">
        <div className="col s10 offset-s1 light-blue white-text location-solution center z-depth-5">
          PLEASE SWITCH TO A DIFFERENT BROWSER
        </div>
      </div>
    );
  }

  render() {
    return (
      <section className="section-location">
        <Oops />
        {this.renderProblem()}
        {this.renderSolution()}
      </section>
    );
  }
}

export default BrowserNotSupported;
