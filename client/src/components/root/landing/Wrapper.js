import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {
  render() {
    return (
      <div className="container">
        <div className="center motto">
          <p className="text-color-1">
            <span>CONNECT</span>
            <br />
            WITH PEOPLE
            <br />
            IN THE ROOM
          </p>
          <div className="divider" />
        </div>
        <div className="center">
          <Link to="/about" className="btn m-gradient z-depth-5 btn-demo">
            Learn More
          </Link>
        </div>
      </div>
    );
  }
}

export default Content;
