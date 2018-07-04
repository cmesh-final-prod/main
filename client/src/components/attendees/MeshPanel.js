import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MeshPanel extends Component {
  render() {
    return (
      <div className="card mesh-panel grey darken-2 z-depth-5">
        <div className="card-content center">
          <div className="container">
            <h5 className="white-text">Demo</h5>
          </div>

          <Link to="/signinWithLinkedin" className="btn btn-large light-blue ">
            Join The Room
          </Link>
        </div>
      </div>
    );
  }
}

export default MeshPanel;
