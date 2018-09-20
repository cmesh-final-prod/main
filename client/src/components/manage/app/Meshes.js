import React, { Component } from "react";

// container elements
import * as actions from "actions";
import { connect } from "react-redux";

class Meshes extends Component {
  componentDidMount() {
    const { token } = this.props.auth;
    this.props.syncMeetups(token);
    this.props.fetchOrgMeshes(token);
  }

  componentDidUpdate(prevProps) {
    if (this.props.org.orgMeshes !== prevProps.org.orgMeshes) {
      return this.renderOrgMeshes();
    }
  }

  renderOrgMeshes() {
    const { orgMeshes } = this.props.org;
    return orgMeshes.map(orgMesh => {
      const { eventDetails } = orgMesh;
      const { title, address } = eventDetails;
      const date = Date();
      return (
        <div
          key={orgMesh.eventId}
          className="col s10 offset-s1 m4 offset-m1 white z-depth-1 manage-mesh grey-text"
        >
          {title}
          <br />
          {address.street}
          <br />
          {date}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <h5 className="color-3-text">Your Upcoming Mesh Networks: </h5>
        {this.renderOrgMeshes()}
      </div>
    );
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(
  mapStateToProps,
  actions
)(Meshes);
