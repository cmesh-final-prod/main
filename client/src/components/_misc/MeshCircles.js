import React, { Component } from "react";

// importing assets
import meshCircles from "assets/web/green/meshCircles.png";

class MeshCircles extends Component {
  renderCircles() {
    return (
      <div className="animated fadeIn slow">
        <img
          src={meshCircles}
          alt=""
          className="animated infinite pulse slower"
        />
      </div>
    );
  }

  render() {
    return this.renderCircles();
  }
}

export default MeshCircles;
