// importing models
const Org = require("../../db/models/Org");

module.exports = async (req, res, next) => {
  try {
    const org = req.user;

    const response = await Org.findOne(
      { _id: org._id },
      {
        "meetup.summary": true
      }
    );

    if (response) {
      res.send({ summary: response.meetup.summary });
    } else {
      res.send({ summary: null });
    }
  } catch (e) {
    next(e);
  }
};
