import React, { Component } from "react";

class UserBenefits extends Component {
  renderBenefits() {
    const BENEFITS = [
      "See who all are at the event",
      "Connect with interesting people directly on linkedin",
      "Let the room know if they are hiring or looking for opportunities"
    ];

    return BENEFITS.map(benefit => {
      return (
        <li key={benefit}>
          <p className="text-size-1">
            <i className="material-icons color-2-text">check_circle</i>
            {benefit}
          </p>
        </li>
      );
    });
  }

  render() {
    return (
      <section>
        <div className="row padding-1">
          <div className="col s12 m6" />
          <div className="col s12 m6 color-1-text">
            <p className="web-section-title ">Attendees can now:</p>
            <ul>{this.renderBenefits()}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default UserBenefits;
