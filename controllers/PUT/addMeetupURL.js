// importing models
const Org = require("../../db/models/Org");

// importing utils
const axios = require("../../utils/axios");

module.exports = async (req, res, next) => {
  try {
    const org = req.user;
    const orgId = org._id;
    const { urlName } = req.params;

    const existingMeetupOrg = await Org.findOne({ "meetup.urlName": urlName });

    if (existingMeetupOrg) {
      if (existingMeetupOrg._id === orgId) {
        axios.syncMeetupsAndMeshes(orgId);
        return res.send({
          isFound: true,
          isSuccess: true,
          message: "urlName already linked to THIS org"
        });
      } else {
        return res.send({
          isFound: true,
          isSuccess: false,
          message: "urlName already linked to ANOTHER org"
        });
      }
    } else {
      const response = await axios.fetchMeetupGroupInfo(urlName);
      const {
        id,
        name,
        link,
        description,
        city,
        state,
        country,
        members,
        category,
        meta_category,
        group_photo,
        timezone
      } = response;

      let photo;
      group_photo ? (photo = group_photo.photo_link) : "";
      description_clean = description.replace(/<[^>]*>/gi, "");

      await Org.update(
        { _id: orgId },
        {
          title: name,
          addess: {
            city,
            state,
            country
          },
          description: description_clean,
          timeZone: timezone,
          photo,
          "meetup.urlName": urlName,
          "meetup.groupId": id,
          "meetup.category": {
            _id: category.id,
            name: category.name,
            metaCategoryId: meta_category.id,
            metaCategoryName: meta_category.name
          },
          "meetup.url": link,
          "meetup.memberCount": members
        }
      );

      axios.syncMeetupsAndMeshes(orgId);

      return res.send({
        isFound: false,
        isSuccess: true,
        message: "urlName NOW linked to THIS org"
      });
    }
  } catch (e) {
    next(e);
  }
};
