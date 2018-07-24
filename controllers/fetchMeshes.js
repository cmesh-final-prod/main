const Mesh = require('../db/models/Mesh');
const dateParser = require('../utils/dateParser');
const pubnub = require('../utils/pubnub');

const fetchMeshes = async (req, res, next) => {
  try {
    const { lng, lat } = req.query;
    const now_milli = new Date().getTime();

    const nearByAndActiveMeshes = await Mesh.aggregate([
      {
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
      },
      {
        $sort: { createdAt: 1 }
      }
    ]);

    if (nearByAndActiveMeshes.length > 0) {
      const publicInfo = await nearByAndActiveMeshes.map(mesh => {
        return {
          meshId: mesh._id,
          title: mesh.eventDetails.title,
          numberOfAttendees: mesh.users.length,
          distance: mesh.dist,
          endDate: mesh.endDate,
          createdAt: mesh.createdAt
        };
      });

      res.send({ isFound: true, publicInfo });
    } else {
      res.send({ isFound: false });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = fetchMeshes;
