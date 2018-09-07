import React, { Component } from "react";
import { Route } from "react-router-dom";

// importing components
import Instructions from "components/locationError/Instructions";
import BrowserNotSupported from "components/locationError/BrowserNotSupported";
import Footer from "components/_misc/Footer";

// importing hoc
import withLocation from "components/_hoc/withLocation";

class LocationErrorWrapper extends Component {
  render() {
    return (
      <div className="app">
        <Route
          path={`${this.props.match.url}/browser`}
          component={BrowserNotSupported}
        />
        <Route
          path={`${this.props.match.url}/instructions`}
          component={Instructions}
        />
        <Footer />
      </div>
    );
  }
}

//////////////////////////////////////////
//////     withLocation Props    /////////
//////////////////////////////////////////

const isNotSupported = ownProps => {
  ownProps.history.push("/locationError/browser");
};
const isLocated = (ownProps, lng, lat) => {
  ownProps.history.push("/");
};

const isNotLocated = ownProps => {
  ownProps.history.push("/locationError/instructions");
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default withLocation(
  LocationErrorWrapper,
  isNotSupported,
  isLocated,
  isNotLocated
);

// export default LocationErrorWrapper;
