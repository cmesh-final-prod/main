import React, { Component } from "react";

// importing assets
import iphoneBlur from "assets/web/green/iphoneBlur.png";
import person1 from "assets/web/green/person1.png";
import person2 from "assets/web/green/person2.png";
import person3 from "assets/web/green/person3.png";
import person4 from "assets/web/green/person4.png";

class UserBenefits extends Component {
  renderBenefits() {
    const BENEFITS = [
      "Identify interesting people in the room",
      "Connect with them directly on linkedin",
      "Let the room know if they are hiring or looking for opportunities"
    ];

    return BENEFITS.map(benefit => {
      return (
        <li key={benefit}>
          <div className="gradient-3 benefit">
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
            <div className="people">
              <img src={person1} alt="" className="person1" />
              <img src={person2} alt="" className="person2" />
              <img src={person3} alt="" className="person3" />
              <img src={person4} alt="" className="person4" />
            </div>
          </div>
          <div className="col s12 m5 text">
            <p className="title-text bold-text white-text">Attendees can now</p>
            <ul>{this.renderBenefits()}</ul>
            <p className="main-text light-text white-text">and more...</p>
          </div>
        </div>
      </section>
    );
  }
}

export default UserBenefits;
