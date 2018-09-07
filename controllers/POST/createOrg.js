const Org = require("../../db/models/Org");
const latestPolicyUpdateOn = require("../../utils/termsOfUse");
const bcrypt = require("bcrypt");

const createOrg = async (req, res, next) => {
  try {
    const { title, url, description, email, password } = req.body;

    const existingOrg = await Org.findOne({ title });
    if (existingOrg) {
      res.send({
        created: false,
        message: "Name already exists. Please use a different name"
      });
    } else {
      const existingEmail = await Org.findOne({ "auth.email": email });
      if (existingEmail) {
        res.send({ created: false, message: "Email already exists" });
      } else {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            return res.send({
              created: false,
              message: "Some error occured. Please retry later.",
              data: err
            });
          } else {
            const createdAt = new Date().getTime();
            const org = await Org.create({
              title,
              url,
              auth: {
                email,
                password: hash,
                timestamp: createdAt
              },
              description,
              termsOfUse: {
                latestPolicyUpdateOn,
                accepted: true,
                acceptedAt: createdAt
              },
              createdAt
            });
            res.send({
              created: true,
              message: "Organization Created",
              data: org
            });
          }
        });
      }
    }
  } catch (e) {
    next(e);
  }
};

module.exports = createOrg;
