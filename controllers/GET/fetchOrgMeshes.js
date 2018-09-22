const Mesh = require("../../db/models/Mesh");

const fetchOrgMeshes = async (req, res, next) => {
  try {
    const org = req.user;
    const orgId = org._id;
    const orgMeshes = await Mesh.find({ orgId }).sort({ startDate: 1 });
    res.send({ orgMeshes });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchOrgMeshes;
