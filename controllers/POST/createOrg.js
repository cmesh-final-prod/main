const Org = require("../../db/models/Org");
const latestPolicyUpdateOn = require("../../utils/termsOfUse");
const bcrypt = require("bcrypt");
const jwt = require("../../utils/jwt");

const createOrg = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingOrg = await Org.findOne({ "auth.email": email });
    if (existingOrg) {
      res.send({ created: false, message: "Email already exists" });
    } else {
      const createdAt = new Date().getTime();
      const org = await Org.create({
        auth: {
          email,
          password,
          timestamp: createdAt
        },
        termsOfUse: {
          latestPolicyUpdateOn,
          accepted: true,
          acceptedAt: createdAt
        },
        createdAt
      });
      res.json({
        created: true,
        message: "Organization Created",
        token: jwt.encode(org._id)
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = createOrg;
