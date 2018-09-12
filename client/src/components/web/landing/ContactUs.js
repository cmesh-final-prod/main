import React from "react";

// importing assets
import meetupBg from "assets/web/green/questions_img.png";

const ContactUs = () => {
  return (
    <section className="contactUs">
      <div className="text padding-left padding-right padding-top padding-bottom">
        <div className="row">
          <div className="col s8 m3">
            <p className="title-text bold-text white-text">
              Have <br />Questions?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4 offset-m2">
            <p className="main-text white-text email">
              Send us an email at <br />
              <b>team@circlemesh.com</b>
            </p>
          </div>
          <div className="col s12 m6 call center">
            <div className="gradient-2 white-text bold-text">
              SCHEDULE A CALL
            </div>
          </div>
        </div>
      </div>
      <img src={meetupBg} alt="" className="bg" />
    </section>
  );
};

export default ContactUs;
