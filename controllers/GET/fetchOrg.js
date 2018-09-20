const Org = require("../../db/models/Org");

const fetchOrg = async (req, res, next) => {
  try {
    const org = req.user;
    const { _id, title, url, description, photo, primaryOrganizerId } = org;
    let urlName;

    org.meetup ? (urlName = org.meetup.urlName) : "";

    const org_public = {
      title,
      url,
      description,
      photo,
      primaryOrganizerId,
      urlName
    };

    return res.send({
      data: org_public,
      orgId: _id
    });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchOrg;
