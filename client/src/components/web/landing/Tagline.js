import React, { Component } from "react";
import Typist from "react-typist";

// importing components
import MeshCircles from "components/_misc/MeshCircles";

class Tagline extends Component {
  renderTypingText() {
    const TYPING = ["meetups", "events", "conferences"];

    return TYPING.map(text => {
      return (
        <p key={text}>
          {text}
          <Typist.Delay ms={1000} />
          <Typist.Backspace count={text.length} />
          <Typist.Delay ms={1000} />
        </p>
      );
    });
  }

  renderTyping() {
    return (
      <Typist cursor={{ show: false }}>
        <div className="color-2-text typing">{this.renderTypingText()}</div>
        <div className="color-2-text typing">
          <p>meetups</p>
        </div>
      </Typist>
    );
  }

  render() {
    return (
      <section className="min-height-2">
        <div className="row tagline">
          <div className="col s12 m3 push-m7 tagline-img center">
            <MeshCircles />
          </div>
          <div className="col s12 m6 pull-m3 offset-m1 tagline-text">
            <div className="row">
              <div className="col s7">
                <div className="t1">
                  <p className="color-1-text right">Augment your</p>
                </div>
              </div>
              <div className="col s5 typing">
                <div className="t2">{this.renderTyping()}</div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 t3">
                <p className="color-1-text center">
                  with a <b>mesh network</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Tagline;
