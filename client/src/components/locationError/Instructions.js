import React, { Component } from 'react';

// importing components
import Oops from 'components/locationError/Oops';

class Instructions extends Component {
  renderProblem() {
    return (
      <div className="row">
        <div className="col s10 offset-s1 grey-text location-problem">
          Your location services may be turned <b>on</b>.{' '}
          <span className="">
            However, <u>this browser doesn't have access to your location!</u>
          </span>
        </div>
      </div>
    );
  }

  renderSolution() {
    return (
      <div className="row">
        <div className="col s10 offset-s1">
          <h4 className="text-color-1">Solution:</h4>
          <div className="divider" />
          <div className="row">
            <div className="col s12 text-color-1 location-instructions-solution">
              some steps
            </div>
          </div>
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

export default Instructions;
