const fetchCurrentUser = (req, res, next) => {
  try {
    let user = {};
    let userInfo = {};

    const { linkedin, _id, orgId } = req.user;

    if (req.user.userInfo) {
      userInfo = req.user.userInfo;
      userInfo.photos.length > 0
        ? (user['photos'] = userInfo.photos)
        : (user['photos'] = linkedin.photos);
    } else {
      user['photos'] = linkedin.photos;
    }

    user['_id'] = _id;
    user['orgId'] = orgId;
    user['firstName'] = userInfo.firstName || linkedin.firstName;
    user['lastName'] = userInfo.lastName || linkedin.lastName;
    user['url'] = userInfo.url || linkedin.url;
    user['headline'] = userInfo.headline || linkedin.headline;
    user['hiring'] = userInfo.hiring;
    user['lookingForJob'] = userInfo.lookingForJob;
    user['lnId'] = linkedin._id;

    res.send({ isAuth: true, isCompliant: true, user });
  } catch (e) {
    next(e);
  }
};

module.exports = fetchCurrentUser;
