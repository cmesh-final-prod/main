const Mesh = require('../../db/models/Mesh');
const dateParser = require('../../utils/dateParser');
const pubnub = require('../../utils/pubnub');

const exitMeshUser = async (req, res, next) => {
  try {
    const { meshId, userId } = req.params;
    const exitedAt = new Date().getTime();
    await Mesh.update(
      {
        _id: meshId,
        'users._id': userId
      },
      {
        $set: {
          'users.$.active': false,
          'users.$.exitedAt': exitedAt
        }
      }
    );

    await pubnub.dispatchAction('fetchMeshUsers');

    res.send({ message: 'User Exited' });
  } catch (e) {
    next(e);
  }
};

module.exports = exitMeshUser;
