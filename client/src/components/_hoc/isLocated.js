import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// TODO: Fix navigation when location services are not available

let lng;
let lat;
export default (ChildComponent, action) => {
  class ComposedComponent extends Component {
    constructor(props) {
      super(props);
      this.receivedLocation = this.receivedLocation.bind(this);
    }

    componentWillMount() {
      this.getLocation();
    }

    getLocation() {
      const options = {
        enableHighAccuracy: true
      };

      if (!navigator.geolocation) {
        return <div>Turn location services on</div>;
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
      this.props.postLocationToStore(lng, lat);
      this.props[action](lng, lat);
    }

    notReceivedLocation(positionError) {
      return <div> No access to location</div>;
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
