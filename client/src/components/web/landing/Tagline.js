import React, { Component } from "react";
import Typing from "react-typing-animation";

// importing assets
import meshCircles from "assets/web/landing/meshCircles.svg";

class Tagline extends Component {
  renderTypingText() {
    const TYPING = ["meetups", "events", "conferences"];

    return TYPING.map(text => {
      return (
        <p key={text}>
          {text}
          <Typing.Delay ms={1000} />
          <Typing.Backspace count={text.length} />
          <Typing.Delay ms={1000} />
        </p>
      );
    });
  }

  renderTyping() {
    return (
      <Typing loop={true} speed={50} cursorClassName="color-2-text">
        <div className="color-2-text typing">{this.renderTypingText()}</div>
      </Typing>
    );
  }

  render() {
    return (
      <section>
        <div className="row tagline">
          <div className="col s12 m3 push-m6 tagline-img center">
            <img src={meshCircles} alt="" />
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
