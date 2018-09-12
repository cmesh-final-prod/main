import React, { Component } from "react";

// importing components
import Tagline from "components/web/landing/Tagline";
import WhatsMesh from "components/web/landing/WhatsMesh";
import UserBenefits from "components/web/landing/UserBenefits";
import OrgBenefits from "components/web/landing/OrgBenefits";
import HowItWorks from "components/web/landing/HowItWorks";
import ContactUs from "components/web/landing/ContactUs";

class Wrapper extends Component {
  render() {
    return (
      <div>
        <Tagline />
        <WhatsMesh />
        <UserBenefits />
        <OrgBenefits />
        <HowItWorks />
        <ContactUs />
      </div>
    );
  }
}

export default Wrapper;
