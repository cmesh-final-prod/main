import React, { Component } from "react";
import * as L from "components/_misc/LOG-TYPES";

// importing components
import ListItem from "components/mesh/list/Item";
import PanelHeader from "components/_misc/PanelHeader";
import FeedbackWrapper from "components/mesh/feedback/Wrapper";
import SortMeshUsers from "components/mesh/list/SortMeshUsers";
import PageVisibility from "components/_misc/PageVisibility";

// container elements
import { connect } from "react-redux";
import * as actions from "actions";

// importing hoc
import withPubNub from "components/_hoc/withPubNub";
import withLogOnMount from "components/_hoc/withLogOnMount";

class ListWrapper extends Component {
  state = { sortOption: "all" };

  async componentWillMount() {
    const { meshId } = this.props.match.params;
    await this.props.fetchMeshUsers(meshId);
    return <PageVisibility />;
  }

  renderHeader() {
    const { data } = this.props.selectedMesh;
    return (
      <PanelHeader
        title={data.title}
        bg=""
        color="color-12-text"
        labelBg="color-5-border white"
        labelText="color-12-text"
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
          fellowUserId={user.userId}
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
        case "all":
          return this.renderUsers(users);
        case "hiring":
          return this.renderUsers(usersHiring);
        case "lookingForJob":
          return this.renderUsers(usersLookingForJob);
        default:
          return this.renderUsers(users);
      }
    }
  }

  render() {
    return (
      <div className="list-wrapper">
        <SortMeshUsers onClick={sortOption => this.setState({ sortOption })} />
        <div className="card m-main transparent z-depth-0">
          <div className="card-content">
            <div className="combinedHeader">{this.renderHeader()}</div>
            <div className="m-list">
              <ul className="">{this.renderList()}</ul>
            </div>
          </div>
        </div>
        {this.renderFeedback()}
        <PageVisibility />
      </div>
    );
  }
}

function mapStateToProps({ currentUser, selectedMesh }) {
  return { currentUser, selectedMesh };
}

//////////////////////////////////////////
//////      withPubNub Props     /////////
//////////////////////////////////////////

const channel = "fetchMeshUsers";
const callback = ownProps => {
  ownProps.fetchMeshUsers(ownProps.match.params.meshId);
};

//////////////////////////////////////////
//////   withLogOnMount Props    /////////
//////////////////////////////////////////

const logProps = ownProps => {
  return {
    logType: L.MOUNT,
    componentServed: "mesh-list-wrapper",
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
)(withPubNub(withLogOnMount(ListWrapper, logProps), channel, callback));
