import React, { Component } from 'react';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import Title from 'components/mesh/edit/Title';
import BasicProfile from 'components/mesh/edit/BasicProfile';

class Edit extends Component {
  handleSubmit(editedProfile) {
    const { meshId } = this.props.match.params;
    const userId = this.props.currentUser.data._id;
    this.props.addMeshUser(meshId, userId);
    this.props.editUserInfo(userId, editedProfile);
  }

  renderBasicProfile() {
    const { isAuth, isCompliant } = this.props.currentUser;
    if (isAuth && isCompliant) {
      const {
        firstName,
        lastName,
        photos,
        headline,
        hiring,
        lookingForJob
      } = this.props.currentUser.data;

      return (
        <BasicProfile
          firstName={firstName}
          lastName={lastName}
          photos={photos}
          headline={headline}
          hiring={hiring}
          lookingForJob={lookingForJob}
          handleSubmit={editedProfile => this.handleSubmit(editedProfile)}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="container center">
          <Title text={'EDIT YOUR PROFILE'} />
          <div className="edit-content">{this.renderBasicProfile()}</div>
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
)(Edit);
