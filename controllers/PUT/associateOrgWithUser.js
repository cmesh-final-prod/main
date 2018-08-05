const User = require('../../db/models/User');

const associateOrgWithUser = async (req, res, next) => {
  try {
    const { userId, orgId } = req.params;
    const user = await User.update(
      {
        _id: userId
      },
      {
        $addToSet: {
          orgId
        }
      }
    );
    res.send({ message: 'Org has been associated' });
  } catch (e) {
    next(e);
  }
};

module.exports = associateOrgWithUser;
