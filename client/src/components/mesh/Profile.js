import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

class Profile extends Component {
  renderTitle() {
    return (
      <div className="valign-wrapper">
        <div className="edit-header">
          <h5 className="center text-color-1 responsive edit-title">
            EDIT YOUR PROFILE
          </h5>
        </div>
      </div>
    );
  }

  renderUserContent() {
    const { isAuth, isCompliant } = this.props.currentUser;
    if (isAuth && isCompliant) {
      const {
        firstName,
        lastName,
        photos,
        headline
      } = this.props.currentUser.data.linkedin;

      return (
        <div className="text-color-1 edit-content">
          <div className="">
            <p>
              <img src={photos[0]} alt="" className="circle" />
              <br />
              <span className="responsive edit-name">
                {`${firstName} ${lastName.substring(0, 1)}.`}
              </span>
              <br />
              <span className="edit-headline">
                {'Product At Circlemesh'}{' '}
                <i className="tiny material-icons">edit</i>
              </span>
            </p>
          </div>
        </div>
      );
    }
  }

  renderQuestions() {
    return (
      <div className="grey lighten-4 text-color-1 edit-questions">
        <div className="row left-align">
          <p>Are you hiring?</p>
        </div>
        <div className="row left-align">
          <p>Are you looking for opportunities?</p>
        </div>
      </div>
    );
  }

  renderButton() {
    return (
      <Link
        to={`${this.props.match.url}/list`}
        className="btn waves-effect color-1 center btn-letsGo"
        onClick={() => this.handleClick()}
      >
        I'm good, let's go!
      </Link>
    );
  }

  handleClick() {
    const { meshId } = this.props.match.params;
    const userId = this.props.currentUser.data._id;
    this.props.addMeshUser(meshId, userId);
  }

  render() {
    return (
      <div>
        <div className="container center">
          {this.renderTitle()}
          {this.renderUserContent()}
          {this.renderQuestions()}
          {this.renderButton()}
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
