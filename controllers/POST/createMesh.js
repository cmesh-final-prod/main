const Mesh = require('../../db/models/Mesh');
const Org = require('../../db/models/Org');
const dateParser = require('../../utils/dateParser');
const pubnub = require('../../utils/pubnub');

const createMesh = async (req, res, next) => {
  try {
    const {
      title,
      coordinates,
      duration,
      startDate,
      description,
      address,
      primaryOrganizerId
    } = req.body;

    const source = 'manual';

    const startDate_utc = dateParser.utc(startDate);
    const endDate_utc = dateParser.addHours(startDate_utc, duration);
    const startDate_utc_pre = dateParser.subtractHours(startDate_utc, 1);

    const startDate_milli = dateParser.milli(startDate);
    const endDate_milli = dateParser.milli(endDate_utc);
    const createdAt = new Date().getTime();

    const { orgId } = req.params;

    const mesh = await Mesh.create({
      eventDetails: {
        title,
        description,
        address,
        startDate: startDate_utc,
        endDate: endDate_utc
      },
      startDate: startDate_milli,
      endDate: endDate_milli,
      duration,
      source,
      geometry: {
        type: 'Point',
        coordinates
      },
      orgId,
      createdAt
    });

    await Mesh.update(
      {
        _id: mesh._id,
        'users._id': { $ne: primaryOrganizerId }
      },
      {
        $addToSet: {
          users: {
            _id: primaryOrganizerId,
            joinedAt: createdAt
          }
        },
        organizerId: primaryOrganizerId
      }
    );

    pubnub.dispatchAction('fetchMeshes');

    res.send({ message: 'Mesh Saved' });
  } catch (e) {
    next(e);
  }
};

module.exports = createMesh;
