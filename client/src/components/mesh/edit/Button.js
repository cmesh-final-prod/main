import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Button extends Component {
  render() {
    let shouldDisable = false;
    this.props.headline === '' ? (shouldDisable = true) : '';
    return (
      <Link
        to={`${this.props.match.url}/list`}
        className="btn waves-effect color-1 center btn-letsGo"
        onClick={() => this.props.onClick()}
        disabled={shouldDisable}
      >
        I'm good, let's go!
      </Link>
    );
  }
}

export default withRouter(Button);
