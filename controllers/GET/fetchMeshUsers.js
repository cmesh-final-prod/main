const Mesh = require('../../db/models/Mesh');
const User = require('../../db/models/User');
const dateParser = require('../../utils/dateParser');
const pubnub = require('../../utils/pubnub');
const sortBy = require('sort-by');

// TODO: Perform mesh & users lookup in one aggregate pipeline

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

    match = {
      $match: { _id: { $in: userIds } }
    };

    project = {
      $project: {
        __order: { $indexOfArray: [userIds, '$_id'] },
        firstName: {
          $cond: {
            if: '$userInfo.firstName',
            then: '$userInfo.firstName',
            else: '$linkedin.firstName'
          }
        },
        lastName: {
          $cond: {
            if: '$userInfo.lastName',
            then: '$userInfo.lastName',
            else: '$linkedin.lastName'
          }
        },
        url: {
          $cond: {
            if: '$userInfo.url',
            then: '$userInfo.url',
            else: '$linkedin.url'
          }
        },
        photos: {
          $cond: {
            if: '$userInfo.photos',
            then: '$userInfo.photos',
            else: '$linkedin.photos'
          }
        },
        headline: {
          $cond: {
            if: '$userInfo.headline',
            then: '$userInfo.headline',
            else: '$linkedin.headline'
          }
        },
        hiring: '$userInfo.hiring',
        lookingForJob: '$userInfo.lookingForJob',
        orgId: 1,
        viewed: '',
        bookmarked: ''
      }
    };

    sort = {
      $sort: { __order: 1 }
    };
    const meshUsers = await User.aggregate([match, project, sort]);

    res.send({ isAuth: true, isCompliant: true, meshUsers });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchMeshUsers;
