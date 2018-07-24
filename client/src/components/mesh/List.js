import React, { Component } from 'react';

// importing components
import InnerPanel from 'components/mesh/InnerPanel';
import ListItem from 'components/mesh/ListItem';

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

  renderOrganizer() {
    const { organizer, isPopulated } = this.props.selectedMesh;

    if (isPopulated) {
      return (
        <ListItem
          key={organizer._id}
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
            photos={user.linkedin.photos[0]}
            headline={user.linkedin.headline}
            profileLink={user.linkedin.url}
          />
        );
      });
    }
  }

  render() {
    const { data } = this.props.selectedMesh;
    const { meshId } = this.props.match.params;
    return (
      <div>
        <InnerPanel title={data.title} meshId={meshId} endDate={data.endDate} />
        <ul className="collection">
          {this.renderOrganizer()}
          {this.renderUsers()}
        </ul>
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
