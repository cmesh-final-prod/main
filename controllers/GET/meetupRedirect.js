module.exports = (req, res, next) => {
  const { isFound, isSuccess, isMultiple } = req.user.info;

  if (isMultiple) {
    res.redirect(`/manage/host/?isMultiple=true`);
  } else if (isSuccess) {
    res.redirect(`/manage/host/?isFound=true&isSuccess=true`);
  } else if (isFound) {
    res.redirect(`/manage/host/?isFound=true&isSuccess=false`);
  } else {
    res.redirect(`/manage/host/?isFound=false&isSuccess=false`);
  }
};
