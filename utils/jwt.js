const jwt = require("jwt-simple");
const keys = require("../config/keys");

module.exports = {
  encode(info) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: info, iat: timestamp }, keys.jwtKey);
  },

  decode(token) {
    const secret = keys.jwtKey;
    return jwt.decode(token, secret);
  }
};
