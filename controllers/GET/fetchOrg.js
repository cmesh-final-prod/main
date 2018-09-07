const Org = require("../../db/models/Org");

const fetchOrg = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const org = await Org.findOne({ _id: orgId });
    if (org) {
      return res.send({ found: true, data: org });
    } else {
      return res.send({ found: false, message: "No Organization Found" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = fetchOrg;
