import React, { Component } from 'react';
import * as L from 'components/_misc/LOG-TYPES';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing components
import Title from 'components/mesh/edit/Title';
import BasicProfile from 'components/mesh/edit/BasicProfile';

// importing _hoc
import withLogOnMount from 'components/_hoc/withLogOnMount';

class Edit extends Component {
  handleSubmit(editedProfile) {
    const { meshId } = this.props.match.params;
    const userId = this.props.currentUser.data._id;
    const { fingerPrint } = this.props.currentUser;
    this.props.addMeshUser(meshId, userId);
    this.props.editUserInfo(userId, editedProfile);

    const createLogProps = {
      fingerPrint,
      log: {
        logType: L.IM_GOOD_CLICKED,
        componentServed: 'mesh-edit-wrapper',
        meshId,
        userId
      }
    };
    this.props.createLog(createLogProps);
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

//////////////////////////////////////////
//////   withLogOnMount Props    /////////
//////////////////////////////////////////

const logProps = ownProps => {
  return {
    logType: L.MOUNT,
    componentServed: 'mesh-edit-wrapper',
    meshId: ownProps.match.params.meshId,
    userId: ownProps.currentUser.data._id
  };
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default connect(
  mapStateToProps,
  actions
)(withLogOnMount(Edit, logProps));
