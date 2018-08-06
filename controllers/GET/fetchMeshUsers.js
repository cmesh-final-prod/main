const Mesh = require('../../db/models/Mesh');
const User = require('../../db/models/User');
const dateParser = require('../../utils/dateParser');
const pubnub = require('../../utils/pubnub');
const sortBy = require('sort-by');
const { ObjectId } = require('mongoose').Types;

// TODO: Perform mesh & users lookup in one aggregate pipeline

const fetchMeshUsers = async (req, res, next) => {
  try {
    const meshId = ObjectId(req.params.meshId);

    const meshUsers = await Mesh.aggregate([
      {
        $match: {
          _id: meshId
        }
      },
      {
        $unwind: '$users'
      },
      {
        $project: {
          _id: 0,
          orgId: 1,
          userId: '$users._id',
          active: '$users.active',
          joinedAt: '$users.joinedAt',
          exitedAt: '$users.exitedAt'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'info'
        }
      },
      {
        $sort: { joinedAt: 1 }
      },
      {
        $unwind: '$info'
      },
      {
        $project: {
          filteredOrgIds: {
            $filter: {
              input: '$info.orgId',
              cond: { $eq: ['$$this', '$orgId'] }
            }
          },
          userId: 1,
          active: 1,
          joinedAt: 1,
          exitedAt: 1,
          firstName: {
            $cond: {
              if: '$info.userInfo.firstName',
              then: '$info.userInfo.firstName',
              else: '$info.linkedin.firstName'
            }
          },
          lastName: {
            $cond: {
              if: '$info.userInfo.lastName',
              then: '$info.userInfo.lastName',
              else: '$info.linkedin.lastName'
            }
          },
          url: {
            $cond: {
              if: '$info.userInfo.url',
              then: '$info.userInfo.url',
              else: '$info.linkedin.url'
            }
          },
          photos: {
            $cond: {
              if: {
                $and: [
                  '$info.userInfo.photos',
                  { $gt: [{ $size: '$info.userInfo.photos' }, 0] }
                ]
              },
              then: '$info.userInfo.photos',
              else: '$info.linkedin.photos'
            }
          },
          headline: {
            $cond: {
              if: '$info.userInfo.headline',
              then: '$info.userInfo.headline',
              else: '$info.linkedin.headline'
            }
          },
          hiring: '$info.userInfo.hiring',
          lookingForJob: '$info.userInfo.lookingForJob'
        }
      },
      {
        $project: {
          userId: 1,
          active: 1,
          joinedAt: 1,
          exitedAt: 1,
          firstName: 1,
          lastName: 1,
          url: 1,
          photos: 1,
          headline: 1,
          hiring: 1,
          lookingForJob: 1,
          isOrganizer: {
            $cond: {
              if: { $gt: [{ $size: '$filteredOrgIds' }, 0] },
              then: true,
              else: false
            }
          }
        }
      }
    ]);

    res.send({ isAuth: true, isCompliant: true, meshUsers });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = fetchMeshUsers;
