import React, { Component } from 'react';
import { deviceDetect, browserName, browserVersion } from 'react-device-detect';
import Fingerprint2 from 'fingerprintjs2';
import * as L from 'components/_misc/LOG-TYPES';

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

    postLog(logType) {
      setTimeout(
        new Fingerprint2().get((result, components) => {
          const createLogProps = {
            fingerPrint: result,
            device: deviceDetect(),
            browser: { browserName, browserVersion },
            log: {
              logType,
              componentServed: '_hoc-withLocation'
            }
          };
          this.props.createLog(createLogProps);
        }),
        500
      );
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
      this.postLog(L.LOCATION_SUCCESS);
    }

    notReceivedLocation(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.postLog(L.LOCATION_PERMISSION_DENIED);
          isNotLocated(this.props);
          return;
        case error.POSITION_UNAVAILABLE:
          this.postLog(L.LOCATION_POSITION_UNAVAILABLE);
          isNotLocated(this.props);
          return;
        case error.TIMEOUT:
          this.postLog(L.LOCATION_TIMEOUT);
          isNotLocated(this.props);
          return;
        case error.UNKNOWN_ERROR:
          this.postLog(L.LOCATION_UNKNOWN_ERROR);
          isNotLocated(this.props);
          return;
        default:
          this.postLog(L.LOCATION_DEFAULT_CASE);
          isNotLocated(this.props);
          return;
      }
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
