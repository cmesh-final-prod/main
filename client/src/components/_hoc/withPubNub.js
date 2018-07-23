import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import keys from 'config/keys';

export default (ChildComponent, action) => {
  class ComposedComponent extends Component {
    constructor(props) {
      super(props);
      this.pubnub = new PubNubReact({
        subscribeKey: keys.pubnubSubscribeKey
      });
      this.pubnub.init(this);
    }

    componentWillMount() {
      this.pubnub.subscribe({
        channels: [action],
        withPresence: true
      });
      this.pubnub.getMessage(action, () => {
        if (action === 'fetchMeshes') {
          this.props.fetchMeshes(this.props.lng, this.props.lat);
        } else if (action === 'fetchMeshUsers') {
          const { meshId } = this.props.match.params;
          this.props.fetchMeshUsers(meshId);
        }
      });
    }

    componentWillUnmount() {
      this.pubnub.unsubscribe({
        channels: [action]
      });
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};
