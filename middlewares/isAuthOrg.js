const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, keys.jwtKey);
    req.orgData = decoded;
    next();
  } catch (e) {
    return res.status(401).send({ isAuth: false, error: e });
  }
};
