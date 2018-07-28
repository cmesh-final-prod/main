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
import withLocation from 'components/_hoc/withLocation';
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

//////////////////////////////////////////
//////     withLocation Props    /////////
//////////////////////////////////////////

const isNotSupported = ownProps => {
  ownProps.history.push('/locationError');
};
const isLocated = (ownProps, lng, lat) => {
  ownProps.postLocationToStore(lng, lat);
  ownProps.fetchMeshes(lng, lat);
};

const isNotLocated = ownProps => {
  // TODO: TEMP code, undo comment
  // ownProps.history.push('/locationError');
};

//////////////////////////////////////////
//////      withPubNub Props     /////////
//////////////////////////////////////////

const channel = 'fetchMeshes';
const callback = ownProps => {
  ownProps.fetchMeshes(ownProps.lng, ownProps.lat);
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default connect(
  mapStateToProps,
  actions
)(
  withRouter(
    withLocation(
      withPubNub(RootWrapper, channel, callback),
      isNotSupported,
      isLocated,
      isNotLocated
    )
  )
);
