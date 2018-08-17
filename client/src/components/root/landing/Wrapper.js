import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// importing log types
import * as L from 'components/_misc/LOG-TYPES';

// importing hoc
import withLogOnMount from 'components/_hoc/withLogOnMount';

class Content extends Component {
  render() {
    return (
      <div className="container">
        <div className="center motto">
          <p className="white-text">
            <span>CONNECT</span>
            <br />
            WITH PEOPLE
            <br />
            IN THE ROOM
          </p>
          <div className="divider" />
        </div>
        <div className="center">
          <Link to="/about" className="btn grey gradient-1 z-depth-5 btn-demo">
            Learn More
          </Link>
        </div>
      </div>
    );
  }
}

//////////////////////////////////////////
//////   withLogOnMount Props    /////////
//////////////////////////////////////////

const logProps = ownProps => {
  return {
    logType: L.MOUNT,
    componentServed: 'root-landing-wrapper'
  };
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default withLogOnMount(Content, logProps);
