import React, { Component } from "react";
import Typing from "react-typing-animation";

// importing assets
import meshDetails from "assets/web/green/meshDetails.png";
import signinMeetup from "assets/web/green/signinMeetup.png";
import iphoneUpper from "assets/web/green/iphoneUpper.png";
import icon_automatic from "assets/web/green/automatic.png";
import icon_oneTimeSetup from "assets/web/green/oneTimeSetup.png";
import icon_loudspeaker from "assets/web/green/loudspeaker.png";

class HowItWorks extends Component {
  renderTyping() {
    return (
      <Typing loop={true} speed={100} cursorClassName="grey-text text-darken-2">
        <p className="grey-text text-darken-2 sub-text">www.circlemesh.com</p>
        <Typing.Delay ms={2000} />
      </Typing>
    );
  }

  renderSteps() {
    const STEPS = [
      {
        id: 1,
        title: "ONE TIME SETUP",
        text: "Simply link your meetup account with circlemesh",
        img: signinMeetup,
        icon: icon_oneTimeSetup,
        class: "signinMeetup",
        func: ""
      },
      {
        id: 2,
        title: "AUTO MESH CREATION",
        text:
          "Circlemesh automatically creates mesh networks for all your upcoming events",
        img: meshDetails,
        icon: icon_automatic,
        class: "meshDetails",
        func: ""
      },
      {
        id: 3,
        title: "LET ATTENDEES KNOW",
        text:
          "At the start of an event, ask attendees to join your mesh using any smartphone browser",
        img: iphoneUpper,
        icon: icon_loudspeaker,
        class: "iphoneUpper",
        func: this.renderTyping()
      }
    ];

    return STEPS.map(step => {
      return (
        <div className="col s12 m3 " key={step.id}>
          <div className="card-1 color-4 z-depth-3">
            <div className="title row">
              <div className="col s2">
                <img src={step.icon} alt="" />
              </div>{" "}
              <div className="col s10 left ">
                <p className="white-text sub-title bold-text center">
                  {step.title}
                </p>
              </div>
            </div>
            <div className="img center">
              <div className={step.class}>
                <div className="typing-url">{step.func}</div>
                <img src={step.img} alt="" />
              </div>
            </div>
            <div className="text">
              <p className="white-text light-text sub-text">{step.text}</p>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="grey lighten-4 padding-top padding-bottom howItWorks">
        <div className="row center">
          <p className="title-text bold-text color-3-text center">
            HOW IT WORKS
          </p>
        </div>
        <div className="row">
          <div className="col ghost hide-on-med-and-down" />
          {this.renderSteps()}
          <div className="col ghost hide-on-med-and-down" />
        </div>
      </section>
    );
  }
}

export default HowItWorks;
