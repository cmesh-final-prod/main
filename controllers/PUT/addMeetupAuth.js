const Org = require("../../db/models/Org");

const addMeetupAuth = async (req, accessToken, refreshToken, profile, done) => {
  try {
    // cron job test
    const CronJob = require("cron").CronJob;
    console.log("Before job instantiation");
    const job = new CronJob("* * * * * *", function() {
      const d = new Date();
      console.log("Every Second:", accessToken);
    });
    console.log("After job instantiation");
    job.start();

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
