const PubNub = require('pubnub');
const keys = require('../config/keys');

const pubnub = new PubNub({
  publishKey: keys.pubnubPublishKey,
  subscribeKey: keys.pubnubSubscribeKey
});

module.exports = {
  dispatchAction(channel) {
    const config = {
      channel,
      message: {}
    };

    pubnub.publish(config, (status, response) => {
      console.log(status, response);
    });
  }
};
