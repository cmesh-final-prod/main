import React, { Component } from "react";
import Pulse from "react-reveal/Pulse";

// importing assets
import meshCircles from "assets/web/green/meshCircles.png";

class MeshCircles extends Component {
  renderCircles() {
    return (
      <div>
        <Pulse duration={2000} forever>
          <img src={meshCircles} alt="" />
        </Pulse>
      </div>
    );
  }

  render() {
    return this.renderCircles();
  }
}

export default MeshCircles;
