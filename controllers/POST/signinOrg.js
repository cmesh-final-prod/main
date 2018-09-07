const Org = require("../../db/models/Org");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const signinOrg = async (req, res, next) => {
  try {
    const notFound = {
      found: false,
      message: "Incorrect email / password combination"
    };
    const { email, password } = req.body;

    const existingOrg = await Org.findOne({ "auth.email": email });
    if (existingOrg) {
      bcrypt.compare(password, existingOrg.auth.password, (err, result) => {
        if (err) {
          return res.send(notFound);
        }

        if (result) {
          const token = jwt.sign(
            {
              email: existingOrg.auth.email,
              orgId: existingOrg._id
            },
            keys.jwtKey,
            {
              expiresIn: "5h"
            }
          );

          return res.send({
            found: true,
            message: "Organization found",
            token
          });
        } else {
          return res.send(notFound);
        }
      });
    } else {
      res.send(notFound);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = signinOrg;
