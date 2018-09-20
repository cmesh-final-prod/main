const Org = require("../../db/models/Org");

const updateOrg = async (req, res, next) => {
  try {
    const org = req.user;
    const orgId = org._id;
    const props = req.body;
    const lastSync = new Date().getTime();
    let orgProps = {};

    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        orgProps[key] = props[key];
      }
    }

    await Org.update({ _id: orgId }, orgProps);
    res.send({ message: "Org Updated" });
  } catch (e) {
    next(e);
  }
};

module.exports = updateOrg;
