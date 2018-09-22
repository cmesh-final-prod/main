// importing models
const Org = require("../../db/models/Org");

// importing utils
const axios = require("../../utils/axios");
const jwt = require("../../utils/jwt");

const addMeetupGroup = async (
  orgId,
  memberId,
  accessToken,
  refreshToken,
  urlName,
  summary,
  done
) => {
  const existingMeetupOrg = await Org.findOne({ "meetup.urlName": urlName });
  if (existingMeetupOrg) {
    if (existingMeetupOrg._id.toString() === orgId) {
      axios.syncMeetupsAndMeshes(orgId);
      return done(null, {
        info: {
          id: orgId,
          provider: "meetup",
          isFound: true,
          isSuccess: true
        }
      });
    } else {
      return done(null, {
        info: {
          id: orgId,
          provider: "meetup",
          isFound: true,
          isSuccess: false
        }
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
        meetup: {
          summary,
          memberId,
          accessToken: jwt.encode(accessToken),
          refreshToken: jwt.encode(refreshToken),
          urlName,
          groupId: id,
          category: {
            _id: category.id,
            name: category.name,
            metaCategoryId: meta_category.id,
            metaCategoryName: meta_category.name
          },
          url: link,
          memberCount: members
        }
      }
    );

    axios.syncMeetupsAndMeshes(orgId);

    return done(null, {
      info: {
        id: orgId,
        provider: "meetup",
        isFound: false,
        isSuccess: true
      }
    });
  }
};

module.exports = addMeetupGroup;
