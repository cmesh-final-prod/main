import React, { Component } from "react";
import Flip from "react-reveal/Flip";

// importing assets
import cityImg from "assets/web/green/whatsMesh.png";
import joinedImg from "assets/web/green/83joined.png";
import hiringImg from "assets/web/green/7hiring.png";
import lookingImg from "assets/web/green/21looking.png";

class WhatsMesh extends Component {
  renderEventDetails() {
    const DETAILS = [
      { img: joinedImg, class: "joinedImg" },
      { img: hiringImg, class: "hiringImg" },
      { img: lookingImg, class: "lookingImg" }
    ];
    return DETAILS.map(detail => {
      return (
        <div key={detail.img}>
          <Flip top duration={3000}>
            <img src={detail.img} alt="" className={detail.class} />
          </Flip>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="color-4 whatsMesh padding-left padding-top padding-bottom">
        <div className="text">
          <p className="white-text bold-text title-text">
            What's a mesh <br />network?
          </p>
          <p className="white-text main-text ">
            Mesh network is a{" "}
            <span className="color-2-text">location bubble</span> that lets
            attendeees <b>connect with people in the room</b>
          </p>
        </div>
        <img src={cityImg} alt="" className="cityImg" />
        <div className="eventDetails">{this.renderEventDetails()}</div>
      </section>
    );
  }
}

export default WhatsMesh;
