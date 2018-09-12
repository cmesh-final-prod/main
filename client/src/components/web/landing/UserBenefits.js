import React, { Component } from "react";
import Fade from "react-reveal/Fade";

// importing assets
import iphoneBlur from "assets/web/green/iphoneBlur.png";
import person1 from "assets/web/green/person1.png";
import person2 from "assets/web/green/person2.png";
import person3 from "assets/web/green/person3.png";
import person4 from "assets/web/green/person4.png";

class UserBenefits extends Component {
  renderImages() {
    const USERS = [
      { img: person1, class: "person1" },
      { img: person2, class: "person2" },
      { img: person3, class: "person3" },
      { img: person4, class: "person4" }
    ];

    return USERS.map(user => {
      return (
        <div key={user.img}>
          <Fade top duration={2000}>
            <img src={user.img} alt="" className={user.class} />
          </Fade>
        </div>
      );
    });
  }

  renderBenefits() {
    const BENEFITS = [
      "Identify interesting people in the room",
      "Connect with them directly on LinkedIn",
      "Let the room know if they are hiring or looking for opportunities"
    ];

    return BENEFITS.map(benefit => {
      return (
        <li key={benefit}>
          <div className="color-6">
            <p className="main-text white-text light-text">{benefit}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <section className="color-4 padding-top padding-bottom padding-right userBenefits">
        <div className="row">
          <div className="col s12 m7 illustration">
            <img src={iphoneBlur} alt="" className="iphoneBlur" />
            <div className="people">{this.renderImages()}</div>
          </div>
          <div className="col s12 m5 text">
            <p className="title-text bold-text white-text">Attendees can now</p>
            <ul className="benefit">{this.renderBenefits()}</ul>
            <p className="main-text light-text white-text">and more...</p>
          </div>
        </div>
      </section>
    );
  }
}

export default UserBenefits;
