import React, { Component } from "react";

// importing assets
import meshCircles from "assets/web/green/meshCircles.png";

class MeshCircles extends Component {
  renderCircles() {
    return (
      <img
        src={meshCircles}
        alt=""
        className="animated infinite pulse slower"
      />
    );
  }

  render() {
    return this.renderCircles();
  }
}

export default MeshCircles;
