const reqUser = require('../../test/utils/REQ_USER');
const Mesh = require('../../db/models/Mesh');
const { ObjectId } = require('mongoose').Types;

const fetchCurrentUser = async (req, res, next) => {
  try {
    let user = {};
    let userInfo = {};

    const { linkedin, _id, orgId } = req.user;

    if (req.user.userInfo) {
      userInfo = req.user.userInfo;
      userInfo.photos.length > 0
        ? (user['photos'] = userInfo.photos)
        : (user['photos'] = linkedin.photos);
    } else {
      user['photos'] = linkedin.photos;
    }

    user['_id'] = _id;
    user['orgId'] = orgId;
    user['firstName'] = userInfo.firstName || linkedin.firstName;
    user['lastName'] = userInfo.lastName || linkedin.lastName;
    user['url'] = userInfo.url || linkedin.url;
    user['headline'] = userInfo.headline || linkedin.headline;
    user['hiring'] = userInfo.hiring;
    user['lookingForJob'] = userInfo.lookingForJob;
    user['lnId'] = linkedin._id;

    // Checking if isFeedbackProvided

    const meshId = ObjectId(req.params.meshId);
    // const userId = ObjectId('5b662a3479c8797d475f533b');

    const mesh = await Mesh.aggregate([
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
          userId: '$users._id',
          isFeedbackProvided: {
            $cond: {
              if: '$users.feedback',
              then: true,
              else: false
            }
          }
        }
      },
      {
        $match: {
          userId: _id
        }
      }
    ]);

    if (mesh.length > 0) {
      user['isFeedbackProvided'] = mesh[0].isFeedbackProvided;
    } else {
      user['isFeedbackProvided'] = false;
    }

    res.send({ isAuth: true, isCompliant: true, user });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchCurrentUser;
