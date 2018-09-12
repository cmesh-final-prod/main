import React from "react";
import Jump from "react-reveal/Jump";

// importing assets
import orgStats from "assets/web/green/stats.png";
import feedback1 from "assets/web/green/feedback1.png";
import feedback2 from "assets/web/green/feedback2.png";

const OrgBenefits = () => {
  return (
    <section className="color-4 padding-top padding-left padding-bottom orgBenefits">
      <div className="row">
        <div className="col s12 m5">
          <p className="title-text bold-text white-text">
            Get event statistics and <br />attendeee feedback
          </p>
        </div>
        <div className="col s12 m5">
          <img src={orgStats} alt="" className="orgStats" />
          <Jump>
            <img src={feedback1} alt="" className="feedback1" />
            <img src={feedback2} alt="" className="feedback2" />
          </Jump>
        </div>
      </div>
    </section>
  );
};

export default OrgBenefits;
