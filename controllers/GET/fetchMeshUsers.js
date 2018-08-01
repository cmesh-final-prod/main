const Mesh = require('../../db/models/Mesh');
const User = require('../../db/models/User');
const dateParser = require('../../utils/dateParser');
const pubnub = require('../../utils/pubnub');
const sortBy = require('sort-by');

const fetchMeshUsers = async (req, res, next) => {
  try {
    const { meshId } = req.params;
    const mesh = await Mesh.findOne(
      { _id: meshId },
      {
        users: true
      }
    );

    const sortedUsers = mesh.users.sort(sortBy('joinedAt'));

    const userIds = sortedUsers.map(user => {
      if (user.active) {
        return user._id;
      }
    });

    m = {
      $match: { _id: { $in: userIds } }
    };
    a = {
      $project: {
        __order: { $indexOfArray: [userIds, '$_id'] },
        'linkedin.firstName': 1,
        'linkedin.lastName': 1,
        'linkedin.url': 1,
        'linkedin.photos': 1,
        'linkedin.headline': 1
      }
    };
    s = {
      $sort: { __order: 1 }
    };
    const meshUsers = await User.aggregate([m, a, s]);

    res.send({ isAuth: true, isCompliant: true, meshUsers });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchMeshUsers;
