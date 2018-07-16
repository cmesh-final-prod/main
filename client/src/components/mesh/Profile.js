import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Profile extends Component {
  renderUserContent() {
    const {
      lnId,
      firstName,
      lastName,
      url,
      photos,
      headline
    } = this.props.auth.data.linkedin;

    return (
      <li key={lnId} className="collection-item avatar">
        <img src={photos[0]} alt="" className="circle" />
        <span className="title">
          {firstName} {lastName}
        </span>
        <p>{headline}</p>
        <a href={url}>View Profile</a>
      </li>
    );
  }

  handleClick() {
    const { meshId } = this.props.match.params;
    const userId = this.props.auth.data._id;
    this.props.addMeshUser(meshId, userId);
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="center">How you appear</h3>

          <ul className="collection">{this.renderUserContent()}</ul>

          <Link
            to={`${this.props.match.url}/list`}
            className="btn light-blue center"
            onClick={() => this.handleClick()}
          >
            Got it
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, selectedMesh }) {
  return { auth, selectedMesh };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
