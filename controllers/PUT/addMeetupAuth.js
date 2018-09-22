const Org = require("../../db/models/Org");

// importing controllers
const addMeetupGroup = require("../PUT/addMeetupGroup");

// importing utils
const axios = require("../../utils/axios");

const addMeetupAuth = async (req, accessToken, refreshToken, profile, done) => {
  try {
    const { orgId } = req.session;
    const memberId = profile.id;
    const response = await axios.fetchMeetupGroups(accessToken);
    const organizedGroups = await response.filter(group => {
      return group.self.role;
    });

    const summary = await organizedGroups.map(group => {
      return {
        groupId: group.id,
        name: group.name,
        urlName: group.urlname,
        role: group.self.role
      };
    });

    if (organizedGroups.length === 0) {
      return done(null, {
        info: {
          id: orgId,
          provider: "meetup",
          isFound: false
        }
      });
    } else if (organizedGroups.length === 1) {
      const urlName = organizedGroups[0].urlname;

      await addMeetupGroup(
        orgId,
        memberId,
        accessToken,
        refreshToken,
        urlName,
        summary,
        done
      );
    } else {
      axios.addMeetupGroupSummary(
        orgId,
        summary,
        memberId,
        accessToken,
        refreshToken
      );

      return done(null, {
        info: {
          id: orgId,
          provider: "meetup",
          isMultiple: true
        }
      });
    }
  } catch (e) {
    return done(e, null);
  }
};

module.exports = addMeetupAuth;
