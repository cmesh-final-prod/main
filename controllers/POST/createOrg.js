const Org = require('../../db/models/Org');
const latestPolicyUpdateOn = require('../../utils/termsOfUse');

const createOrg = async (req, res, next) => {
  try {
    const { title, url, description } = req.body;

    const existingOrg = await Org.findOne({ title });
    if (existingOrg) {
      res.send({
        created: false,
        message: 'Organization already exists, please use a different name'
      });
    } else {
      const createdAt = new Date().getTime();

      const org = await Org.create({
        title,
        url,
        description,
        termsOfUse: {
          latestPolicyUpdateOn,
          accepted: true,
          acceptedAt: createdAt
        },
        createdAt
      });

      res.send({ created: true, message: 'Organization Created', data: org });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = createOrg;
