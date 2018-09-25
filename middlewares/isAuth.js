const User = require("../db/models/User");
const latestPolicyUpdateOn = require("../utils/termsOfUse");
const dateParser = require("../utils/dateParser");

module.exports = async (req, res, next) => {
  try {
    if (!req.user) {
      res.send({ isAuth: false, isCompliant: false });
    } else {
      const { lnId } = req.user.linkedin;
      const terms = await User.findOne(
        { "linkedin.lnId": lnId },
        { termsOfUse: true }
      );
      const latestPolicyAccepted =
        terms.termsOfUse[terms.termsOfUse.length - 1].latestPolicyUpdateOn;

      if (dateParser.utc(latestPolicyAccepted) === latestPolicyUpdateOn) {
        next();
      } else {
        res.send({ isAuth: true, isCompliant: false });
      }
    }
  } catch (e) {
    res.send({ error: e });
  }
};
