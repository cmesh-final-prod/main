import React, { Component } from 'react';
import { connect } from 'react-redux';

// importing action creators
import * as actions from 'actions';

class EditProfile extends Component {
  componentDidMount() {
    this.props.updateMeshWithNewAttendee({
      meshId: '5b3d8e667e29fadd34e90e72',
      userId: 'from frontend'
    });
    this.props.fetchLinkedinUser();

    console.log('edit linkedinAuth: ', this.props.linkedinAuth);
    console.log('edit activeMeshes: ', this.props.activeMeshes);
  }

  render() {
    const {
      linkedinFirstName,
      linkedinHeadline,
      linkedinProfilePictures
    } = this.props.linkedinAuth;

    return (
      <div>
        <div className="container">
          <h3 className="center">How you appear</h3>
          <ul className="collection avatar">
            <li className="collection-item">
              <img src="" alt="" className="circle" />
              <span className="title">linkedinFirstName</span>
              <p>linkedinHeadline</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ linkedinAuth, activeMeshes }) {
  return { linkedinAuth, activeMeshes };
}

export default connect(
  mapStateToProps,
  actions
)(EditProfile);
