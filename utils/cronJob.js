const CronJob = require("cron").CronJob;
const Org = require("../db/models/Org");

// importing utils
const axios = require("./axios");

console.log("Before job instantiation");
const job = new CronJob("0 */20 * * * *", async function() {
  const date = new Date();
  try {
    const orgs = await Org.find({ "meetup.urlName": { $exists: true } });

    if (orgs.length > 0) {
      orgs.map(org => {
        const orgId = org._id;
        axios.syncMeetupsAndMeshes(orgId);
      });
      console.log(
        "-----------CRON JOB-----------",
        date,
        "Success: true",
        `Message: ${orgs.length} orgs synced`
      );
    } else {
      console.log(
        "-----------CRON JOB-----------",
        date,
        "Success: false",
        `Message: ${orgs.length} orgs with meetup urlNames found`
      );
    }
  } catch (e) {
    console.log(
      "-----------CRON JOB-----------",
      date,
      "Success: false",
      "Error: ",
      e
    );
  }
});

job.start();
