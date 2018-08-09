import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// importing components
import NavbarWrapper from 'components/_misc/navbar/Wrapper';
import PanelsWrapper from 'components/root/panels/Wrapper';
import LandingWrapper from 'components/root/landing/Wrapper';
import Footer from 'components/_misc/Footer';
import SpinnerM from 'components/_misc/spinners/M';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing hoc
import withLocation from 'components/_hoc/withLocation';
import withPubNub from 'components/_hoc/withPubNub';

// TODO: BUG FIX Can't call set state on an unmounted component

class RootWrapper extends Component {
  state = { showSpinner: true };

  componentWillMount() {
    this.props.clearState();
  }

  meshesNotFound() {
    setTimeout(() => this.setState({ showSpinner: false }), 2000);
    return this.state.showSpinner ? <SpinnerM /> : <LandingWrapper />;
  }

  renderContent() {
    const { meshes } = this.props;

    return meshes.isFetching && !meshes.isPopulated ? (
      <SpinnerM searching={true} />
    ) : meshes.isPopulated ? (
      <PanelsWrapper />
    ) : (
      this.meshesNotFound()
    );
  }

  render() {
    return (
      <div>
        <NavbarWrapper sidenav={true} />
        <div className="section-root">{this.renderContent()}</div>
        <Footer />
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
  ownProps.history.push('/locationError');
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
