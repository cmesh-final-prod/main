// controllers
const createOrg = require("../controllers/POST/createOrg");
const signinOrg = require("../controllers/POST/signinOrg");
const fetchOrg = require("../controllers/GET/fetchOrg");

// middlewares
const isAuthOrg = require("../middlewares/isAuthOrg");

module.exports = app => {
  app.get("/api/orgs/:orgId", isAuthOrg, fetchOrg);
  app.post("/api/orgs", createOrg);
  app.post("/api/orgs/signin", signinOrg);
};
