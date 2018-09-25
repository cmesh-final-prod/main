// importing middlewares
const isAuth = require("../middlewares/isAuth");

// importing controllers
const fetchCurrentUser = require("../controllers/GET/fetchCurrentUser");
const associateOrgWithUser = require("../controllers/PUT/associateOrgWithUser");
const editUserInfo = require("../controllers/PUT/editUserInfo");
const addBookmark = require("../controllers/PUT/addBookmark");

// TODO: Add isAuth back to fetch curent user

module.exports = app => {
  app.get("/api/users/:meshId", fetchCurrentUser);
  app.put("/api/users/:userId/add/:orgId", associateOrgWithUser);
  app.put("/api/users/edit/:userId", editUserInfo);
  app.put("/api/users/:userId/bookmark/:bookmarkId", addBookmark);
};
