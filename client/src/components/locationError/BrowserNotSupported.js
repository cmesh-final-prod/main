import React, { Component } from 'react';
import * as L from 'components/_misc/LOG-TYPES';

// importing components
import Oops from 'components/locationError/Oops';

// importing _hoc
import withLogOnMount from 'components/_hoc/withLogOnMount';

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
      <section>
        <Oops />
        {this.renderProblem()}
        {this.renderSolution()}
      </section>
    );
  }
}

//////////////////////////////////////////
//////   withLogOnMount Props    /////////
//////////////////////////////////////////

const logProps = ownProps => {
  return {
    logType: L.MOUNT,
    componentServed: 'locationError-browserNotSupported'
  };
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default withLogOnMount(BrowserNotSupported, logProps);
