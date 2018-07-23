import React, { Component } from 'react';

// importing components
import Navbar from 'components/_misc/Navbar';

class LocationErrorWrapper extends Component {
  renderContent() {
    if (!navigator.geolocation) {
      return (
        <div>
          <h2>Browser doesn't support</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Please allow location services</h2>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderContent()}
      </div>
    );
  }
}

export default LocationErrorWrapper;
