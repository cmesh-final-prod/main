const Mesh = require('../db/models/Mesh');
const Organizer = require('../db/models/Organizer');
const dateParser = require('../utils/dateParser');
const pubnub = require('../utils/pubnub');

const createMesh = async (req, res, next) => {
  try {
    // event details
    const {
      title,
      coordinates,
      duration,
      startDate,
      description,
      address
    } = req.body;

    // source
    const source = 'manual';

    // dates
    const startDate_utc = dateParser.utc(startDate);
    const endDate_utc = dateParser.addHours(startDate_utc, duration);
    const startDate_utc_pre = dateParser.subtractHours(startDate_utc, 1);
    // const endDate_utc_post = dateParser.addHours(endDate_utc, 1);
    const createdAt = new Date().getTime();

    // organizer
    const { organizerId } = req.params;

    const mesh = await Mesh.create({
      eventDetails: {
        title,
        description,
        address,
        startDate: startDate_utc,
        endDate: endDate_utc
      },
      startDate: startDate_utc_pre,
      endDate: endDate_utc,
      duration,
      source,
      geometry: {
        type: 'Point',
        coordinates
      },
      organizer: organizerId,
      createdAt
    });

    await pubnub.dispatchAction('fetchMeshes');

    await Organizer.update(
      { _id: organizerId },
      {
        $addToSet: { meshes: mesh._id }
      }
    );

    res.send({ message: 'Mesh Saved' });
  } catch (e) {
    next(e);
  }
};

module.exports = createMesh;
