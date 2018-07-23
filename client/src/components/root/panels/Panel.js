import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import TimeLeft from 'components/_misc/TimeLeft';

class MeshPanel extends Component {
  handleClick() {
    this.props.selectMesh(this.props.meshId);
  }

  refreshMeshes = () => {
    const { lng, lat } = this.props.meshes.location;
    this.props.fetchMeshes(lng, lat);
  };

  render() {
    const distance = Math.round(this.props.distance * 10000) / 10000;

    return (
      <div className="card mesh-panel grey darken-2 z-depth-5">
        <div className="card-content center">
          <div className="container">
            <h5 className="white-text">{this.props.title}</h5>
          </div>

          <Link
            to="/mesh"
            onClick={() => this.handleClick()}
            className="btn btn-large btn-join light-blue"
          >
            Join The Room
          </Link>
          <br />
          <h2 className="white-text">{distance}</h2>
          <br />
          <TimeLeft
            className="white-text"
            endDate={this.props.endDate}
            onMeshExpiry={() => this.refreshMeshes()}
          />
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
