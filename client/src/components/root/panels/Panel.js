import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class MeshPanel extends Component {
  renderLink() {
    switch (this.props.auth.status) {
      case false:
        return '/signinWithLinkedin';
      default:
        return `/mesh/${this.props.meshId}`;
    }
  }

  handleClick(meshId) {
    this.props.selectMesh(meshId);
  }

  render() {
    return (
      <div className="card mesh-panel grey darken-2 z-depth-5">
        <div className="card-content center">
          <div className="container">
            <h5 className="white-text">{this.props.title}</h5>
          </div>

          <Link
            to={this.renderLink()}
            onClick={() => this.handleClick(this.props.meshId)}
            className="btn btn-large btn-join light-blue"
          >
            Join The Room
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(MeshPanel);
