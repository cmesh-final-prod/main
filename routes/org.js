const passport = require("passport");

// controllers
const createOrg = require("../controllers/POST/createOrg");
const signinOrg = require("../controllers/POST/signinOrg");
const fetchOrg = require("../controllers/GET/fetchOrg");
const syncMeetupsAndMeshes = require("../controllers/GET/syncMeetupsAndMeshes");
const updateOrg = require("../controllers/PUT/updateOrg");
const fetchOrgMeshes = require("../controllers/GET/fetchOrgMeshes");
const fetchMeetupSummary = require("../controllers/GET/fetchMeetupSummary");
const addMeetupURL = require("../controllers/PUT/addMeetupURL");

// middlewares
const isAuthOrg = require("../middlewares/isAuthOrg");
const isOrgAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = app => {
  ///////////////////////////////////////////////////////////////
  ///////////             ORG AUTH ROUTES             ///////////
  ///////////////////////////////////////////////////////////////
  app.post("/api/orgs/create", createOrg);
  app.post("/api/orgs/signin", requireSignin, signinOrg);

  ///////////////////////////////////////////////////////////////
  ///////////             PROTECTED ROUTES             ///////////
  ///////////////////////////////////////////////////////////////
  app.get("/api/orgs", isOrgAuth, fetchOrg);
  app.get("/api/orgs/meetups/sync", isOrgAuth, syncMeetupsAndMeshes);
  app.get("/api/orgs/meshes", isOrgAuth, fetchOrgMeshes);
  app.get("/api/orgs/meetups/summary", isOrgAuth, fetchMeetupSummary);
  app.put("/api/orgs/update", isOrgAuth, updateOrg);
  app.put("/api/orgs/meetups/:urlName", isOrgAuth, addMeetupURL);
};
