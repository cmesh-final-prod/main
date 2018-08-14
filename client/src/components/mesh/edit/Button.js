import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Button extends Component {
  activateButton() {
    return this.props.headline === '' ? true : false;
  }

  render() {
    return (
      <Link
        to={`${this.props.match.url}/list`}
        className="btn waves-effect grey color-4 color-1-text center btn-letsGo"
        onClick={() => this.props.onClick()}
        disabled={this.activateButton()}
      >
        I'm good, let's go!
      </Link>
    );
  }
}

export default withRouter(Button);
