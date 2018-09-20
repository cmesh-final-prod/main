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
    }

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
        res.send({ message: "Mesh created" });
      } else if (updatedAt >= lastSync) {
        await axios.updateMesh(meshProps, eventProps, coordinates, eventId);
        axios.updateLastSync(orgId);
        console.log("-------------- mesh updated w/ org: ", title);
        return res.send({ message: "Mesh updated" });
      } else {
        console.log("-------------- no changes ", title);
        return res.send({ message: "No changes" });
      }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = syncMeetups;

//
// else {
//   const orgs = await Org.find(
//     { "meetup.urlName": { $exists: true } },
//     { "meetup.urlName": true, "meetup.accessToken": true, lastSync: true }
//   );
//
//   await orgs.map(async org => {
//     const orgId = org._id;
//
//     const { lastSync } = org;
//     const { urlName, accessToken } = org.meetup;
//     const meetups = await axios.fetchMeetups(urlName, accessToken);
//
//     await meetups.map(async meetup => {
//       const eventId = meetup.id;
//       const title = meetup.name;
//       const { lat, lon } = meetup.venue;
//       const coordinates = [lon, lat];
//       const address = {
//         street: meetup.venue.address_1,
//         city: meetup.venue.city,
//         state: meetup.venue.state,
//         country: meetup.venue.country
//       };
//       const startDate = meetup.time;
//       const duration = meetup.duration / 1000 / 3600;
//       const createdAt = meetup.created;
//       const updatedAt = meetup.updated;
//
//       const meshProps = {
//         eventId,
//         duration,
//         provider,
//         address
//       };
//
//       const eventProps = {
//         title,
//         startDate,
//         address
//       };
//
//       if (updatedAt >= lastSync) {
//         await axios.updateMesh(meshProps, eventProps, coordinates, eventId);
//         axios.updateLastSync(orgId);
//         console.log("-------------- mesh updated: ", title);
//       } else if (createdAt >= lastSync) {
//         await axios.createMesh(meshProps, eventProps, coordinates, orgId);
//         axios.updateLastSync(orgId);
//         console.log("-------------- mesh created: ", title);
//       } else {
//         console.log("-------------- no changes ");
//       }
//     });
//   });
//
//   res.send({ message: "Sync succeeded", timestamp: new Date().getTime() });
// }
