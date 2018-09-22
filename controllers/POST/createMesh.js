const Mesh = require("../../db/models/Mesh");
const Org = require("../../db/models/Org");
const dateParser = require("../../utils/dateParser");
const pubnub = require("../../utils/pubnub");

const createMesh = async (req, res, next) => {
  try {
    const {
      title,
      coordinates,
      duration,
      startDate,
      address,
      primaryOrganizerId,
      eventId,
      provider
    } = req.body;

    const orgId = req.user._id;

    // check if eventid already exists
    const existingMesh = await Mesh.findOne({ eventId });

    if (existingMesh) {
      return res.send({ message: "Mesh already exists" });
    } else {
      const startDate_utc = dateParser.utc(startDate);
      const endDate_utc = dateParser.addHours(startDate_utc, duration);
      const startDate_utc_pre = dateParser.subtractHours(startDate_utc, 1);

      const startDate_milli = dateParser.milli(startDate);
      const endDate_milli = dateParser.milli(endDate_utc);
      const createdAt = new Date().getTime();

      const mesh = await Mesh.create({
        eventId,
        eventDetails: {
          title,
          address,
          startDate: startDate_utc,
          endDate: endDate_utc
        },
        startDate: startDate_milli,
        endDate: endDate_milli,
        duration,
        provider,
        geometry: {
          type: "Point",
          coordinates
        },
        orgId,
        createdAt
      });

      // adding organizer as the default user of that mesh
      if (primaryOrganizerId) {
        await Mesh.update(
          {
            _id: mesh._id,
            "users._id": { $ne: primaryOrganizerId }
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
      }

      pubnub.dispatchAction("fetchMeshes");
      // pubnub.dispatchAction(`fetchOrgMeshes/?orgId=${orgId}`);
      pubnub.dispatchAction("fetchOrgMeshes");

      res.send({ message: "Mesh Saved" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = createMesh;
