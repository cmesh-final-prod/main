import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

class RootWrapper extends Component {
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
)(withRouter(isLocated(withPubNub(RootWrapper, 'fetchMeshes'), 'fetchMeshes')));
