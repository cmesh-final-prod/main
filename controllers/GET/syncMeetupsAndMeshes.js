const Org = require("../../db/models/Org");

// importing utils
const axios = require("../../utils/axios");
const jwt = require("../../utils/jwt");

const syncMeetups = async (req, res, next) => {
  try {
    const org = req.user;
    const { lastSync } = org;
    const orgId = org._id;
    const provider = "meetup";
    const { urlName, accessToken } = org.meetup;
    const decoded_accessToken = jwt.decode(accessToken).sub;
    const meetups = await axios.fetchMeetups(urlName, decoded_accessToken);

    if (!meetups) {
      return res.send({ message: "Invalid meetup oauth credentials" });
    } else {
      await meetups.map(async meetup => {
        const eventId = meetup.id;
        const title = meetup.name;
        const { lat, lon } = meetup.venue;
        const coordinates = [lon, lat];
        const address = {
          street: meetup.venue.address_1,
          city: meetup.venue.city,
          state: meetup.venue.state,
          country: meetup.venue.country
        };
        const startDate = meetup.time;
        const duration = meetup.duration / 1000 / 3600;
        const createdAt = meetup.created;
        const updatedAt = meetup.updated;

        const meshProps = {
          eventId,
          duration,
          provider,
          address
        };

        const eventProps = {
          title,
          startDate,
          address
        };

        if (!lastSync) {
          await axios.createMesh(meshProps, eventProps, coordinates, orgId);
          axios.updateLastSync(orgId);
          console.log("-------------- mesh created w/ org: ", title);
        } else {
          if (updatedAt >= lastSync) {
            await axios.updateMesh(meshProps, eventProps, coordinates, eventId);
            axios.updateLastSync(orgId);
            console.log("-------------- mesh updated w/ org: ", title);
          } else {
            console.log(
              "-------------- no changes ",
              title,
              lastSync,
              updatedAt
            );
          }
        }
      });

      res.send({ message: "Sync complete" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = syncMeetups;
