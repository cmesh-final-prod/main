import React, { Component } from 'react';

// importing components
import Navbar from 'components/_misc/Navbar';
import PanelsWrapper from 'components/root/panels/Wrapper';
import LearnContent from 'components/root/learn/Content';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// TODO: Implement geolocation HOC

class ComponentsWrapper extends Component {
  constructor(props) {
    super(props);
    this.receivedLocation = this.receivedLocation.bind(this);
  }

  componentWillMount() {
    this.getLocation();
    this.props.fetchAuthLinkedinUser();
    // clearing previously selected mesh
    this.props.selectMesh();
  }

  getLocation() {
    if (!navigator.geolocation) {
      return <div>Turn location services on</div>;
    } else {
      navigator.geolocation.getCurrentPosition(
        this.receivedLocation,
        this.notReceivedLocation
      );
    }
  }

  receivedLocation(position) {
    console.log(position);
    this.props.fetchMeshes(position.coords.longitude, position.coords.latitude);
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
