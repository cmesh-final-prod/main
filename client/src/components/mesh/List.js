import React, { Component } from 'react';

// importing components
import ListItem from 'components/mesh/ListItem';
import PanelHeader from 'components/_misc/PanelHeader';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing hoc
import withPubNub from 'components/_hoc/withPubNub';

class List extends Component {
  async componentWillMount() {
    const { meshId } = this.props.match.params;
    await this.props.fetchMeshOrganizer(meshId);
    await this.props.fetchMeshUsers(meshId);
  }

  renderHeader() {
    const { data } = this.props.selectedMesh;
    return (
      <PanelHeader
        title={data.title}
        color="text-color-1"
        endDate={data.endDate}
        organizer="demo"
        onExpiry={() =>
          this.props.history.push(`${this.props.match.url}/expired`)
        }
      />
    );
  }

  renderFeedback() {
    if (this.props.feedback) {
      return (
        <div className="m-feedback center light-blue">
          <p>Please provide feedback</p>
        </div>
      );
    }
  }

  renderOrganizer() {
    const { organizer, isPopulated } = this.props.selectedMesh;

    if (isPopulated) {
      return (
        <ListItem
          key={organizer._id}
          firstName={organizer.linkedin.firstName}
          lastName={organizer.linkedin.lastName}
          photos={organizer.linkedin.photos[0]}
          headline={organizer.linkedin.headline}
          profileLink={organizer.linkedin.url}
        />
      );
    }
  }

  renderUsers() {
    const { users, isPopulated } = this.props.selectedMesh;

    if (isPopulated) {
      return users.map(user => {
        return (
          <ListItem
            key={user._id}
            firstName={user.linkedin.firstName}
            lastName={user.linkedin.lastName}
            photos={user.linkedin.photos[0]}
            headline={user.linkedin.headline}
            profileLink={user.linkedin.url}
          />
        );
      });
    }
  }

  render() {
    return (
      <div className="card m-main z-depth-5">
        <div className="card-content">
          {this.renderHeader()}
          <div className="m-ghost" />
          {this.renderFeedback()}
          <div className="m-list">
            <ul className="collection">
              {this.renderOrganizer()}
              {this.renderUsers()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ selectedMesh }) {
  return { selectedMesh };
}

//////////////////////////////////////////
//////      withPubNub Props     /////////
//////////////////////////////////////////

const channel = 'fetchMeshUsers';
const callback = ownProps => {
  ownProps.fetchMeshUsers(ownProps.match.params.meshId);
};

//////////////////////////////////////////
//////     ------ End -------    /////////
//////////////////////////////////////////

export default connect(
  mapStateToProps,
  actions
)(withPubNub(List, channel, callback));
