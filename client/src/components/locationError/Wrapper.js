import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// importing components
import Navbar from 'components/_misc/Navbar';
import Instructions from 'components/locationError/Instructions';
import BrowserNotSupported from 'components/locationError/BrowserNotSupported';

// importing hoc
import withLocation from 'components/_hoc/withLocation';

class LocationErrorWrapper extends Component {
  // handleClick() {
  //   const options = {
  //     enableHighAccuracy: true
  //   };
  //   navigator.geolocation.getCurrentPosition(
  //     this.receivedLocation,
  //     this.notReceivedLocation,
  //     options
  //   );
  // }
  //
  // receivedLocation(position) {
  //   this.props.history.push('/');
  // }
  //
  // notReceivedLocation(positionError) {
  //   console.log('navigator.geolcation === true && notReceivedLocation');
  //   return <h2>PLEAAASE!</h2>;
  // }

  render() {
    return (
      <div>
        <Navbar />
        <button
          className="btn light-blue white-text"
          // onClick={() => this.handleClick()}
        >
          Allow
        </button>
        <Route
          path={`${this.props.match.url}/browser`}
          component={BrowserNotSupported}
        />
        <Route
          path={`${this.props.match.url}/instructions`}
          component={Instructions}
        />
      </div>
    );
  }
}

//////////////////////////////////////////
//////     withLocation Props    /////////
//////////////////////////////////////////

const isNotSupported = ownProps => {
  ownProps.history.push('/locationError/browser');
};
const isLocated = (ownProps, lng, lat) => {
  ownProps.history.push('/');
};

const isNotLocated = ownProps => {
  ownProps.history.push('/locationError/instructions');
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
