import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import keys from 'config/keys';

// importing components
import InnerPanel from 'components/mesh/InnerPanel';
import ListItem from 'components/mesh/ListItem';

// container elements
import { connect } from 'react-redux';
import * as actions from 'actions';

// TODO: Move dev keys and prod keys into separate files

class List extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      subscribeKey: keys.pubnubSubscribeKey
    });
    this.pubnub.init(this);
  }
  componentWillMount() {
    const { meshId } = this.props.match.params;
    this.props.fetchMeshOrganizer(meshId);
    this.props.fetchMeshUsers(meshId);

    this.pubnub.subscribe({
      channels: ['fetchMeshUsers'],
      withPresence: true
    });
    this.pubnub.getMessage('fetchMeshUsers', () => {
      const { meshId } = this.props.match.params;
      this.props.fetchMeshUsers(meshId);
    });
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['fetchMeshUsers']
    });
  }

  renderOrganizer() {
    const { organizer } = this.props.selectedMesh;
    return (
      <ListItem
        key={organizer._id}
        photos={organizer.linkedin.photos[0]}
        headline={organizer.linkedin.headline}
        profileLink={organizer.linkedin.url}
      />
    );
  }

  renderUsers() {
    const { users } = this.props.selectedMesh;
    return users.map(user => {
      return (
        <ListItem
          key={user._id}
          photos={user.linkedin.photos[0]}
          headline={user.linkedin.headline}
          profileLink={user.linkedin.url}
        />
      );
    });
  }

  render() {
    const { data } = this.props.selectedMesh;
    const { meshId } = this.props.match.params;
    return (
      <div>
        <InnerPanel title={data.title} meshId={meshId} />
        <ul className="collection">
          {this.renderOrganizer()}
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ selectedMesh, auth }) {
  return { selectedMesh, auth };
}

export default connect(
  mapStateToProps,
  actions
)(List);
