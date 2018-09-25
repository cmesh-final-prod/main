import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Button extends Component {
  activateButton() {
    return this.props.headline === "" ? true : false;
  }

  render() {
    return (
      <Link
        to={`${this.props.match.url}/list`}
        className="btn-large btn waves-effect color-10 color-10-text-lighten grey center btn-letsGo"
        onClick={() => this.props.onClick()}
        disabled={this.activateButton()}
      >
        I'm good, let's go!
      </Link>
    );
  }
}

export default withRouter(Button);
