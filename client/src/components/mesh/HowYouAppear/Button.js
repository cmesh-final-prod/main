import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Button extends Component {
  render() {
    let bool = false;
    this.props.headline === '' ? (bool = true) : '';
    return (
      <Link
        to={`${this.props.match.url}/list`}
        className="btn waves-effect color-1 center btn-letsGo"
        onClick={() => this.props.onClick()}
        disabled={bool}
      >
        I'm good, let's go!
      </Link>
    );
  }
}

export default withRouter(Button);
