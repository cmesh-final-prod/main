import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import keys from 'config/keys';

export default (ChildComponent, channel, callback) => {
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
        channels: [channel],
        withPresence: true
      });
      this.pubnub.getMessage(channel, () => {
        callback(this.props);
      });
    }

    componentWillUnmount() {
      this.pubnub.unsubscribe({
        channels: [channel]
      });
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};
