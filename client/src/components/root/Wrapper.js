import React, { Component } from 'react';
// import PubNubReact from 'pubnub-react';
// import keys from 'config/keys';

// importing components
import Navbar from 'components/_misc/Navbar';
import PanelsWrapper from 'components/root/panels/Wrapper';
import LearnContent from 'components/root/learn/Content';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing hoc
import isLocated from 'components/_hoc/isLocated';
import withPubNub from 'components/_hoc/withPubNub';

class ComponentsWrapper extends Component {
  componentWillMount() {
    this.props.clearState();
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
)(isLocated(withPubNub(ComponentsWrapper, 'fetchMeshes'), 'fetchMeshes'));
