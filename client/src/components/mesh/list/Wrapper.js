import React, { Component } from 'react';

// importing components
import ListItem from 'components/mesh/list/Item';
import PanelHeader from 'components/_misc/PanelHeader';
import FeedbackWrapper from 'components/mesh/feedback/Wrapper';
import SortMeshUsers from 'components/mesh/list/SortMeshUsers';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing hoc
import withPubNub from 'components/_hoc/withPubNub';

class ListWrapper extends Component {
  state = { sortOption: 'all' };

  async componentWillMount() {
    const { meshId } = this.props.match.params;
    await this.props.fetchMeshUsers(meshId);
  }

  renderHeader() {
    const { data } = this.props.selectedMesh;
    return (
      <PanelHeader
        title={data.title}
        color="white-text"
        endDate={data.endDate}
        orgTitle={data.orgTitle}
        onExpiry={() =>
          this.props.history.push(`${this.props.match.url}/expired`)
        }
      />
    );
  }

  renderFeedback() {
    return <FeedbackWrapper />;
  }

  renderUsers(users) {
    return users.map(user => {
      return (
        <ListItem
          key={user.userId}
          firstName={user.firstName}
          lastName={user.lastName}
          photos={user.photos[0]}
          headline={user.headline}
          profileLink={user.url}
          viewed={user.viewed}
          hiring={user.hiring}
          lookingForJob={user.lookingForJob}
          isOrganizer={user.isOrganizer}
        />
      );
    });
  }

  renderList() {
    const { users, isPopulated } = this.props.selectedMesh;
    if (isPopulated) {
      const usersHiring = users.filter(user => {
        return user.hiring;
      });
      const usersLookingForJob = users.filter(user => {
        return user.lookingForJob;
      });

      switch (this.state.sortOption) {
        case 'all':
          return this.renderUsers(users);
        case 'hiring':
          return this.renderUsers(usersHiring);
        case 'lookingForJob':
          return this.renderUsers(usersLookingForJob);
        default:
          return this.renderUsers(users);
      }
    }
  }

  render() {
    return (
      <div>
        <div className="card m-main z-depth-0">
          <div className="card-content">
            {this.renderHeader()}
            <div className="m-ghost" />
            <SortMeshUsers
              onClick={sortOption => this.setState({ sortOption })}
            />
            {this.renderFeedback()}
            <div className="m-list">
              <ul className="">{this.renderList()}</ul>
            </div>
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
)(withPubNub(ListWrapper, channel, callback));
