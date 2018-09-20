const Org = require("../../db/models/Org");
const bcrypt = require("bcrypt");
const jwt = require("../../utils/jwt");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");

const signinOrg = (req, res, next) => {
  try {
    const token = jwt.encode(req.user._id);
    res.send({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = signinOrg;
