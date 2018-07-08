import React, { Component } from 'react';

// importing components
import Navbar from 'components/_misc/Navbar';
import PanelsWrapper from 'components/root/panels/Wrapper';
import LearnContent from 'components/root/learn/Content';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class ComponentsWrapper extends Component {
  componentDidMount() {
    this.props.fetchMeshes();
    this.props.authLinkedin();
  }

  renderContent() {
    if (!this.props.mesh.data) {
      return <LearnContent />;
    } else {
      return <PanelsWrapper />;
    }
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

function mapStateToProps({ mesh }) {
  return { mesh };
}

export default connect(
  mapStateToProps,
  actions
)(ComponentsWrapper);
