const User = require('../../db/models/User');
const pubnub = require('../../utils/pubnub');

const editUserInfo = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userInfoProps = req.body;
    let userInfo = {};
    for (var key in userInfoProps) {
      if (userInfoProps.hasOwnProperty(key)) {
        const prop = `userInfo.${key}`;
        userInfo[prop] = userInfoProps[key];
      }
    }

    await User.update(
      {
        _id: userId
      },
      userInfo
    );

    pubnub.dispatchAction('fetchMeshUsers');
    pubnub.dispatchAction('fetchMeshes');

    res.send({ message: 'UserInfo has been updated' });
  } catch (e) {
    next(e);
  }
};

module.exports = editUserInfo;
