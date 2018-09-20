const passport = require("passport");

// importing controllers
const fetchMeshes = require("../controllers/GET/fetchMeshes");
const fetchMeshUsers = require("../controllers/GET/fetchMeshUsers");
const addMeshUser = require("../controllers/PUT/addMeshUser");
const exitMeshUser = require("../controllers/PUT/exitMeshUser");
const createMesh = require("../controllers/POST/createMesh");
const addMeshFeedback = require("../controllers/PUT/addMeshFeedback");
const updateMesh = require("../controllers/PUT/updateMesh");

// importing middlewares
const isAuth = require("../middlewares/isAuth");
const isOrgAuth = passport.authenticate("jwt", { session: false });

// TODO: Add isAuth middleware back to protected routes

module.exports = app => {
  app.get("/api/meshes", fetchMeshes);
  app.get("/api/meshes/:meshId", fetchMeshUsers);
  app.put("/api/meshes/:eventId/update", updateMesh);
  app.put("/api/meshes/:meshId/add/:userId", addMeshUser);
  app.put("/api/meshes/:meshId/exit/:userId", isAuth, exitMeshUser);
  app.put("/api/meshes/:meshId/feedback/:userId", addMeshFeedback);

  // protected routes
  app.post("/api/meshes/create", isOrgAuth, createMesh);
};
