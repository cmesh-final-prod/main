import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MeshPanel extends Component {
  renderLink() {
    switch (this.props.linkedinAuth) {
      case false:
        return '/signinWithLinkedin';
      default:
        return `/editProfile/${this.props.id}`;
    }
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
            className="btn btn-large btn-join light-blue"
          >
            Join The Room
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ linkedinAuth }) {
  return { linkedinAuth };
}

export default connect(mapStateToProps)(MeshPanel);
