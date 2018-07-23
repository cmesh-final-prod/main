import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Profile extends Component {
  renderUserContent() {
    const { isAuth, isCompliant } = this.props.currentUser;
    if (isAuth && isCompliant) {
      const {
        lnId,
        firstName,
        lastName,
        url,
        photos,
        headline
      } = this.props.currentUser.data.linkedin;

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

    return <div>Loading...</div>;
  }

  handleClick() {
    const { meshId } = this.props.match.params;
    const userId = this.props.currentUser.data._id;
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

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
