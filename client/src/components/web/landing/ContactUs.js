import React from "react";

const ContactUs = () => {
  return (
    <section>
      <div className="row padding-1 color-1-text">
        <div className="col s8 m3">
          <p className="web-section-title">Have Questions?</p>
        </div>
      </div>
      <div className="row padding-1 color-1-text">
        <div className="col s12 m6">
          <p className="text-size-1">
            Send us an email at <br />
            <b>team@circlemesh.com</b>
          </p>
        </div>
        <div className="col s12 m6">
          <div className="btn gradient-2">Schedule a call</div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
