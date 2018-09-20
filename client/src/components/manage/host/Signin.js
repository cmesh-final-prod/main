import React, { Component } from "react";

// importing components
import Template from "components/manage/host/Template";

class Signin extends Component {
  renderText1() {
    return (
      <span>
        To get started, please link your meetup account by signing in. Once the
        account is properly linked, the setup is complete.
      </span>
    );
  }

  renderText2() {
    return (
      <span>
        Circle<b>mesh</b> automatically pulls upcoming events information
        directly from meetup.com and creates mesh networks.{" "}
        <b>No action required from your end.</b>
      </span>
    );
  }

  renderText3() {
    return (
      <span>
        At the start of every event, simply ask attendees to join the event mesh
        network at <b>www.circlemesh.com</b>
      </span>
    );
  }

  render() {
    return (
      <Template
        text1={this.renderText1()}
        text2={this.renderText2()}
        text3={this.renderText3()}
      />
    );
  }
}

export default Signin;
