import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// TODO: move Auth to higher order component
// Protected routes should self redirect to sign in w/ linkedin

class MeshPanel extends Component {
  renderLink() {
    switch (this.props.auth.status) {
      case false:
        return '/signinWithLinkedin';
      default:
        return `/mesh/${this.props.meshId}`;
    }
  }

  handleClick() {
    this.props.selectMesh(this.props.meshId);
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
            onClick={() => this.handleClick()}
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
