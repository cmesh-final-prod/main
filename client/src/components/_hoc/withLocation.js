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
        console.log('navigator.geolocation === false', this.props);
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
      console.log('recieved lcation', position);
    }

    notReceivedLocation(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('permission denied');
          isNotLocated(this.props);
          return;
        case error.POSITION_UNAVAILABLE:
          console.log('position unavailable');
          break;
        case error.TIMEOUT:
          console.log('timeout');
          break;
        case error.UNKNOWN_ERROR:
          console.log('unknown error');
          break;
        default:
          console.log('default case');
          break;
      }
      console.log('not received location');
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
