import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import PanelHeader from 'components/_misc/PanelHeader';
import Stats from 'components/root/panels/Stats';

class MeshPanel extends Component {
  handleClick() {
    this.props.selectMesh(this.props.meshId);
  }

  refreshMeshes = () => {
    const { lng, lat } = this.props.meshes.location;
    this.props.fetchMeshes(lng, lat);
  };

  renderPanelHeader() {
    const { lng, lat } = this.props.meshes.location;
    return (
      <PanelHeader
        title={this.props.title}
        color="white-text"
        endDate={this.props.endDate}
        orgTitle={this.props.orgTitle}
        onExpiry={() => this.props.fetchMeshes(lng, lat)}
      />
    );
  }

  renderStats() {
    const { totalUsers, totalHiring, totalLookingForJob } = this.props;
    return (
      <Stats
        totalUsers={totalUsers}
        totalHiring={totalHiring}
        totalLookingForJob={totalLookingForJob}
      />
    );
  }

  renderBodyResting() {
    return (
      <div className="center">
        <div className="row">
          <div className="m-body col s10 offset-s1">
            <div className="m-body-inner white-text">
              <div className="m-body-resting pulse btn-floating btn-flat transparent circle">
                LIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPanelBody() {
    const { totalUsers } = this.props;
    return totalUsers > 1 ? this.renderStats() : this.renderBodyResting();
  }

  renderJoinButton() {
    return (
      <div className="center">
        <Link
          to="/mesh"
          onClick={() => this.handleClick()}
          className="btn-join btn-large waves-effect white-text light-blue"
        >
          <p className="flow-text">JOIN THE ROOM</p>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="card m-panel grey darken-2 z-depth-5 gradient-1">
        <div className="card-content">
          {this.renderPanelHeader()}
          {this.renderPanelBody()}
          {this.renderJoinButton()}
        </div>
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
)(MeshPanel);
