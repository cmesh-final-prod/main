const Mesh = require('../../db/models/Mesh');
const dateParser = require('../../utils/dateParser');
const pubnub = require('../../utils/pubnub');
const requestIp = require('request-ip');

const fetchMeshes = async (req, res, next) => {
  try {
    // ip = req.ip;
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip2 =
      (req.headers['x-forwarded-for'] || '').split(',').pop() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    ip3 = requestIp.getClientIp(req);
    console.log('-----------', ip);
    const { lng, lat } = req.query;
    const now_milli = new Date().getTime();

    const geoNear = {
      $geoNear: {
        query: {
          startDate: { $lt: now_milli },
          endDate: { $gt: now_milli }
        },
        near: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        distanceField: 'dist.calculated',
        maxDistance: 200,
        spherical: true
      }
    };

    const sort = {
      $sort: { dist: 1 }
    };

    const lookup1 = {
      $lookup: {
        from: 'orgs',
        localField: 'orgId',
        foreignField: '_id',
        as: 'ORG'
      }
    };

    const lookup2 = {
      $lookup: {
        from: 'users',
        localField: 'users._id',
        foreignField: '_id',
        as: 'USERS'
      }
    };

    const project = {
      $project: {
        _id: 0,
        createdAt: 1,
        orgId: 1,
        organizerId: 1,
        endDate: 1,
        meshId: '$_id',
        orgTitle: '$ORG.title',
        title: '$eventDetails.title',
        distance: '$dist',
        totalUsers: { $size: '$users' },
        totalHiring: {
          $reduce: {
            input: '$USERS.userInfo.hiring',
            initialValue: 0,
            in: {
              $cond: {
                if: { $eq: ['$$this', true] },
                then: { $add: ['$$value', 1] },
                else: { $add: ['$$value', 0] }
              }
            }
          }
        },
        totalLookingForJob: {
          $reduce: {
            input: '$USERS.userInfo.lookingForJob',
            initialValue: 0,
            in: {
              $cond: {
                if: { $eq: ['$$this', true] },
                then: { $add: ['$$value', 1] },
                else: { $add: ['$$value', 0] }
              }
            }
          }
        }
      }
    };

    const nearByAndActiveMeshes = await Mesh.aggregate([
      geoNear,
      sort,
      lookup1,
      lookup2,
      project
    ]);

    if (nearByAndActiveMeshes.length > 0) {
      res.send({
        isFound: true,
        publicInfo: nearByAndActiveMeshes,
        ip,
        ip2,
        ip3
      });
    } else {
      res.send({ isFound: false });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = fetchMeshes;
