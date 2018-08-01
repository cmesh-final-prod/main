const Mesh = require('../../db/models/Mesh');
const User = require('../../db/models/User');
const dateParser = require('../../utils/dateParser');
const pubnub = require('../../utils/pubnub');

const addMeshUser = async (req, res, next) => {
  try {
    const { meshId, userId } = req.params;
    const joinedAt = new Date().getTime();

    await Mesh.update(
      {
        _id: meshId,
        'users._id': { $ne: userId }
      },
      {
        $addToSet: {
          users: {
            _id: userId,
            joinedAt
          }
        }
      }
    );

    await pubnub.dispatchAction('fetchMeshUsers');

    const mesh = await Mesh.findOne({ _id: meshId });

    await User.update(
      {
        _id: userId
      },
      {
        $addToSet: { meshes: mesh }
      }
    );

    res.send({ message: 'User saved' });
  } catch (e) {
    next(e);
  }
};

module.exports = addMeshUser;
