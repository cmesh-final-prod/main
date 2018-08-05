import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class ManageWrapper extends Component {
  renderOrg() {
    const orgProps = {
      title: 'demo',
      url: 'www.demo.com',
      description: 'demo organization'
    };

    this.props.createOrg(orgProps);
  }

  render() {
    return (
      <div>
        <h1>Welcome Organizers!</h1>
        <button className="btn light-blue" onClick={() => this.renderOrg()}>
          Create Org
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(ManageWrapper);
