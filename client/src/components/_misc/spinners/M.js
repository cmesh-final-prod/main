import React, { Component } from "react";

// importing components
import MeshCircles from "components/_misc/MeshCircles";

class SpinnerM extends Component {
  renderIcon(text) {
    return (
      <div className="spinner-m">
        <div className="icon">
          <MeshCircles />
        </div>
        <div className="row">
          <div className="col s12 center text">
            <h4 className="grey-text flow-text">{text}</h4>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.props.searching
      ? this.renderIcon("Searching...")
      : this.renderIcon("No active mesh networks found...");
  }
}

export default SpinnerM;
