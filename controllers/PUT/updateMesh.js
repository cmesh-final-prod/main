const Mesh = require("../../db/models/Mesh");

// importing utils
const pubnub = require("../../utils/pubnub");
const dateParser = require("../../utils/dateParser");

const updateMesh = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { meshProps, eventProps, coordinates } = req.body;
    let meshProps_object = {};
    let startDate, endDate;

    for (var key in meshProps) {
      if (meshProps.hasOwnProperty(key)) {
        meshProps_object[key] = meshProps[key];
      }
    }

    for (var key in eventProps) {
      if (eventProps.hasOwnProperty(key)) {
        const prop = `eventDetails.${key}`;
        meshProps_object[prop] = eventProps[key];
      }
    }

    if (coordinates) {
      const prop = "geometry.coordinates";
      meshProps_object[prop] = coordinates;
    }

    if (eventProps.startDate) {
      startDate = eventProps.startDate;
    }

    if (meshProps.duration) {
      const { duration } = meshProps;
      const startDate_from_meetup = eventProps.startDate;
      const startDate_utc = dateParser.utc(startDate_from_meetup);
      const endDate_utc = dateParser.addHours(startDate_utc, duration);
      const endDate_milli = dateParser.milli(endDate_utc);
      endDate = endDate_milli;
    }

    await Mesh.update({ eventId }, { ...meshProps_object, startDate, endDate });

    const mesh = await Mesh.findOne({ eventId });

    console.log("-----------mesh updated: ", mesh);

    pubnub.dispatchAction("fetchMeshes");
    pubnub.dispatchAction("fetchOrgMeshes");

    res.send({ message: "Mesh updated" });
  } catch (e) {
    next(e);
  }
};

module.exports = updateMesh;
