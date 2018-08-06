import React, { Component } from 'react';

// importing components
import ListItem from 'components/mesh/list/Item';
import PanelHeader from 'components/_misc/PanelHeader';
import FeedbackWrapper from 'components/mesh/feedback/Wrapper';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// importing hoc
import withPubNub from 'components/_hoc/withPubNub';

class ListWrapper extends Component {
  async componentWillMount() {
    const { meshId } = this.props.match.params;
    await this.props.fetchMeshUsers(meshId);
  }

  renderHeader() {
    const { data } = this.props.selectedMesh;
    return (
      <PanelHeader
        title={data.title}
        color="text-color-1"
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

  renderUsers() {
    const { users, isPopulated, data } = this.props.selectedMesh;

    if (isPopulated) {
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
  }

  render() {
    return (
      <div className="card m-main z-depth-5">
        <div className="card-content">
          {this.renderHeader()}
          <div className="m-ghost" />
          {this.renderFeedback()}
          <div className="m-list">
            <ul className="">{this.renderUsers()}</ul>
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
