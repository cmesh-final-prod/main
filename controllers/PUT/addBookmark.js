const addBookmark = (req, res, next) => {
  try {
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = addBookmark;
