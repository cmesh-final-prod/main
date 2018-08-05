import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import PanelHeader from 'components/_misc/PanelHeader';

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
        organizer="demo"
        onExpiry={() => this.props.fetchMeshes(lng, lat)}
      />
    );
  }

  renderPanelBody() {
    const distance = Math.round(this.props.distance * 10000) / 10000;
    return (
      <div className="m-body center">
        <h2 className="white-text">{distance}</h2>
      </div>
    );
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
