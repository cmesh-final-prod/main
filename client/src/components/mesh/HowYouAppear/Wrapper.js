import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import UserInfo from 'components/mesh/HowYouAppear/UserInfo';
import Questions from 'components/mesh/HowYouAppear/Questions';

class HowYouAppearWrapper extends Component {
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
        <UserInfo
          firstName={firstName}
          lastName={lastName}
          photos={photos}
          headline={headline}
        />
      );
    }
  }

  renderQuestions() {
    return <Questions />;
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
          <div className="edit-content">
            {this.renderUserContent()}
            {this.renderQuestions()}
          </div>
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
)(HowYouAppearWrapper);
