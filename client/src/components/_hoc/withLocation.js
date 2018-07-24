import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

let lng;
let lat;
export default (ChildComponent, isNotSupported, isLocated, isNotLocated) => {
  class ComposedComponent extends Component {
    constructor(props) {
      super(props);
      this.receivedLocation = this.receivedLocation.bind(this);
      this.notReceivedLocation = this.notReceivedLocation.bind(this);
      this.getLocation = this.getLocation.bind(this);
    }

    componentWillMount() {
      this.getLocation();
    }

    getLocation() {
      const options = {
        enableHighAccuracy: true
      };

      if (!navigator.geolocation) {
        console.log('navigator.geolcation === false', this.props);
        isNotSupported(this.props);
      } else {
        navigator.geolocation.getCurrentPosition(
          this.receivedLocation,
          this.notReceivedLocation,
          options
        );
      }
    }

    receivedLocation(position) {
      lng = position.coords.longitude;
      lat = position.coords.latitude;

      isLocated(this.props, lng, lat);
    }

    notReceivedLocation(positionError) {
      console.log('navigator.geolcation === true && notReceivedLocation');
      isNotLocated(this.props);
    }

    render() {
      return <ChildComponent {...this.props} lng={lng} lat={lat} />;
    }
  }

  function mapStateToProps({ meshes }) {
    return { meshes };
  }

  return connect(
    mapStateToProps,
    actions
  )(ComposedComponent);
};
