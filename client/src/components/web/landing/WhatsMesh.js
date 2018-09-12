import React from "react";

// importing assets
import cityImg from "assets/web/green/whatsMesh.png";
import joinedImg from "assets/web/green/83joined.png";
import hiringImg from "assets/web/green/7hiring.png";
import lookingImg from "assets/web/green/21looking.png";

const WhatsMesh = () => {
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
      <div className="eventDetails">
        <img src={joinedImg} alt="" className="joinedImg" />
        <img src={hiringImg} alt="" className="hiringImg" />
        <img src={lookingImg} alt="" className="lookingImg" />
      </div>
    </section>
  );
};

export default WhatsMesh;
