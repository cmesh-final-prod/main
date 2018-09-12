import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isMobile, isTablet } from "react-device-detect";

// importing style sheets
import "css/web.css";
import "css/app.css";
import "css/color.css";
import "css/layout.css";
import "css/labels.css";
import "css/feedback.css";
import "css/list.css";
import "css/signin.css";
import "css/location.css";
import "css/landing.css";
import "css/landingMobile.css";
import "animate.css/animate.css";

// importing wrapper components
import RootWrapper from "components/root/Wrapper";
import MeshWrapper from "components/mesh/Wrapper";
import ManageWrapper from "components/manage/Wrapper";
import WebWrapper from "components/web/Wrapper";
import LocationErrorWrapper from "components/locationError/Wrapper";

// importing _misc components
import SigninWithLinkedin from "components/_misc/SigninWithLinkedin";

class ComponentsWrapper extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() =>
            !isMobile || isTablet ? <Redirect to="/web" /> : <RootWrapper />
          }
        />
        <Route path="/mesh" component={MeshWrapper} />
        <Route path="/manage" component={ManageWrapper} />
        <Route path="/web" component={WebWrapper} />
        <Route path="/signinWithLinkedin" component={SigninWithLinkedin} />
        <Route path="/locationError" component={LocationErrorWrapper} />
      </div>
    );
  }
}

export default ComponentsWrapper;
