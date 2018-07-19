import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import keys from 'config/keys';

// importing components
import Navbar from 'components/_misc/Navbar';
import PanelsWrapper from 'components/root/panels/Wrapper';
import LearnContent from 'components/root/learn/Content';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// TODO: Make components render dynamically
// TODO: QC Mesh Radius on deployment, by walking around
// TODO: Implement Mesh Timeleft

let lng;
let lat;

// TODO: Move dev keys and prod keys into separate files

class ComponentsWrapper extends Component {
  constructor(props) {
    super(props);
    this.receivedLocation = this.receivedLocation.bind(this);
    this.pubnub = new PubNubReact({
      subscribeKey: keys.pubnubSubscribeKey
    });
    this.pubnub.init(this);
  }

  componentWillMount() {
    console.log('xxxxxxxxxxxxx', process.env.NODE_ENV);
    console.log('-------------', keys.pubnubSubscribeKey);
    this.getLocation();
    this.props.fetchAuthLinkedinUser();
    // clearing previously selected mesh from local storage
    this.props.selectMesh();
    this.pubnub.subscribe({
      channels: ['fetchMeshes'],
      withPresence: true
    });
    this.pubnub.getMessage('fetchMeshes', () => {
      console.log('I am listening!');
      this.props.fetchMeshes(lng, lat);
    });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['fetchMeshes']
    });
  }

  // TODO: Move geolocation logic to HOC
  // TODO: Check geolocation on all protected resources

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
    this.props.fetchMeshes(lng, lat);
  }

  notReceivedLocation(positionError) {
    return <div> No access to location</div>;
  }

  renderContent() {
    return this.props.meshes.isPopulated ? <PanelsWrapper /> : <LearnContent />;
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

function mapStateToProps({ meshes }) {
  return { meshes };
}

export default connect(
  mapStateToProps,
  actions
)(ComponentsWrapper);
