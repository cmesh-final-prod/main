const Org = require("../../db/models/Org");

const addMeetupAuth = async (req, profile, done) => {
  try {
    const { orgId } = req.session;

    console.log(profile);

    await Org.update(
      { _id: orgId },
      {
        meetup: { _id: profile.id }
      }
    );

    return done(null, { info: { id: orgId, provider: "meetup" } });
  } catch (e) {
    return done(e, null);
  }
};

module.exports = addMeetupAuth;
